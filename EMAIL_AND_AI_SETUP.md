# Email & AI Matching Setup Guide

This guide will help you set up automated email sending and Claude AI-powered college matching recommendations.

## 🎯 What This Does

When a student completes the college matching survey:
1. **Survey data** is saved to Supabase
2. **Claude API** analyzes their profile and matches them with universities
3. **Email sent** with personalized recommendations showing:
   - Safety, Target, and Reach schools
   - Current admission chance (%)
   - Admission chance WITH Reach's help (%)
   - How Reach boosts their chances by 15-25%
4. **Results saved** back to Supabase for your records

---

## 📋 Prerequisites

You'll need accounts for:
- [x] Supabase (already have)
- [ ] Anthropic Claude API
- [ ] Resend (email service)
- [ ] Vercel (already have)

---

## Step 1: Set Up Resend (Email Service)

### Why Resend?
- Modern, developer-friendly email API
- Free tier: 3,000 emails/month
- Better deliverability than Gmail SMTP
- Simple integration

### Setup Steps:

1. **Create Account**
   - Go to https://resend.com
   - Sign up with GitHub (easiest)

2. **Verify Your Domain** (Important!)
   - Click "Domains" in sidebar
   - Click "Add Domain"
   - Enter: `reach.college` (or your custom domain)
   - Follow DNS setup instructions
   - Add the DNS records to your domain provider

3. **Get API Key**
   - Go to "API Keys" in Resend dashboard
   - Click "Create API Key"
   - Name it: "Reach Production"
   - Copy the key (starts with `re_`)
   - Save it - you'll need this for Vercel

4. **Verify "From" Email**
   - Once domain is verified, you can send from any email
   - Recommended: `matches@reach.college`
   - Update in `/api/generate-matches.ts` line 272 if needed

---

## Step 2: Set Up Claude API

### Get Your API Key:

1. **Create Account**
   - Go to https://console.anthropic.com
   - Sign up or log in

2. **Get API Key**
   - Click "API Keys" in left sidebar
   - Click "Create Key"
   - Name it: "Reach College Matching"
   - Copy the key (starts with `sk-ant-`)
   - Save it securely

3. **Add Credits** (if needed)
   - Claude API requires credits
   - Go to "Billing" → "Add Credits"
   - $5 credit = ~500 survey responses
   - Each survey costs ~$0.01 in API usage

---

## Step 3: Configure Vercel Environment Variables

Add these secrets to your Vercel project:

### In Vercel Dashboard:

1. Go to your project settings
2. Click "Environment Variables"
3. Add these variables:

```env
# Anthropic Claude API
ANTHROPIC_API_KEY=sk-ant-api01-xxxxx

# Resend Email API
RESEND_API_KEY=re_xxxxx

# Supabase (should already exist)
VITE_SUPABASE_URL=https://ecalxacozprhkpotruca.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Apply to All Environments:
Make sure to select:
- ✅ Production
- ✅ Preview
- ✅ Development

---

## Step 4: Create Database Table

Run this SQL in Supabase SQL Editor:

```sql
-- College Matching Survey Table
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Contact
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,

  -- Academic
  grade_level TEXT,
  gpa DECIMAL(3,2),
  gpa_scale TEXT,
  sat_score INTEGER,
  act_score INTEGER,
  intended_major TEXT,

  -- Preferences
  preferred_location TEXT[],
  preferred_states TEXT[],
  school_size_preference TEXT,
  school_type_preference TEXT,
  max_tuition INTEGER,
  need_financial_aid BOOLEAN,

  -- Campus
  campus_setting TEXT,
  athletics_important BOOLEAN,
  greek_life_important BOOLEAN,
  study_abroad_important BOOLEAN,

  -- Extra
  extracurriculars TEXT,
  special_interests TEXT,

  -- AI Results
  ai_recommendations JSONB,
  match_explanation TEXT,

  -- Meta
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_survey_email ON survey_responses(email);
CREATE INDEX idx_survey_created ON survey_responses(created_at DESC);

-- RLS
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can submit" ON survey_responses
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can read" ON survey_responses
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Auth can update" ON survey_responses
  FOR UPDATE TO authenticated USING (true);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_survey_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_survey_responses_timestamp
  BEFORE UPDATE ON survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_survey_timestamp();
```

---

## Step 5: Deploy to Vercel

```bash
# Commit all changes
git add -A
git commit -m "feat: Add Claude AI matching and email notifications"
git push origin main

# Vercel will auto-deploy
```

**Vercel will automatically:**
- Deploy your serverless function at `/api/generate-matches`
- Use the environment variables you set
- Handle the email sending

---

## 🧪 Testing

### Test the Full Flow:

1. **Go to your site** → Click "Get My College Matches Free"
2. **Fill out the survey** with test data
3. **Submit the form**
4. **Check your email** (the one you entered in the survey)
5. **Verify results in Supabase:**
   - Go to Table Editor → `survey_responses`
   - Find your submission
   - Check that `ai_recommendations` field has data

### Test Email Locally (Optional):

```bash
# In a separate terminal
npm run dev

