import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

type SurveyData = {
  // Contact
  email: string;
  first_name: string;
  last_name: string;

  // Academic
  grade_level: string;
  gpa: string;
  gpa_scale: string;
  sat_score: string;
  act_score: string;
  intended_major: string;

  // Preferences
  school_size_preference: string;
  school_type_preference: string;
  max_tuition: string;
  need_financial_aid: boolean;
  campus_setting: string;

  // Interests
  extracurriculars: string;
  special_interests: string;
};

const TOTAL_STEPS = 5;

export const CollegeMatchingSurvey = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState<SurveyData>({
    email: '',
    first_name: '',
    last_name: '',
    grade_level: '',
    gpa: '',
    gpa_scale: '4.0',
    sat_score: '',
    act_score: '',
    intended_major: '',
    school_size_preference: '',
    school_type_preference: '',
    max_tuition: '',
    need_financial_aid: false,
    campus_setting: '',
    extracurriculars: '',
    special_interests: '',
  });

  const updateField = (field: keyof SurveyData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const surveyPayload = {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        grade_level: formData.grade_level,
        gpa: formData.gpa ? parseFloat(formData.gpa) : null,
        gpa_scale: formData.gpa_scale,
        sat_score: formData.sat_score ? parseInt(formData.sat_score) : null,
        act_score: formData.act_score ? parseInt(formData.act_score) : null,
        intended_major: formData.intended_major,
        school_size_preference: formData.school_size_preference,
        school_type_preference: formData.school_type_preference,
        max_tuition: formData.max_tuition ? parseInt(formData.max_tuition) : null,
        need_financial_aid: formData.need_financial_aid,
        campus_setting: formData.campus_setting,
        extracurriculars: formData.extracurriculars,
        special_interests: formData.special_interests,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('survey_responses')
        // @ts-expect-error - Survey table type not properly inferred
        .insert(surveyPayload);

      if (error) throw error;

      setIsComplete(true);
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <Check size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Survey Complete!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          We're analyzing your responses and finding the best college matches for you.
        </p>
        <p className="text-gray-600 mb-8">
          Check your email at <strong>{formData.email}</strong> for your personalized recommendations within 24 hours.
        </p>
        <Button variant="primary" onClick={() => window.location.href = '/'}>
          Return to Home
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-brand h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <Step1 formData={formData} updateField={updateField} nextStep={nextStep} />
        )}
        {currentStep === 2 && (
          <Step2 formData={formData} updateField={updateField} nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 3 && (
          <Step3 formData={formData} updateField={updateField} nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 4 && (
          <Step4 formData={formData} updateField={updateField} nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 5 && (
          <Step5
            formData={formData}
            updateField={updateField}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Step 1: Contact Information
const Step1 = ({ formData, updateField, nextStep }: any) => (
  <motion.div
    key="step1"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-bold text-gray-900">Let's get started!</h2>
    <p className="text-gray-600">First, tell us a bit about yourself.</p>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => updateField('first_name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
            placeholder="John"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => updateField('last_name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Grade Level *
        </label>
        <select
          value={formData.grade_level}
          onChange={(e) => updateField('grade_level', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
          required
        >
          <option value="">Select grade level</option>
          <option value="9th">9th Grade</option>
          <option value="10th">10th Grade</option>
          <option value="11th">11th Grade</option>
          <option value="12th">12th Grade</option>
          <option value="gap_year">Gap Year</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>

    <div className="flex justify-end">
      <Button
        variant="primary"
        onClick={nextStep}
        disabled={!formData.email || !formData.first_name || !formData.last_name || !formData.grade_level}
        className="flex items-center gap-2"
      >
        Next <ArrowRight size={20} />
      </Button>
    </div>
  </motion.div>
);

// Step 2: Academic Information
const Step2 = ({ formData, updateField, nextStep, prevStep }: any) => (
  <motion.div
    key="step2"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-bold text-gray-900">Academic Profile</h2>
    <p className="text-gray-600">Help us understand your academic background.</p>

    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GPA
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.gpa}
            onChange={(e) => updateField('gpa', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
            placeholder="3.8"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GPA Scale
          </label>
          <select
            value={formData.gpa_scale}
            onChange={(e) => updateField('gpa_scale', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
          >
            <option value="4.0">4.0 Scale</option>
            <option value="5.0">5.0 Scale</option>
            <option value="100">100 Point Scale</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SAT Score (if taken)
          </label>
          <input
            type="number"
            value={formData.sat_score}
            onChange={(e) => updateField('sat_score', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
            placeholder="1400"
            min="400"
            max="1600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ACT Score (if taken)
          </label>
          <input
            type="number"
            value={formData.act_score}
            onChange={(e) => updateField('act_score', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
            placeholder="32"
            min="1"
            max="36"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Intended Major / Field of Study
        </label>
        <input
          type="text"
          value={formData.intended_major}
          onChange={(e) => updateField('intended_major', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
          placeholder="e.g., Computer Science, Pre-Med, Business"
        />
      </div>
    </div>

    <div className="flex justify-between">
      <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>
      <Button variant="primary" onClick={nextStep} className="flex items-center gap-2">
        Next <ArrowRight size={20} />
      </Button>
    </div>
  </motion.div>
);

// Step 3: School Preferences
const Step3 = ({ formData, updateField, nextStep, prevStep }: any) => (
  <motion.div
    key="step3"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-bold text-gray-900">School Preferences</h2>
    <p className="text-gray-600">What kind of college environment are you looking for?</p>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          School Size Preference
        </label>
        <select
          value={formData.school_size_preference}
          onChange={(e) => updateField('school_size_preference', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
        >
          <option value="">Select size</option>
          <option value="Small">Small (&lt; 5,000 students)</option>
          <option value="Medium">Medium (5,000-15,000 students)</option>
          <option value="Large">Large (&gt; 15,000 students)</option>
          <option value="No Preference">No Preference</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          School Type
        </label>
        <select
          value={formData.school_type_preference}
          onChange={(e) => updateField('school_type_preference', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
        >
          <option value="">Select type</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
          <option value="Either">Either</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Campus Setting
        </label>
        <select
          value={formData.campus_setting}
          onChange={(e) => updateField('campus_setting', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
        >
          <option value="">Select setting</option>
          <option value="Urban">Urban</option>
          <option value="Suburban">Suburban</option>
          <option value="Rural">Rural</option>
          <option value="No Preference">No Preference</option>
        </select>
      </div>
    </div>

    <div className="flex justify-between">
      <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>
      <Button variant="primary" onClick={nextStep} className="flex items-center gap-2">
        Next <ArrowRight size={20} />
      </Button>
    </div>
  </motion.div>
);

// Step 4: Financial Considerations
const Step4 = ({ formData, updateField, nextStep, prevStep }: any) => (
  <motion.div
    key="step4"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-bold text-gray-900">Financial Considerations</h2>
    <p className="text-gray-600">Let's discuss the financial aspects of college.</p>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Maximum Annual Tuition Budget
        </label>
        <input
          type="number"
          value={formData.max_tuition}
          onChange={(e) => updateField('max_tuition', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
          placeholder="50000"
        />
        <p className="text-sm text-gray-500 mt-1">Leave blank if no specific budget</p>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="financial_aid"
          checked={formData.need_financial_aid}
          onChange={(e) => updateField('need_financial_aid', e.target.checked)}
          className="w-4 h-4 text-reach-blue border-gray-300 rounded focus:ring-reach-blue"
        />
        <label htmlFor="financial_aid" className="ml-2 text-sm text-gray-700">
          I plan to apply for financial aid
        </label>
      </div>
    </div>

    <div className="flex justify-between">
      <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>
      <Button variant="primary" onClick={nextStep} className="flex items-center gap-2">
        Next <ArrowRight size={20} />
      </Button>
    </div>
  </motion.div>
);

// Step 5: Additional Information
const Step5 = ({ formData, updateField, prevStep, handleSubmit, isSubmitting }: any) => (
  <motion.div
    key="step5"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-bold text-gray-900">Almost Done!</h2>
    <p className="text-gray-600">Tell us about your interests and activities.</p>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Extracurricular Activities
        </label>
        <textarea
          value={formData.extracurriculars}
          onChange={(e) => updateField('extracurriculars', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
          rows={3}
          placeholder="Sports, clubs, volunteer work, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special Interests or Requirements
        </label>
        <textarea
          value={formData.special_interests}
          onChange={(e) => updateField('special_interests', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reach-blue focus:border-transparent"
          rows={3}
          placeholder="Study abroad programs, research opportunities, specific programs, etc."
        />
      </div>
    </div>

    <div className="flex justify-between">
      <Button variant="outline" onClick={prevStep} className="flex items-center gap-2" disabled={isSubmitting}>
        <ArrowLeft size={20} /> Back
      </Button>
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="flex items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Submitting...
          </>
        ) : (
          <>
            Submit <Check size={20} />
          </>
        )}
      </Button>
    </div>
  </motion.div>
);
