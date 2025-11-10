import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export type University = {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string | null;
  country: string;
  latitude: number | null;
  longitude: number | null;
  website: string | null;
  logo_url: string | null;
  image_url: string | null;
  type: string | null;
  total_enrollment: number | null;
  acceptance_rate: number | null;
  tuition_in_state: number | null;
  tuition_out_state: number | null;
  room_and_board: number | null;
  graduation_rate: number | null;
  retention_rate: number | null;
  avg_financial_aid: number | null;
  us_news_rank: number | null;
  qs_world_rank: number | null;
  application_deadline: string | null;
  common_app: boolean | null;
  coalition_app: boolean | null;
  created_at: string;
};