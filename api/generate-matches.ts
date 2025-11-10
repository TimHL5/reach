import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const resend = new Resend(process.env.RESEND_API_KEY!);

interface SurveyData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  grade_level: string;
  gpa: number;
  sat_score: number | null;
  act_score: number | null;
  intended_major: string;
  school_size_preference: string;
  school_type_preference: string;
  max_tuition: number;
  need_financial_aid: boolean;
  campus_setting: string;
  extracurriculars: string;
  special_interests: string;
}

interface UniversityMatch {
  name: string;
  location: string;
  admissionChance: number;
  currentChance: number;
  withReachChance: number;
  reasoning: string;
  matchScore: number;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const surveyData: SurveyData = req.body;

    // 1. Fetch matching universities from Supabase
    const universities = await fetchMatchingUniversities(surveyData);

    // 2. Generate AI recommendations using Claude
    const recommendations = await generateClaudeRecommendations(
      surveyData,
      universities
    );

    // 3. Send email with recommendations
    await sendRecommendationEmail(surveyData, recommendations);

    // 4. Update survey response with recommendations
    await updateSurveyWithRecommendations(surveyData.id, recommendations);

    return res.status(200).json({
      success: true,
      message: 'Recommendations generated and email sent',
    });
  } catch (error) {
    console.error('Error generating matches:', error);
    return res.status(500).json({
      error: 'Failed to generate recommendations',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

async function fetchMatchingUniversities(surveyData: SurveyData) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL!;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

  // Build query based on student preferences
  let query = `${supabaseUrl}/rest/v1/universities?select=*`;

  // Filter by type if specified
  if (surveyData.school_type_preference && surveyData.school_type_preference !== 'Either') {
    if (surveyData.school_type_preference === 'Public') {
      query += `&type=eq.Public`;
    } else if (surveyData.school_type_preference === 'Private') {
      query += `&type=eq.Private Non-Profit`;
    }
  }

  // Filter by tuition if specified
  if (surveyData.max_tuition) {
    query += `&tuition_out_state=lte.${surveyData.max_tuition}`;
  }

  // Filter by enrollment based on size preference
  if (surveyData.school_size_preference === 'Small') {
    query += `&total_enrollment=lt.5000`;
  } else if (surveyData.school_size_preference === 'Medium') {
    query += `&total_enrollment=gte.5000&total_enrollment=lte.15000`;
  } else if (surveyData.school_size_preference === 'Large') {
    query += `&total_enrollment=gt.15000`;
  }

  query += `&limit=100&order=name`;

  const response = await fetch(query, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch universities');
  }

  return await response.json();
}

async function generateClaudeRecommendations(
  surveyData: SurveyData,
  universities: any[]
): Promise<UniversityMatch[]> {
  const prompt = `You are a college admissions expert. Analyze this student's profile and recommend the best college matches from the provided list.

Student Profile:
- Name: ${surveyData.first_name} ${surveyData.last_name}
- Grade Level: ${surveyData.grade_level}
- GPA: ${surveyData.gpa}
- SAT Score: ${surveyData.sat_score || 'Not provided'}
- ACT Score: ${surveyData.act_score || 'Not provided'}
- Intended Major: ${surveyData.intended_major}
- School Size Preference: ${surveyData.school_size_preference}
- School Type: ${surveyData.school_type_preference}
- Max Tuition: $${surveyData.max_tuition?.toLocaleString() || 'No limit'}
- Financial Aid Needed: ${surveyData.need_financial_aid ? 'Yes' : 'No'}
- Campus Setting: ${surveyData.campus_setting}
- Extracurriculars: ${surveyData.extracurriculars}
- Special Interests: ${surveyData.special_interests}

Available Universities (showing first 50):
${universities.slice(0, 50).map((u, i) => `${i + 1}. ${u.name} - ${u.city}, ${u.state}
   - Type: ${u.type}
   - Enrollment: ${u.total_enrollment?.toLocaleString() || 'N/A'}
   - Tuition: $${u.tuition_out_state?.toLocaleString() || 'N/A'}
   - Acceptance Rate: ${u.acceptance_rate ? (u.acceptance_rate * 100).toFixed(1) + '%' : 'N/A'}
   - Average SAT: ${u.average_sat || 'N/A'}
   - Average ACT: ${u.average_act || 'N/A'}`).join('\n\n')}

Task: Select the TOP 8 BEST MATCHES for this student. For each university:
1. Calculate their CURRENT admission chance (0-100%)
2. Calculate their chance WITH REACH's help (0-100%) - typically 15-25% higher
3. Provide brief reasoning for the match
4. Assign a match score (0-100)

Categorize recommendations as:
- 2 "Safety Schools" (current chance 70-100%)
- 3-4 "Target Schools" (current chance 40-69%)
- 2-3 "Reach Schools" (current chance 10-39%)

How Reach Boosts Admission Chances:
- AI-powered essay feedback and editing
- Strategic application planning
- Interview preparation
- Financial aid optimization
- Highlight-reel profile building
- Timeline management
- Typically increases chances by 15-25%

Return ONLY a JSON array with this exact structure:
[
  {
    "name": "University Name",
    "location": "City, State",
    "category": "Safety|Target|Reach",
    "currentChance": 75,
    "withReachChance": 90,
    "reasoning": "Brief explanation of why this is a good match",
    "matchScore": 92
  }
]`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const responseText = message.content[0].type === 'text'
    ? message.content[0].text
    : '';

  // Extract JSON from response
  const jsonMatch = responseText.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error('Failed to parse Claude response');
  }

  return JSON.parse(jsonMatch[0]);
}

async function sendRecommendationEmail(
  surveyData: SurveyData,
  recommendations: UniversityMatch[]
) {
  const safetySchools = recommendations.filter(r => r.category === 'Safety');
  const targetSchools = recommendations.filter(r => r.category === 'Target');
  const reachSchools = recommendations.filter(r => r.category === 'Reach');

  const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your College Matches from Reach</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; }
    .content { padding: 30px 20px; }
    .intro { font-size: 18px; color: #555; margin-bottom: 30px; }
    .category { margin-bottom: 40px; }
    .category-title { font-size: 20px; font-weight: bold; color: #667eea; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #667eea; }
    .school-card { background: #f9f9f9; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 15px; border-radius: 4px; }
    .school-name { font-size: 20px; font-weight: bold; color: #333; margin-bottom: 5px; }
    .school-location { color: #666; font-size: 14px; margin-bottom: 10px; }
    .chances { display: flex; gap: 20px; margin: 15px 0; }
    .chance-box { flex: 1; text-align: center; padding: 10px; background: white; border-radius: 4px; }
    .chance-label { font-size: 12px; color: #666; text-transform: uppercase; }
    .chance-value { font-size: 24px; font-weight: bold; color: #667eea; }
    .boost { color: #10b981; font-size: 14px; font-weight: bold; }
    .reasoning { color: #555; font-size: 14px; line-height: 1.6; margin-top: 10px; }
    .cta { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 30px 20px; margin-top: 40px; }
    .cta h2 { margin: 0 0 15px 0; }
    .cta-button { display: inline-block; background: white; color: #667eea; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; margin-top: 15px; }
    .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎓 Your College Matches</h1>
      <p>Personalized recommendations for ${surveyData.first_name}</p>
    </div>

    <div class="content">
      <p class="intro">
        Hi ${surveyData.first_name}! Based on your profile, we've identified the best college matches for you.
        Here are your personalized recommendations, organized by admission probability.
      </p>

      ${safetySchools.length > 0 ? `
      <div class="category">
        <div class="category-title">🟢 Safety Schools (High Admission Probability)</div>
        ${safetySchools.map(school => `
          <div class="school-card">
            <div class="school-name">${school.name}</div>
            <div class="school-location">${school.location}</div>
            <div class="chances">
              <div class="chance-box">
                <div class="chance-label">Current Chance</div>
                <div class="chance-value">${school.currentChance}%</div>
              </div>
              <div class="chance-box">
                <div class="chance-label">With Reach</div>
                <div class="chance-value">${school.withReachChance}%</div>
                <div class="boost">+${school.withReachChance - school.currentChance}%</div>
              </div>
            </div>
            <div class="reasoning">${school.reasoning}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${targetSchools.length > 0 ? `
      <div class="category">
        <div class="category-title">🟡 Target Schools (Good Match)</div>
        ${targetSchools.map(school => `
          <div class="school-card">
            <div class="school-name">${school.name}</div>
            <div class="school-location">${school.location}</div>
            <div class="chances">
              <div class="chance-box">
                <div class="chance-label">Current Chance</div>
                <div class="chance-value">${school.currentChance}%</div>
              </div>
              <div class="chance-box">
                <div class="chance-label">With Reach</div>
                <div class="chance-value">${school.withReachChance}%</div>
                <div class="boost">+${school.withReachChance - school.currentChance}%</div>
              </div>
            </div>
            <div class="reasoning">${school.reasoning}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${reachSchools.length > 0 ? `
      <div class="category">
        <div class="category-title">🔴 Reach Schools (Competitive)</div>
        ${reachSchools.map(school => `
          <div class="school-card">
            <div class="school-name">${school.name}</div>
            <div class="school-location">${school.location}</div>
            <div class="chances">
              <div class="chance-box">
                <div class="chance-label">Current Chance</div>
                <div class="chance-value">${school.currentChance}%</div>
              </div>
              <div class="chance-box">
                <div class="chance-label">With Reach</div>
                <div class="chance-value">${school.withReachChance}%</div>
                <div class="boost">+${school.withReachChance - school.currentChance}%</div>
              </div>
            </div>
            <div class="reasoning">${school.reasoning}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      <div class="cta">
        <h2>Ready to Maximize Your Chances?</h2>
        <p>Reach helps students increase their admission chances by 15-25% through:</p>
        <ul style="text-align: left; max-width: 400px; margin: 20px auto;">
          <li>AI-powered essay feedback</li>
          <li>Strategic application planning</li>
          <li>Financial aid optimization</li>
          <li>Interview preparation</li>
        </ul>
        <a href="https://reach.college/waitlist" class="cta-button">Join the Waitlist - $199/year</a>
        <p style="font-size: 14px; margin-top: 15px;">Launching Spring 2026</p>
      </div>
    </div>

    <div class="footer">
      <p>© 2025 Reach. All rights reserved.</p>
      <p>Questions? Reply to this email or visit reach.college</p>
    </div>
  </div>
</body>
</html>
  `;

  await resend.emails.send({
    from: 'Reach College Admissions <matches@reach.college>',
    to: surveyData.email,
    subject: `${surveyData.first_name}, here are your college matches! 🎓`,
    html: htmlEmail,
  });
}

async function updateSurveyWithRecommendations(
  surveyId: string,
  recommendations: UniversityMatch[]
) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL!;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

  await fetch(`${supabaseUrl}/rest/v1/survey_responses?id=eq.${surveyId}`, {
    method: 'PATCH',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      ai_recommendations: recommendations,
      match_explanation: `Generated ${recommendations.length} personalized recommendations`,
    }),
  });
}