# In another terminal, test the API
curl -X POST http://localhost:5173/api/generate-matches \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-id",
    "email": "your-email@example.com",
    "first_name": "Test",
    "last_name": "Student",
    "grade_level": "11th",
    "gpa": 3.7,
    "sat_score": 1350,
    "intended_major": "Computer Science",
    "school_size_preference": "Medium",
    "school_type_preference": "Either",
    "max_tuition": 50000,
    "need_financial_aid": true,
    "campus_setting": "Urban",
    "extracurriculars": "Debate team, volunteer work",
    "special_interests": "AI research"
  }'
```

---

## 📊 How the AI Matching Works

### The Algorithm:

1. **Filters Universities** based on student preferences:
   - School type (Public/Private)
   - Size (Small/Medium/Large)
   - Max tuition budget
   - Location preferences

2. **Claude Analyzes** student profile:
   - GPA vs school's average
   - Test scores (SAT/ACT)
   - Intended major match
   - Extracurriculars strength
   - Special interests alignment

3. **Categorizes Schools:**
   - **Safety** (70-100% admission chance)
   - **Target** (40-69% admission chance)
   - **Reach** (10-39% admission chance)

4. **Calculates "With Reach" Boost:**
   - Adds 15-25% to admission chances
   - Based on Reach's services:
     - AI essay feedback
     - Application strategy
     - Interview prep
     - Financial aid optimization

### Example Output:

```json
[
  {
    "name": "Boston University",
    "location": "Boston, MA",
    "category": "Target",
    "currentChance": 55,
    "withReachChance": 75,
    "reasoning": "Strong match for CS program. Your 1350 SAT is within range...",
    "matchScore": 85
  }
]
```

---

## 📧 Email Template

The email includes:
- Personalized greeting
- 8 college recommendations (2 safety, 3-4 target, 2-3 reach)
- For each school:
  - Current admission chance
  - Boosted chance with Reach
  - Detailed reasoning
- CTA to join waitlist
- Beautiful responsive design

### Customizing the Email:

Edit `/api/generate-matches.ts` starting at line 200 to modify:
- Email styling
- Content sections
- CTA links
- Footer text

---

## 💰 Cost Breakdown

### Per Survey Response:

| Service | Cost per Survey | Notes |
|---------|----------------|-------|
| Claude API | ~$0.01 | Sonnet model, ~2K tokens |
| Resend Email | $0.001 | 3,000 free/month |
| Supabase | Free | Within free tier limits |
| **Total** | **~$0.01** | Very affordable! |

### At Scale:

- 100 surveys = $1
- 1,000 surveys = $10
- 10,000 surveys = $100

Much cheaper than traditional admissions consulting!

---

## 🔒 Security Best Practices

✅ **Environment Variables**
- Never commit API keys to Git
- Use Vercel environment variables
- Different keys for dev/prod

✅ **RLS Policies**
- Survey responses are read-only after submission
- Only authenticated users can update

✅ **Rate Limiting** (recommended to add):
```typescript
// Add to generate-matches.ts
const rateLimit = new Map();
const RATE_LIMIT = 3; // 3 requests per email per day

if (rateLimit.get(email) >= RATE_LIMIT) {
  return res.status(429).json({ error: 'Too many requests' });
}
```

---

## 🐛 Troubleshooting

### Email not sending?

1. **Check Resend dashboard** for errors
2. **Verify domain DNS** is set up correctly
3. **Check Vercel logs** for API errors
4. **Verify API key** is correct in environment variables

### Claude API errors?

1. **Check API credits** in Anthropic dashboard
2. **Verify API key** is valid
3. **Check rate limits** (default: 50 req/min)
4. **Review Vercel function logs**

### No recommendations generated?

1. **Check Supabase** - does `universities` table have data?
2. **Verify filters** aren't too restrictive
3. **Check console logs** in browser DevTools
4. **Check Vercel function logs** for errors

---

## 📈 Monitoring & Analytics

### View Survey Submissions:

```sql
-- Recent surveys
SELECT
  first_name,
  last_name,
  email,
  grade_level,
  gpa,
  intended_major,
  created_at
FROM survey_responses
ORDER BY created_at DESC
LIMIT 50;
```

### Track Email Success:

Check Resend dashboard:
- Emails sent
- Delivery rate
- Open rate
- Bounce rate

### Monitor API Costs:

Check Anthropic dashboard:
- Daily usage
- Cost per day
- Token consumption

---

## 🚀 Next Steps

Once working, you can enhance with:

1. **Follow-up emails** (7 days later)
2. **Personalized essay prompts** based on chosen schools
3. **Financial aid calculator** integration
4. **Application timeline** generation
5. **Video recommendations** from current students

---

## 📚 Resources

- [Resend Docs](https://resend.com/docs)
- [Claude API Docs](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
- [Vercel Functions](https://vercel.com/docs/functions)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)

---

## ✅ Checklist

Before going live:

- [ ] Resend account created and domain verified
- [ ] Claude API key obtained and credited
- [ ] Environment variables set in Vercel
- [ ] Database table created in Supabase
- [ ] Code deployed to Vercel
- [ ] Test survey completed successfully
- [ ] Test email received and looks good
- [ ] Supabase shows recommendations saved

---

**Need help?** Check the Vercel function logs or reach out!
