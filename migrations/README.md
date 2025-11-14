# PCIP Columns Migration Guide

This directory contains the database migration to add PCIP (Classification of Instructional Programs) columns to the universities table.

## What are PCIP Columns?

PCIP columns store the percentage of degrees awarded by each university in 38 different program areas (e.g., Computer Science, Engineering, Business, etc.). This data enables major/program-based college matching and search functionality.

## Migration File

- **File**: `add_pcip_columns.sql`
- **Description**: Adds 38 PCIP columns to the `universities` table
- **Column Type**: `DECIMAL(5,2)` - Stores percentages from 0.00 to 100.00

## How to Run the Migration

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://supabase.com/dashboard/project/ecalxacozprhkpotruca
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `migrations/add_pcip_columns.sql`
5. Paste into the SQL editor
6. Click **Run** or press `Ctrl+Enter`

### Option 2: Command Line (psql)

If you have psql installed and your database connection string:

```bash
psql <your-connection-string> < migrations/add_pcip_columns.sql
```

### Option 3: Python Script (Limited)

```bash
python scripts/run_migration.py
```

Note: The Python Supabase client doesn't support direct SQL execution, so this script primarily provides instructions.

## After Running the Migration

Once the migration is complete, import the cleaned data with PCIP columns:

```bash
# Import universities data with PCIP columns
python scripts/import_universities_with_pcip.py
```

Choose option 1 (UPDATE existing universities) to preserve existing data and add PCIP information.

## Verify the Migration

To verify the columns were added successfully, run this query in the SQL Editor:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'universities'
  AND column_name LIKE 'pcip%'
ORDER BY column_name;
```

You should see 38 rows showing pcip01 through pcip54 (some numbers are skipped in the PCIP classification system).

## PCIP Column Reference

| Column | Program Area |
|--------|-------------|
| pcip01 | Agriculture, Agriculture Operations, And Related Sciences |
| pcip03 | Natural Resources And Conservation |
| pcip04 | Architecture And Related Services |
| pcip05 | Area, Ethnic, Cultural, Gender, And Group Studies |
| pcip09 | Communication, Journalism, And Related Programs |
| pcip10 | Communications Technologies/Technicians |
| pcip11 | Computer And Information Sciences |
| pcip12 | Personal And Culinary Services |
| pcip13 | Education |
| pcip14 | Engineering |
| pcip15 | Engineering Technologies |
| pcip16 | Foreign Languages, Literatures, And Linguistics |
| pcip19 | Family And Consumer Sciences/Human Sciences |
| pcip22 | Law And Legal Studies |
| pcip23 | English Language And Literature/Letters |
| pcip24 | Liberal Arts And Sciences |
| pcip25 | Library Science |
| pcip26 | Biological And Biomedical Sciences |
| pcip27 | Mathematics And Statistics |
| pcip29 | Military Sciences And Technologies |
| pcip30 | Multidisciplinary Studies |
| pcip31 | Parks, Recreation, Leisure, And Fitness Studies |
| pcip38 | Philosophy And Religious Studies |
| pcip39 | Theology And Religious Vocations |
| pcip40 | Physical Sciences |
| pcip41 | Science Technologies/Technicians |
| pcip42 | Psychology |
| pcip43 | Homeland Security, Law Enforcement, And Firefighting |
| pcip44 | Public Administration And Social Service |
| pcip45 | Social Sciences |
| pcip46 | Construction Trades |
| pcip47 | Mechanic And Repair Technologies/Technicians |
| pcip48 | Precision Production |
| pcip49 | Transportation And Materials Moving |
| pcip50 | Visual And Performing Arts |
| pcip51 | Health Professions And Related Programs |
| pcip52 | Business, Management, Marketing |
| pcip54 | History |

## Data Source

PCIP data comes from the US Department of Education College Scorecard dataset (`collegedata.csv`), which contains detailed institutional data for US colleges and universities.

## Related Files

- **Data Cleaning**: `scripts/clean-college-data.py` - Extracts PCIP data from raw CSV
- **Import Script**: `scripts/import_universities_with_pcip.py` - Imports cleaned data to Supabase
- **TypeScript Types**: `src/types/university.ts` - Updated with PCIP column definitions
- **Cleaned Data**: `universities-cleaned.csv` - Generated CSV with PCIP columns populated
