-- Create user_college_likes table
CREATE TABLE IF NOT EXISTS user_college_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  university_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one like per user per university
  UNIQUE(user_id, university_id)
);

-- Create user_college_notes table
CREATE TABLE IF NOT EXISTS user_college_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  university_id TEXT NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one note per user per university
  UNIQUE(user_id, university_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_user_college_likes_user ON user_college_likes(user_id);
CREATE INDEX idx_user_college_likes_university ON user_college_likes(university_id);
CREATE INDEX idx_user_college_notes_user ON user_college_notes(user_id);
CREATE INDEX idx_user_college_notes_university ON user_college_notes(university_id);

-- Enable Row Level Security
ALTER TABLE user_college_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_college_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_college_likes
-- Users can only read their own likes
CREATE POLICY "Users can view own likes"
  ON user_college_likes FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own likes
CREATE POLICY "Users can create own likes"
  ON user_college_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own likes
CREATE POLICY "Users can delete own likes"
  ON user_college_likes FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for user_college_notes
-- Users can only read their own notes
CREATE POLICY "Users can view own notes"
  ON user_college_notes FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own notes
CREATE POLICY "Users can create own notes"
  ON user_college_notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own notes
CREATE POLICY "Users can update own notes"
  ON user_college_notes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own notes
CREATE POLICY "Users can delete own notes"
  ON user_college_notes FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at on notes
CREATE TRIGGER update_user_college_notes_updated_at
  BEFORE UPDATE ON user_college_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
