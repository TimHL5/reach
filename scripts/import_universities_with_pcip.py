"""
Import universities CSV with PCIP columns to Supabase
Run this AFTER:
1. Running clean-college-data.py to generate universities-cleaned.csv
2. Running the migration add_pcip_columns.sql in Supabase SQL Editor
"""

from supabase import create_client, Client
import pandas as pd
import os
from typing import List, Dict

# Supabase credentials from environment or hardcoded
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://ecalxacozprhkpotruca.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjYWx4YWNvenByaGtwb3RydWNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjc1NDM0NSwiZXhwIjoyMDc4MzMwMzQ1fQ.YbN7-Uuoq9spOa3ecMWjQJK1KIU_WwXoJmhnbRjjEJM')

def load_universities_from_csv(filename: str = 'universities-cleaned.csv') -> pd.DataFrame:
    """Load the universities data from CSV"""
    print(f"Loading data from {filename}...")
    df = pd.read_csv(filename)
    print(f"✓ Loaded {len(df)} universities")
    return df

def convert_row_to_dict(row: pd.Series) -> Dict:
    """Convert a pandas row to dict, handling NaN values"""
    data = row.to_dict()

    # Convert NaN to None (which becomes NULL in PostgreSQL)
    for key, value in data.items():
        if pd.isna(value):
            data[key] = None

    return data

def update_universities_in_supabase(df: pd.DataFrame):
    """
    Update universities in Supabase with PCIP data
    Matches by slug for accuracy
    """

    # Initialize Supabase client
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

    print(f"\nUpdating {len(df)} universities in Supabase with PCIP data...\n")

    updated_count = 0
    not_found_count = 0
    error_count = 0

    # PCIP columns to update
    pcip_columns = [
        'pcip01', 'pcip03', 'pcip04', 'pcip05', 'pcip09', 'pcip10', 'pcip11', 'pcip12',
        'pcip13', 'pcip14', 'pcip15', 'pcip16', 'pcip19', 'pcip22', 'pcip23', 'pcip24',
        'pcip25', 'pcip26', 'pcip27', 'pcip29', 'pcip30', 'pcip31', 'pcip38', 'pcip39',
        'pcip40', 'pcip41', 'pcip42', 'pcip43', 'pcip44', 'pcip45', 'pcip46', 'pcip47',
        'pcip48', 'pcip49', 'pcip50', 'pcip51', 'pcip52', 'pcip54'
    ]

    for i, row in df.iterrows():
        if i % 100 == 0:
            print(f"Progress: {i}/{len(df)}...")

        try:
            # Find matching university by slug (more reliable than name)
            slug = row['slug']

            response = supabase.table('universities')\
                .select('id, name')\
                .eq('slug', slug)\
                .execute()

            if response.data and len(response.data) > 0:
                # Found a match - update it with all data including PCIP
                university_id = response.data[0]['id']

                # Prepare update data
                update_data = {
                    # Core fields
                    'name': row['name'],
                    'city': row['city'],
                    'state': row['state'],
                    'country': row['country'],
                    'latitude': row['latitude'] if pd.notna(row['latitude']) else None,
                    'longitude': row['longitude'] if pd.notna(row['longitude']) else None,
                    'website': row['website'] if pd.notna(row['website']) else None,
                    'type': row['type'] if pd.notna(row['type']) else None,
                    'total_enrollment': int(row['total_enrollment']) if pd.notna(row['total_enrollment']) else None,
                    'undergraduate_enrollment': int(row['undergraduate_enrollment']) if pd.notna(row['undergraduate_enrollment']) else None,
                    'acceptance_rate': float(row['acceptance_rate']) if pd.notna(row['acceptance_rate']) else None,
                    'average_sat': int(row['average_sat']) if pd.notna(row['average_sat']) else None,
                    'average_act': int(row['average_act']) if pd.notna(row['average_act']) else None,
                    'tuition_in_state': int(row['tuition_in_state']) if pd.notna(row['tuition_in_state']) else None,
                    'tuition_out_state': int(row['tuition_out_state']) if pd.notna(row['tuition_out_state']) else None,
                    'room_and_board': int(row['room_and_board']) if pd.notna(row['room_and_board']) else None,
                    'books_supplies': int(row['books_supplies']) if pd.notna(row['books_supplies']) else None,
                    'graduation_rate': float(row['graduation_rate']) if pd.notna(row['graduation_rate']) else None,
                    'retention_rate': float(row['retention_rate']) if pd.notna(row['retention_rate']) else None,
                    'avg_net_price': int(row['avg_net_price']) if pd.notna(row['avg_net_price']) else None,
                    'percent_receiving_aid': float(row['percent_receiving_aid']) if pd.notna(row['percent_receiving_aid']) else None,
                    'student_faculty_ratio': float(row['student_faculty_ratio']) if pd.notna(row['student_faculty_ratio']) else None,
                }

                # Add all PCIP columns
                for pcip_col in pcip_columns:
                    if pcip_col in row.index:
                        update_data[pcip_col] = float(row[pcip_col]) if pd.notna(row[pcip_col]) else None

                # Execute update
                supabase.table('universities')\
                    .update(update_data)\
                    .eq('id', university_id)\
                    .execute()

                updated_count += 1

                if updated_count <= 5:  # Show first 5 updates
                    pcip_sample = {k: v for k, v in update_data.items() if k.startswith('pcip') and v is not None}
                    print(f"  ✓ Updated: {row['name']} - PCIP fields: {len([v for v in pcip_sample.values() if v])}")
            else:
                not_found_count += 1
                if not_found_count <= 5:
                    print(f"  ⚠ Not found: {row['name']} (slug: {slug})")

        except Exception as e:
            error_count += 1
            if error_count <= 5:
                print(f"  ✗ Error updating {row['name']}: {e}")

    print(f"\n{'='*60}")
    print("UPDATE COMPLETE")
    print(f"{'='*60}")
    print(f"✓ Successfully updated: {updated_count}")
    print(f"⚠ Not found in database: {not_found_count}")
    print(f"✗ Errors: {error_count}")

    if not_found_count > 0:
        print(f"\nNote: {not_found_count} universities were not found in the database.")
        print("This is normal if you're updating existing records rather than inserting new ones.")

