"""
Script to fetch real university data from College Scorecard API and update Supabase
College Scorecard has accurate acceptance rates, enrollment, tuition, etc.
"""

import requests
import json
from typing import List, Dict
import time

# College Scorecard API
API_KEY = "mX9K3DohGUe0UsG6cXRlqgxRDQHtNDu3BwZ5tSek"
BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools"

def fetch_universities(page: int = 0, per_page: int = 100) -> Dict:
    """
    Fetch universities from College Scorecard API
    
    Key fields:
    - school.name: University name
    - school.city: City
    - school.state: State
    - latest.admissions.admission_rate.overall: Acceptance rate (0-1, e.g., 0.15 = 15%)
    - latest.student.size: Total enrollment
    - latest.cost.tuition.out_of_state: Out-of-state tuition
    - school.school_url: Website
    - school.ownership: 1=Public, 2=Private nonprofit, 3=Private for-profit
    """
    
    params = {
        'api_key': API_KEY,
        'fields': ','.join([
            'id',
            'school.name',
            'school.city',
            'school.state',
            'school.zip',
            'school.school_url',
            'school.ownership',
            'latest.admissions.admission_rate.overall',
            'latest.student.size',
            'latest.cost.tuition.out_of_state',
            'latest.cost.tuition.in_state',
        ]),
        'school.degrees_awarded.predominant': '3',  # Bachelor's degree granting
        'school.operating': '1',  # Currently operating
        'per_page': per_page,
        'page': page,
    }
    
    response = requests.get(BASE_URL, params=params)
    response.raise_for_status()
    return response.json()

def convert_to_supabase_format(school: Dict) -> Dict:
    """Convert College Scorecard format to your Supabase schema"""
    
    # Map ownership to readable type
    ownership_map = {
        1: 'Public',
        2: 'Private Non-Profit',
        3: 'Private For-Profit'
    }
    
    admission_rate = school.get('latest.admissions.admission_rate.overall')
    
    return {
        'name': school.get('school.name'),
        'city': school.get('school.city'),
        'state': school.get('school.state'),
        'country': 'United States',  # College Scorecard is US only
        'zip_code': school.get('school.zip'),
        'website': school.get('school.school_url'),
        'type': ownership_map.get(school.get('school.ownership')),
        
        # Convert acceptance rate from decimal (0.15) to percentage (15.0)
        'acceptance_rate': round(admission_rate * 100, 2) if admission_rate else None,
        
        'total_enrollment': school.get('latest.student.size'),
        'tuition_out_state': school.get('latest.cost.tuition.out_of_state'),
        'tuition_in_state': school.get('latest.cost.tuition.in_state'),
        
        # College Scorecard doesn't have US News rankings
        'us_news_rank': None,
    }

def fetch_all_universities(max_pages: int = 20) -> List[Dict]:
    """Fetch multiple pages of universities"""
    all_universities = []
    
    print("Fetching universities from College Scorecard API...\n")
    
    for page in range(max_pages):
        print(f"Fetching page {page + 1}...")
        
        try:
            data = fetch_universities(page=page)
            schools = data.get('results', [])
            
            if not schools:
                print("No more schools found.")
                break
            
            for school in schools:
                converted = convert_to_supabase_format(school)
                
                # Only add if we have basic required data
                if converted['name'] and converted['city']:
                    all_universities.append(converted)
            
            print(f"  ✓ Got {len(schools)} schools (Total: {len(all_universities)})")
            
            # Rate limiting - be nice to the API
            time.sleep(0.5)
            
        except Exception as e:
            print(f"  ✗ Error on page {page + 1}: {e}")
            break
    
    return all_universities

def save_to_json(universities: List[Dict], filename: str = 'universities_updated.json'):
    """Save to JSON file for review before uploading to Supabase"""
    with open(filename, 'w') as f:
        json.dump(universities, f, indent=2)
    print(f"\n✓ Saved {len(universities)} universities to {filename}")

def generate_supabase_update_script(universities: List[Dict]):
    """Generate SQL for updating Supabase"""
    
    print("\n" + "="*60)
    print("NEXT STEPS TO UPDATE SUPABASE:")
    print("="*60)
    print("\n1. Review 'universities_updated.json' to verify data")
    print("\n2. Go to your Supabase project dashboard")
    print("\n3. Navigate to SQL Editor")
    print("\n4. You have two options:")
    print("\n   OPTION A: FULL REPLACE (wipes existing data)")
    print("   " + "-"*50)
    print("   TRUNCATE universities;")
    print("   -- Then use the Supabase Table Editor to import universities_updated.json")
    
    print("\n   OPTION B: UPDATE EXISTING (keeps your data, updates acceptance rates)")
    print("   " + "-"*50)
    print("   -- Create a temp table, import JSON there, then:")
    print("""
    UPDATE universities u
    SET 
        acceptance_rate = t.acceptance_rate,
        total_enrollment = t.total_enrollment,
        tuition_out_state = t.tuition_out_state,
        tuition_in_state = t.tuition_in_state
    FROM universities_temp t
    WHERE LOWER(u.name) = LOWER(t.name) 
       OR u.ipeds_id = t.ipeds_id;
    """)
    
    print("\n5. Alternatively, use Python with Supabase client:")
    print("   pip install supabase")
    print("   # See example code in update_supabase.py\n")

if __name__ == "__main__":
    print("="*60)
    print("COLLEGE SCORECARD DATA UPDATER")
    print("="*60)
    
    # Fetch data (20 pages = ~2000 universities)
    universities = fetch_all_universities(max_pages=20)
    
    if universities:
        # Save to JSON
        save_to_json(universities)
        
        # Show sample
        print("\n" + "="*60)
        print("SAMPLE DATA:")
        print("="*60)
        for uni in universities[:3]:
            print(f"\n{uni['name']}")
            print(f"  Location: {uni['city']}, {uni['state']}")
            print(f"  Acceptance Rate: {uni['acceptance_rate']}%")
            print(f"  Enrollment: {uni['total_enrollment']}")
            print(f"  Type: {uni['type']}")
        
        # Generate update instructions
        generate_supabase_update_script(universities)
    else:
        print("\n✗ No universities fetched. Check your internet connection.")

