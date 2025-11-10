import type { University } from './university';

export type Database = {
  public: {
    Tables: {
      universities: {
        Row: University;
        Insert: Omit<University, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<University, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};
