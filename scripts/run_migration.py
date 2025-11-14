"""
Run SQL migration to add PCIP columns to universities table
"""

from supabase import create_client, Client
import os

# Supabase credentials
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://ecalxacozprhkpotruca.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjYWx4YWNvenByaGtwb3RydWNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjc1NDM0NSwiZXhwIjoyMDc4MzMwMzQ1fQ.YbN7-Uuoq9spOa3ecMWjQJK1KIU_WwXoJmhnbRjjEJM')

# Read the migration SQL
with open('migrations/add_pcip_columns.sql', 'r') as f:
    migration_sql = f.read()

def run_migration():
    """Execute the migration SQL"""
    print("="*60)
    print("RUNNING PCIP COLUMNS MIGRATION")
    print("="*60)

    # Initialize Supabase client
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

    try:
        print("\nExecuting migration SQL...")
        print("This will add 38 PCIP columns to the universities table.\n")

        # Execute the SQL
        # Note: Supabase Python client doesn't have direct SQL execution
        # We need to use the PostgREST API or manual SQL execution
        print("⚠️  The Supabase Python client doesn't support direct SQL execution.")
        print("\nPlease run the migration manually in one of these ways:")
        print("\n1. Supabase Dashboard SQL Editor:")
        print("   - Go to https://supabase.com/dashboard/project/ecalxacozprhkpotruca")
        print("   - Click 'SQL Editor' in the left sidebar")
        print("   - Copy the contents of migrations/add_pcip_columns.sql")
        print("   - Paste and run it")

        print("\n2. Using psql command line:")
        print("   psql <connection-string> < migrations/add_pcip_columns.sql")

        print("\n3. Or we can try using the rpc endpoint (if available)...")

        # Alternative: Split into individual ALTER statements and execute
        print("\nAttempting to add columns programmatically...")

        pcip_columns = [
            ('pcip01', 'Agriculture, Agriculture Operations, And Related Sciences'),
            ('pcip03', 'Natural Resources And Conservation'),
            ('pcip04', 'Architecture And Related Services'),
            ('pcip05', 'Area, Ethnic, Cultural, Gender, And Group Studies'),
            ('pcip09', 'Communication, Journalism, And Related Programs'),
            ('pcip10', 'Communications Technologies/Technicians And Support Services'),
            ('pcip11', 'Computer And Information Sciences And Support Services'),
            ('pcip12', 'Personal And Culinary Services'),
            ('pcip13', 'Education'),
            ('pcip14', 'Engineering'),
            ('pcip15', 'Engineering Technologies And Engineering-Related Fields'),
            ('pcip16', 'Foreign Languages, Literatures, And Linguistics'),
            ('pcip19', 'Family And Consumer Sciences/Human Sciences'),
            ('pcip22', 'Law And Legal Studies'),
            ('pcip23', 'English Language And Literature/Letters'),
            ('pcip24', 'Liberal Arts And Sciences, General Studies And Humanities'),
            ('pcip25', 'Library Science'),
            ('pcip26', 'Biological And Biomedical Sciences'),
            ('pcip27', 'Mathematics And Statistics'),
            ('pcip29', 'Military Sciences And Technologies'),
            ('pcip30', 'Multidisciplinary Studies'),
            ('pcip31', 'Parks, Recreation, Leisure, And Fitness Studies'),
            ('pcip38', 'Philosophy And Religious Studies'),
            ('pcip39', 'Theology And Religious Vocations'),
            ('pcip40', 'Physical Sciences'),
            ('pcip41', 'Science Technologies/Technicians'),
            ('pcip42', 'Psychology'),
            ('pcip43', 'Homeland Security, Law Enforcement, And Firefighting'),
            ('pcip44', 'Public Administration And Social Service Professions'),
            ('pcip45', 'Social Sciences'),
            ('pcip46', 'Construction Trades'),
            ('pcip47', 'Mechanic And Repair Technologies/Technicians'),
            ('pcip48', 'Precision Production'),
            ('pcip49', 'Transportation And Materials Moving'),
            ('pcip50', 'Visual And Performing Arts'),
            ('pcip51', 'Health Professions And Related Programs'),
            ('pcip52', 'Business, Management, Marketing, And Related Support Services'),
            ('pcip54', 'History'),
        ]

        print(f"\nNeed to add {len(pcip_columns)} PCIP columns")
        print("\nSince direct SQL execution isn't available via the Python client,")
        print("please run the migration SQL file manually in the Supabase dashboard.")
        print("\nAfter running the migration, you can run:")
        print("  python scripts/import_universities_with_pcip.py")

    except Exception as e:
        print(f"\n✗ Error: {e}")
        return False

    return True

if __name__ == "__main__":
    run_migration()
