"""
Direct Supabase updater - Updates your database programmatically
Run this AFTER running update_university_data.py
"""

from supabase import create_client, Client
import json
import os
from typing import List, Dict

# Supabase credentials from your .env.local
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://ecalxacozprhkpotruca.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjYWx4YWNvenByaGtwb3RydWNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjc1NDM0NSwiZXhwIjoyMDc4MzMwMzQ1fQ.YbN7-Uuoq9spOa3ecMWjQJK1KIU_WwXoJmhnbRjjEJM')

def load_universities_from_json(filename: str = 'universities_updated.json') -> List[Dict]:
    """Load the universities data from JSON"""
    with open(filename, 'r') as f:
        return json.load(f)

def update_universities_in_supabase(universities: List[Dict]):
    """
    Update universities in Supabase
    
    Two strategies:
    1. Match by name (fuzzy matching)
    2. Update acceptance rates for matching universities
    """
    
    # Initialize Supabase client
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    print(f"Updating {len(universities)} universities in Supabase...\n")
    
    updated_count = 0
    not_found_count = 0
    error_count = 0
    
    for i, uni in enumerate(universities):
        if i % 100 == 0:
            print(f"Progress: {i}/{len(universities)}...")
        
        try:
            # Find matching university by name (case-insensitive)
            response = supabase.table('universities')\
                .select('id, name')\
                .ilike('name', uni['name'])\
                .execute()
            
            if response.data and len(response.data) > 0:
                # Found a match - update it
                university_id = response.data[0]['id']
                
                update_data = {
                    'acceptance_rate': uni['acceptance_rate'],
                    'total_enrollment': uni['total_enrollment'],
                    'tuition_out_state': uni['tuition_out_state'],
                    'tuition_in_state': uni.get('tuition_in_state'),
                }
                
                # Remove None values
                update_data = {k: v for k, v in update_data.items() if v is not None}
                
                supabase.table('universities')\
                    .update(update_data)\
                    .eq('id', university_id)\
                    .execute()
                
                updated_count += 1
                
                if updated_count <= 5:  # Show first 5 updates
                    print(f"  ✓ Updated: {uni['name']} - {uni['acceptance_rate']}%")
            else:
                not_found_count += 1
                
        except Exception as e:
            error_count += 1
            print(f"  ✗ Error updating {uni['name']}: {e}")
    
    print(f"\n{'='*60}")
    print("UPDATE COMPLETE")
    print(f"{'='*60}")
    print(f"✓ Successfully updated: {updated_count}")
    print(f"⚠ Not found in database: {not_found_count}")
    print(f"✗ Errors: {error_count}")

def bulk_insert_new_universities(universities: List[Dict]):
    """
    Alternative: Bulk insert NEW universities
    Use this if you want to add colleges that don't exist in your DB
    """
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    print(f"Inserting {len(universities)} new universities...\n")
    
    # Batch insert (Supabase can handle ~1000 at a time)
    batch_size = 500
    
    for i in range(0, len(universities), batch_size):
        batch = universities[i:i+batch_size]
        
        try:
            supabase.table('universities').insert(batch).execute()
            print(f"  ✓ Inserted batch {i//batch_size + 1}: {len(batch)} universities")
        except Exception as e:
            print(f"  ✗ Error inserting batch: {e}")

if __name__ == "__main__":
    print("="*60)
    print("SUPABASE DIRECT UPDATER")
    print("="*60)
    
    # Check if config is set
    if 'YOUR_SUPABASE' in SUPABASE_URL or 'YOUR_SUPABASE' in SUPABASE_KEY:
        print("\n⚠️  You need to set your Supabase credentials!")
        print("\nEdit this file and replace:")
        print("  SUPABASE_URL = 'your-project-url.supabase.co'")
        print("  SUPABASE_KEY = 'your-service-role-key'\n")
        print("Or set environment variables:")
        print("  export SUPABASE_URL='your-url'")
        print("  export SUPABASE_KEY='your-key'\n")
        exit(1)
    
    # Load data
    try:
        universities = load_universities_from_json()
        print(f"\n✓ Loaded {len(universities)} universities from JSON\n")
    except FileNotFoundError:
        print("\n✗ universities_updated.json not found!")
        print("Run update_university_data.py first to fetch the data.\n")
        exit(1)
    
    # Choose update strategy
    print("Choose update strategy:")
    print("1. UPDATE existing universities (recommended)")
    print("2. BULK INSERT new universities")
    
    choice = input("\nEnter choice (1 or 2): ").strip()
    
    if choice == '1':
        update_universities_in_supabase(universities)
    elif choice == '2':
        confirm = input("\n⚠️  This will add all universities as NEW entries. Continue? (yes/no): ")
        if confirm.lower() == 'yes':
            bulk_insert_new_universities(universities)
    else:
        print("Invalid choice")

