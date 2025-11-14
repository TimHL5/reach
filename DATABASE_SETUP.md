# Database Setup for User Colleges Feature

This document explains how to set up the database tables required for the user colleges (favorites and notes) feature.

## Prerequisites

- Access to your Supabase project dashboard
- Project already has the `universities` table configured

## Setup Instructions

### 1. Run the Migration SQL

Navigate to your Supabase project dashboard:
1. Go to **SQL Editor** in the left sidebar
2. Create a new query
3. Copy and paste the contents of `/supabase/migrations/001_create_user_colleges.sql`
4. Click **Run** to execute the migration

The migration will create:
- `user_college_likes` table
- `user_college_notes` table
- Appropriate indexes for performance
- Row Level Security (RLS) policies

### 2. Enable Email Authentication

Since this feature requires user authentication, make sure email authentication is enabled:

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Enable **Email** provider if not already enabled
3. Configure email templates (optional but recommended):
   - Confirmation email
   - Password reset email
   - Magic link email

### 3. Verify Tables

After running the migration, verify the tables were created:

```sql
-- Check user_college_likes table
SELECT * FROM user_college_likes LIMIT 1;

-- Check user_college_notes table
SELECT * FROM user_college_notes LIMIT 1;
```

## Database Schema

### user_college_likes

Stores which universities a user has saved to their favorites.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| user_id | UUID | Foreign key to auth.users |
| university_id | TEXT | ID of the university |
| created_at | TIMESTAMPTZ | When the like was created |

**Constraints:**
- Unique constraint on (user_id, university_id) - prevents duplicate likes

### user_college_notes

Stores personal notes users write about universities.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| user_id | UUID | Foreign key to auth.users |
| university_id | TEXT | ID of the university |
| note | TEXT | The user's note content |
| created_at | TIMESTAMPTZ | When the note was created |
| updated_at | TIMESTAMPTZ | When the note was last updated |

**Constraints:**
- Unique constraint on (user_id, university_id) - one note per user per university

## Row Level Security (RLS)

Both tables have RLS enabled with the following policies:

### user_college_likes
- **SELECT**: Users can only view their own likes
- **INSERT**: Users can only create their own likes
- **DELETE**: Users can only delete their own likes

### user_college_notes
- **SELECT**: Users can only view their own notes
- **INSERT**: Users can only create their own notes
- **UPDATE**: Users can only update their own notes
- **DELETE**: Users can only delete their own notes

## Testing

After setup, you can test the feature by:

1. Starting the development server: `npm run dev`
2. Navigating to `/universities`
3. Creating an account via the Sign In button
4. Clicking the heart icon on any university card
5. Visiting a university detail page and adding a note
6. Checking "My Colleges" page to see saved universities

## Troubleshooting

### Issue: "relation user_college_likes does not exist"
- **Solution**: Make sure you ran the migration SQL in step 1

### Issue: "permission denied for table user_college_likes"
- **Solution**: RLS policies may not be set up correctly. Re-run the migration SQL

### Issue: "new row violates row-level security policy"
- **Solution**: Make sure the user is authenticated. Check that `auth.uid()` returns a value

### Issue: Users can't sign up
- **Solution**:
  - Check that email provider is enabled in Supabase
  - Check SMTP settings if using custom email
  - Check browser console for errors

## Environment Variables

Make sure these environment variables are set:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Additional Notes

- The `updated_at` field in `user_college_notes` is automatically updated via a trigger
- All user data is automatically deleted when a user account is deleted (CASCADE)
- Indexes are created on user_id and university_id columns for optimal query performance
