import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Vite uses VITE_ prefix for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ecalxacozprhkpotruca.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjYWx4YWNvenByaGtwb3RydWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NTQzNDUsImV4cCI6MjA3ODMzMDM0NX0.1DeUlcWTlY8LINonePBZCniLYbwSUXrORvkexvG2UrQ';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
