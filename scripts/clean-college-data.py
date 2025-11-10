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