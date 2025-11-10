# University Data Update Guide

## Problem
Your acceptance rates are showing wildly incorrect values (6388%, 10000%, etc.) because:
1. ✅ **FIXED**: Display bug multiplying by 100
2. ❌ **TODO**: Database has incorrect source data

## Solution: Use College Scorecard API

### Why College Scorecard?
- ✅ **Free** - No API key needed for basic queries
- ✅ **Legal** - Government public data
- ✅ **Accurate** - Official US Department of Education data
- ✅ **Complete** - ~7,000 institutions with acceptance rates, enrollment, tuition
- ❌ US News requires paid subscription and has anti-scraping measures

### Step-by-Step Instructions

#### Step 1: Install Requirements
```bash
pip install requests supabase
```

#### Step 2: Fetch Real Data
```bash
python update_university_data.py
```

This will:
- Fetch ~2,000 universities from College Scorecard API
- Convert to your Supabase schema format
- Save to `universities_updated.json`
- Show sample data for verification

**Expected output:**
```
Fetching page 1...
  ✓ Got 100 schools (Total: 100)
Fetching page 2...
  ✓ Got 100 schools (Total: 200)
...
✓ Saved 1,814 universities to universities_updated.json

SAMPLE DATA:
Harvard University
  Location: Cambridge, MA
  Acceptance Rate: 3.4%
  Enrollment: 31,655
  Type: Private Non-Profit
```

#### Step 3: Review the Data
```bash
cat universities_updated.json | head -50
```

Verify a few universities look correct.

#### Step 4: Update Supabase

**OPTION A: Python Script (Recommended)**

1. Edit `update_supabase_direct.py` and add your credentials:
```python
SUPABASE_URL = 'https://your-project.supabase.co'
SUPABASE_KEY = 'your-service-role-key'  # From Supabase Settings > API
```

2. Run it:
```bash
python update_supabase_direct.py
```

3. Choose option 1 (UPDATE existing) to fix acceptance rates

**OPTION B: Manual via Supabase Dashboard**

1. Go to Supabase project → Table Editor → universities
2. Click "Import data from CSV/JSON"
3. Upload `universities_updated.json`
4. Map columns correctly
5. Choose "Update existing rows" (match by `name`)

**OPTION C: SQL in Supabase**

1. Go to Supabase → SQL Editor
2. Create temp table and import JSON:
```sql
-- Create temp table
CREATE TEMP TABLE universities_temp (
  name TEXT,
  acceptance_rate NUMERIC,
  total_enrollment INTEGER,
  tuition_out_state INTEGER
);

-- Import JSON (use Supabase UI to import into temp table)

-- Update main table
UPDATE universities u
SET 
    acceptance_rate = t.acceptance_rate,
    total_enrollment = t.total_enrollment,
    tuition_out_state = t.tuition_out_state
FROM universities_temp t
WHERE LOWER(u.name) = LOWER(t.name);
```

### Step 5: Verify on Website

1. Refresh your website
2. Check universities - acceptance rates should now be realistic:
   - Harvard: ~3-5%
   - Stanford: ~3-5%
   - MIT: ~4-7%
   - State schools: 20-80%

## What Changed in Your Code

### Fixed in `UniversityCard.tsx`
```tsx
// BEFORE (wrong)
<span>{(university.acceptance_rate * 100).toFixed(1)}%</span>

// AFTER (correct)
<span>{university.acceptance_rate.toFixed(1)}%</span>
```

### Fixed in `UniversityExplorer.tsx`
```tsx
// BEFORE (wrong)
u.acceptance_rate * 100 >= filters.minAcceptance

// AFTER (correct)  
u.acceptance_rate >= filters.minAcceptance
```

## Data Format

College Scorecard stores acceptance rate as **decimal** (0.15 = 15%)  
Your Supabase should store as **percentage** (15.0 = 15%)

The conversion happens in `update_university_data.py`:
```python
'acceptance_rate': round(admission_rate * 100, 2) if admission_rate else None
```

## Troubleshooting

### "No universities fetched"
- Check internet connection
- Try with fewer pages: `fetch_all_universities(max_pages=5)`

### "Not found in database"
- Universities might have slightly different names
- Add fuzzy matching logic if needed
- Or use IPEDS ID for exact matching

### Still seeing wrong rates?
1. Hard refresh browser (Cmd+Shift+R)
2. Check Supabase to verify data updated
3. Check browser console for errors

## Alternative: Add US News Rankings Manually

For top schools, you can manually add US News rankings:

```sql
UPDATE universities 
SET us_news_rank = 1 
WHERE name = 'Princeton University';

UPDATE universities 
SET us_news_rank = 2 
WHERE name = 'Massachusetts Institute of Technology';
-- etc...
```

## Questions?

The scripts have detailed logging. Check output for any errors!
