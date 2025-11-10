import type { University } from './university';

export type Waitlist = {
  id: string;
  email: string;
  created_at: string;
};

export type SurveyResponse = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  grade_level: string | null;
  gpa: number | null;
  gpa_scale: string | null;
  sat_score: number | null;
  act_score: number | null;
  intended_major: string | null;
  preferred_location: string[] | null;
  preferred_states: string[] | null;
  school_size_preference: string | null;
  school_type_preference: string | null;
  max_tuition: number | null;
  need_financial_aid: boolean | null;
  campus_setting: string | null;
  athletics_important: boolean | null;
  greek_life_important: boolean | null;
  study_abroad_important: boolean | null;
  extracurriculars: string | null;
  special_interests: string | null;
  ai_recommendations: any | null;
  match_explanation: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      universities: {
        Row: University;
        Insert: Omit<University, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<University, 'id' | 'created_at' | 'updated_at'>>;
      };
      waitlist: {
        Row: Waitlist;
        Insert: Omit<Waitlist, 'id'>;
        Update: Partial<Omit<Waitlist, 'id' | 'created_at'>>;
      };
      survey_responses: {
        Row: SurveyResponse;
        Insert: Omit<SurveyResponse, 'id' | 'updated_at'>;
        Update: Partial<Omit<SurveyResponse, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};