def insert_new_universities(df: pd.DataFrame):
    """
    Insert new universities (use this if database is empty or you want to add new records)
    """
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

    print(f"\nInserting {len(df)} universities...\n")

    # Convert DataFrame to list of dicts
    universities = []
    for _, row in df.iterrows():
        uni_data = convert_row_to_dict(row)
        # Remove 'id' if it exists (will be auto-generated)
        uni_data.pop('id', None)
        universities.append(uni_data)

    # Batch insert (Supabase can handle ~500 at a time)
    batch_size = 500

    for i in range(0, len(universities), batch_size):
        batch = universities[i:i+batch_size]

        try:
            supabase.table('universities').insert(batch).execute()
            print(f"  ✓ Inserted batch {i//batch_size + 1}: {len(batch)} universities")
        except Exception as e:
            print(f"  ✗ Error inserting batch {i//batch_size + 1}: {e}")

if __name__ == "__main__":
    print("="*60)
    print("SUPABASE PCIP DATA IMPORTER")
    print("="*60)

    # Check if credentials are set
    if 'YOUR_SUPABASE' in SUPABASE_URL or not SUPABASE_URL:
        print("\n⚠️  You need to set your Supabase credentials!")
        print("\nSet environment variables:")
        print("  export SUPABASE_URL='your-url'")
        print("  export SUPABASE_KEY='your-service-role-key'\n")
        exit(1)

    # Load CSV data
    try:
        df = load_universities_from_csv()
        print(f"\n✓ Loaded {len(df)} universities from CSV")
        print(f"\nColumns: {len(df.columns)}")

        # Count PCIP columns
        pcip_cols = [col for col in df.columns if col.startswith('pcip')]
        print(f"PCIP columns found: {len(pcip_cols)}")

        # Show sample
        sample = df.iloc[0]
        pcip_sample = {k: v for k, v in sample.items() if k.startswith('pcip') and pd.notna(v) and v > 0}
        print(f"\nSample university: {sample['name']}")
        print(f"Non-zero PCIP fields: {len(pcip_sample)}")

    except FileNotFoundError:
        print("\n✗ universities-cleaned.csv not found!")
        print("Run clean-college-data.py first to generate the CSV.\n")
        exit(1)

    # Choose import strategy
    print("\n" + "="*60)
    print("Choose import strategy:")
    print("="*60)
    print("1. UPDATE existing universities (recommended - preserves existing data)")
    print("2. INSERT new universities (use if database is empty)")

    choice = input("\nEnter choice (1 or 2): ").strip()

    if choice == '1':
        print("\n⚠️  Make sure you've run the migration SQL first!")
        print("   migrations/add_pcip_columns.sql\n")
        confirm = input("Have you run the migration? (yes/no): ")
        if confirm.lower() == 'yes':
            update_universities_in_supabase(df)
        else:
            print("\nPlease run the migration first, then run this script again.")
    elif choice == '2':
        print("\n⚠️  This will insert all universities as NEW entries.")
        confirm = input("Continue? (yes/no): ")
        if confirm.lower() == 'yes':
            insert_new_universities(df)
    else:
        print("Invalid choice")
