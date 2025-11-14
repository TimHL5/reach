import pandas as pd
import re

def slugify(text):
    """Convert name to URL-friendly slug"""
    if pd.isna(text):
        return None
    text = str(text).lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def clean_college_data():
    """Clean College Scorecard data for import"""
    print("Loading College Scorecard data...")
    
    df = pd.read_csv('collegedata.csv', low_memory=False)
    
    print(f"Total institutions in file: {len(df)}")
    
    # Filter to only 4-year institutions
    if 'PREDDEG' in df.columns:
        df = df[df['PREDDEG'] == 3]
        print(f"After filtering to 4-year institutions: {len(df)}")
    
    # Remove for-profit schools
    if 'CONTROL' in df.columns:
        df = df[df['CONTROL'].isin([1, 2])]
        print(f"After removing for-profit: {len(df)}")
    
    # Helper function
    def get_col(col_name, default=None):
        return df[col_name] if col_name in df.columns else default
    
    # Map to database schema
    cleaned = pd.DataFrame({
        'name': get_col('INSTNM'),
        'slug': get_col('INSTNM', pd.Series()).apply(slugify),
        'city': get_col('CITY'),
        'state': get_col('STABBR'),
        'country': 'USA',
        'latitude': pd.to_numeric(get_col('LATITUDE'), errors='coerce'),
        'longitude': pd.to_numeric(get_col('LONGITUDE', get_col('LONGITUD')), errors='coerce'),
        'website': get_col('INSTURL', pd.Series()).apply(
            lambda x: f"https://{x}" if pd.notna(x) and not str(x).startswith('http') else x
        ),
        'type': get_col('CONTROL', pd.Series()).map({1: 'Public', 2: 'Private Non-Profit'}),
        'total_enrollment': pd.to_numeric(get_col('UGDS'), errors='coerce'),
        'undergraduate_enrollment': pd.to_numeric(get_col('UGDS'), errors='coerce'),
        'acceptance_rate': pd.to_numeric(get_col('ADM_RATE'), errors='coerce') * 100,
        'average_sat': pd.to_numeric(get_col('SAT_AVG'), errors='coerce'),
        'average_act': pd.to_numeric(get_col('ACTCMMID'), errors='coerce'),
        'tuition_in_state': pd.to_numeric(get_col('TUITIONFEE_IN'), errors='coerce'),
        'tuition_out_state': pd.to_numeric(get_col('TUITIONFEE_OUT'), errors='coerce'),
        'room_and_board': pd.to_numeric(get_col('ROOMBOARD_ON'), errors='coerce'),
        'books_supplies': pd.to_numeric(get_col('BOOKSUPPLY'), errors='coerce'),
        'graduation_rate': pd.to_numeric(get_col('C150_4'), errors='coerce') * 100,
        'retention_rate': pd.to_numeric(get_col('RET_FT4'), errors='coerce') * 100,
        'avg_net_price': pd.to_numeric(get_col('NPT4_PUB', get_col('NPT4_PRIV')), errors='coerce'),
        'percent_receiving_aid': pd.to_numeric(get_col('PCTFLOAN'), errors='coerce') * 100,
        'student_faculty_ratio': pd.to_numeric(get_col('STUFACR'), errors='coerce'),
        # PCIP columns - percentage of degrees awarded in each program area
        'pcip01': pd.to_numeric(get_col('PCIP01'), errors='coerce') * 100,  # Agriculture
        'pcip03': pd.to_numeric(get_col('PCIP03'), errors='coerce') * 100,  # Natural Resources
        'pcip04': pd.to_numeric(get_col('PCIP04'), errors='coerce') * 100,  # Architecture
        'pcip05': pd.to_numeric(get_col('PCIP05'), errors='coerce') * 100,  # Area/Ethnic Studies
        'pcip09': pd.to_numeric(get_col('PCIP09'), errors='coerce') * 100,  # Communication
        'pcip10': pd.to_numeric(get_col('PCIP10'), errors='coerce') * 100,  # Communications Technologies
        'pcip11': pd.to_numeric(get_col('PCIP11'), errors='coerce') * 100,  # Computer Science
        'pcip12': pd.to_numeric(get_col('PCIP12'), errors='coerce') * 100,  # Personal/Culinary Services
        'pcip13': pd.to_numeric(get_col('PCIP13'), errors='coerce') * 100,  # Education
        'pcip14': pd.to_numeric(get_col('PCIP14'), errors='coerce') * 100,  # Engineering
        'pcip15': pd.to_numeric(get_col('PCIP15'), errors='coerce') * 100,  # Engineering Technologies
        'pcip16': pd.to_numeric(get_col('PCIP16'), errors='coerce') * 100,  # Foreign Languages
        'pcip19': pd.to_numeric(get_col('PCIP19'), errors='coerce') * 100,  # Family/Consumer Sciences
        'pcip22': pd.to_numeric(get_col('PCIP22'), errors='coerce') * 100,  # Legal Studies
        'pcip23': pd.to_numeric(get_col('PCIP23'), errors='coerce') * 100,  # English
        'pcip24': pd.to_numeric(get_col('PCIP24'), errors='coerce') * 100,  # Liberal Arts
        'pcip25': pd.to_numeric(get_col('PCIP25'), errors='coerce') * 100,  # Library Science
        'pcip26': pd.to_numeric(get_col('PCIP26'), errors='coerce') * 100,  # Biological Sciences
        'pcip27': pd.to_numeric(get_col('PCIP27'), errors='coerce') * 100,  # Mathematics
        'pcip29': pd.to_numeric(get_col('PCIP29'), errors='coerce') * 100,  # Military Sciences
        'pcip30': pd.to_numeric(get_col('PCIP30'), errors='coerce') * 100,  # Multidisciplinary Studies
        'pcip31': pd.to_numeric(get_col('PCIP31'), errors='coerce') * 100,  # Parks/Recreation
        'pcip38': pd.to_numeric(get_col('PCIP38'), errors='coerce') * 100,  # Philosophy/Religious Studies
        'pcip39': pd.to_numeric(get_col('PCIP39'), errors='coerce') * 100,  # Theology
        'pcip40': pd.to_numeric(get_col('PCIP40'), errors='coerce') * 100,  # Physical Sciences
        'pcip41': pd.to_numeric(get_col('PCIP41'), errors='coerce') * 100,  # Science Technologies
        'pcip42': pd.to_numeric(get_col('PCIP42'), errors='coerce') * 100,  # Psychology
        'pcip43': pd.to_numeric(get_col('PCIP43'), errors='coerce') * 100,  # Homeland Security/Law Enforcement
        'pcip44': pd.to_numeric(get_col('PCIP44'), errors='coerce') * 100,  # Public Administration
        'pcip45': pd.to_numeric(get_col('PCIP45'), errors='coerce') * 100,  # Social Sciences
        'pcip46': pd.to_numeric(get_col('PCIP46'), errors='coerce') * 100,  # Construction Trades
        'pcip47': pd.to_numeric(get_col('PCIP47'), errors='coerce') * 100,  # Mechanic/Repair Technologies
        'pcip48': pd.to_numeric(get_col('PCIP48'), errors='coerce') * 100,  # Precision Production
        'pcip49': pd.to_numeric(get_col('PCIP49'), errors='coerce') * 100,  # Transportation
        'pcip50': pd.to_numeric(get_col('PCIP50'), errors='coerce') * 100,  # Visual/Performing Arts
        'pcip51': pd.to_numeric(get_col('PCIP51'), errors='coerce') * 100,  # Health Professions
        'pcip52': pd.to_numeric(get_col('PCIP52'), errors='coerce') * 100,  # Business/Management
        'pcip54': pd.to_numeric(get_col('PCIP54'), errors='coerce') * 100,  # History
    })
    
    # Remove schools with missing critical data
    cleaned = cleaned.dropna(subset=['name', 'city', 'state', 'slug'])
    cleaned = cleaned.drop_duplicates(subset=['slug'], keep='first')
    cleaned = cleaned.sort_values('total_enrollment', ascending=False, na_position='last')
    cleaned = cleaned.head(2000)
    
    # Fix data types
    print("\nConverting data types...")
    
    # Integer columns (remove decimals)
    int_columns = [
        'total_enrollment', 'undergraduate_enrollment', 'average_sat', 'average_act',
        'tuition_in_state', 'tuition_out_state', 'room_and_board', 'books_supplies',
        'avg_net_price'
    ]
    
    for col in int_columns:
        if col in cleaned.columns:
            cleaned[col] = cleaned[col].round(0).astype('Int64')  # Int64 allows NaN
    
    # Percentage columns (2 decimals)
    percentage_columns = ['acceptance_rate', 'graduation_rate', 'retention_rate', 'percent_receiving_aid']
    for col in percentage_columns:
        if col in cleaned.columns:
            cleaned[col] = cleaned[col].round(2)

    # PCIP percentage columns (2 decimals)
    pcip_columns = [
        'pcip01', 'pcip03', 'pcip04', 'pcip05', 'pcip09', 'pcip10', 'pcip11', 'pcip12',
        'pcip13', 'pcip14', 'pcip15', 'pcip16', 'pcip19', 'pcip22', 'pcip23', 'pcip24',
        'pcip25', 'pcip26', 'pcip27', 'pcip29', 'pcip30', 'pcip31', 'pcip38', 'pcip39',
        'pcip40', 'pcip41', 'pcip42', 'pcip43', 'pcip44', 'pcip45', 'pcip46', 'pcip47',
        'pcip48', 'pcip49', 'pcip50', 'pcip51', 'pcip52', 'pcip54'
    ]
    for col in pcip_columns:
        if col in cleaned.columns:
            cleaned[col] = cleaned[col].round(2)
    
    # Save
    output_file = 'universities-cleaned.csv'
    cleaned.to_csv(output_file, index=False)
    
    print(f"\n✓ Cleaning complete!")
    print(f"  Output file: {output_file}")
    print(f"  Total universities: {len(cleaned)}")
    print(f"  Public: {len(cleaned[cleaned['type'] == 'Public'])}")
    print(f"  Private: {len(cleaned[cleaned['type'] == 'Private Non-Profit'])}")
    
    print(f"\nData completeness:")
    print(f"  Schools with SAT scores: {cleaned['average_sat'].notna().sum()}")
    print(f"  Schools with ACT scores: {cleaned['average_act'].notna().sum()}")
    print(f"  Schools with acceptance rate: {cleaned['acceptance_rate'].notna().sum()}")
    
    print(f"\nSample:")
    print(cleaned.head(5)[['name', 'city', 'total_enrollment', 'acceptance_rate']])

if __name__ == '__main__':
    clean_college_data()