-- Migration: Add PCIP (Classification of Instructional Programs) columns to universities table
-- Date: 2025-11-14
-- Description: Adds 38 PCIP columns to support major/program search functionality
-- Each column represents the percentage of degrees awarded in that program area (0-100)

-- Add PCIP columns to universities table
ALTER TABLE universities

-- Agriculture, Agriculture Operations, And Related Sciences
ADD COLUMN IF NOT EXISTS pcip01 DECIMAL(5,2),

-- Natural Resources And Conservation
ADD COLUMN IF NOT EXISTS pcip03 DECIMAL(5,2),

-- Architecture And Related Services
ADD COLUMN IF NOT EXISTS pcip04 DECIMAL(5,2),

-- Area, Ethnic, Cultural, Gender, And Group Studies
ADD COLUMN IF NOT EXISTS pcip05 DECIMAL(5,2),

-- Communication, Journalism, And Related Programs
ADD COLUMN IF NOT EXISTS pcip09 DECIMAL(5,2),

-- Communications Technologies/Technicians And Support Services
ADD COLUMN IF NOT EXISTS pcip10 DECIMAL(5,2),

-- Computer And Information Sciences And Support Services
ADD COLUMN IF NOT EXISTS pcip11 DECIMAL(5,2),

-- Personal And Culinary Services
ADD COLUMN IF NOT EXISTS pcip12 DECIMAL(5,2),

-- Education
ADD COLUMN IF NOT EXISTS pcip13 DECIMAL(5,2),

-- Engineering
ADD COLUMN IF NOT EXISTS pcip14 DECIMAL(5,2),

-- Engineering Technologies And Engineering-Related Fields
ADD COLUMN IF NOT EXISTS pcip15 DECIMAL(5,2),

-- Foreign Languages, Literatures, And Linguistics
ADD COLUMN IF NOT EXISTS pcip16 DECIMAL(5,2),

-- Family And Consumer Sciences/Human Sciences
ADD COLUMN IF NOT EXISTS pcip19 DECIMAL(5,2),

-- Law And Legal Studies
ADD COLUMN IF NOT EXISTS pcip22 DECIMAL(5,2),

-- English Language And Literature/Letters
ADD COLUMN IF NOT EXISTS pcip23 DECIMAL(5,2),

-- Liberal Arts And Sciences, General Studies And Humanities
ADD COLUMN IF NOT EXISTS pcip24 DECIMAL(5,2),

-- Library Science
ADD COLUMN IF NOT EXISTS pcip25 DECIMAL(5,2),

-- Biological And Biomedical Sciences
ADD COLUMN IF NOT EXISTS pcip26 DECIMAL(5,2),

-- Mathematics And Statistics
ADD COLUMN IF NOT EXISTS pcip27 DECIMAL(5,2),

-- Military Sciences And Technologies
ADD COLUMN IF NOT EXISTS pcip29 DECIMAL(5,2),

-- Multidisciplinary Studies
ADD COLUMN IF NOT EXISTS pcip30 DECIMAL(5,2),

-- Parks, Recreation, Leisure, And Fitness Studies
ADD COLUMN IF NOT EXISTS pcip31 DECIMAL(5,2),

-- Philosophy And Religious Studies
ADD COLUMN IF NOT EXISTS pcip38 DECIMAL(5,2),

-- Theology And Religious Vocations
ADD COLUMN IF NOT EXISTS pcip39 DECIMAL(5,2),

-- Physical Sciences
ADD COLUMN IF NOT EXISTS pcip40 DECIMAL(5,2),

-- Science Technologies/Technicians
ADD COLUMN IF NOT EXISTS pcip41 DECIMAL(5,2),

-- Psychology
ADD COLUMN IF NOT EXISTS pcip42 DECIMAL(5,2),

-- Homeland Security, Law Enforcement, And Firefighting
ADD COLUMN IF NOT EXISTS pcip43 DECIMAL(5,2),

-- Public Administration And Social Service Professions
ADD COLUMN IF NOT EXISTS pcip44 DECIMAL(5,2),

-- Social Sciences
ADD COLUMN IF NOT EXISTS pcip45 DECIMAL(5,2),

-- Construction Trades
ADD COLUMN IF NOT EXISTS pcip46 DECIMAL(5,2),

-- Mechanic And Repair Technologies/Technicians
ADD COLUMN IF NOT EXISTS pcip47 DECIMAL(5,2),

-- Precision Production
ADD COLUMN IF NOT EXISTS pcip48 DECIMAL(5,2),

-- Transportation And Materials Moving
ADD COLUMN IF NOT EXISTS pcip49 DECIMAL(5,2),

-- Visual And Performing Arts
ADD COLUMN IF NOT EXISTS pcip50 DECIMAL(5,2),

-- Health Professions And Related Programs
ADD COLUMN IF NOT EXISTS pcip51 DECIMAL(5,2),

-- Business, Management, Marketing, And Related Support Services
ADD COLUMN IF NOT EXISTS pcip52 DECIMAL(5,2),

-- History
ADD COLUMN IF NOT EXISTS pcip54 DECIMAL(5,2);

-- Add comment to table documenting PCIP columns
COMMENT ON COLUMN universities.pcip01 IS 'Agriculture, Agriculture Operations, And Related Sciences (% of degrees)';
COMMENT ON COLUMN universities.pcip03 IS 'Natural Resources And Conservation (% of degrees)';
COMMENT ON COLUMN universities.pcip04 IS 'Architecture And Related Services (% of degrees)';
COMMENT ON COLUMN universities.pcip05 IS 'Area, Ethnic, Cultural, Gender, And Group Studies (% of degrees)';
COMMENT ON COLUMN universities.pcip09 IS 'Communication, Journalism, And Related Programs (% of degrees)';
COMMENT ON COLUMN universities.pcip10 IS 'Communications Technologies/Technicians And Support Services (% of degrees)';
COMMENT ON COLUMN universities.pcip11 IS 'Computer And Information Sciences And Support Services (% of degrees)';
COMMENT ON COLUMN universities.pcip12 IS 'Personal And Culinary Services (% of degrees)';
COMMENT ON COLUMN universities.pcip13 IS 'Education (% of degrees)';
COMMENT ON COLUMN universities.pcip14 IS 'Engineering (% of degrees)';
COMMENT ON COLUMN universities.pcip15 IS 'Engineering Technologies And Engineering-Related Fields (% of degrees)';
COMMENT ON COLUMN universities.pcip16 IS 'Foreign Languages, Literatures, And Linguistics (% of degrees)';
COMMENT ON COLUMN universities.pcip19 IS 'Family And Consumer Sciences/Human Sciences (% of degrees)';
COMMENT ON COLUMN universities.pcip22 IS 'Law And Legal Studies (% of degrees)';
COMMENT ON COLUMN universities.pcip23 IS 'English Language And Literature/Letters (% of degrees)';
COMMENT ON COLUMN universities.pcip24 IS 'Liberal Arts And Sciences, General Studies And Humanities (% of degrees)';
COMMENT ON COLUMN universities.pcip25 IS 'Library Science (% of degrees)';
COMMENT ON COLUMN universities.pcip26 IS 'Biological And Biomedical Sciences (% of degrees)';
COMMENT ON COLUMN universities.pcip27 IS 'Mathematics And Statistics (% of degrees)';
COMMENT ON COLUMN universities.pcip29 IS 'Military Sciences And Technologies (% of degrees)';
COMMENT ON COLUMN universities.pcip30 IS 'Multidisciplinary Studies (% of degrees)';
COMMENT ON COLUMN universities.pcip31 IS 'Parks, Recreation, Leisure, And Fitness Studies (% of degrees)';
COMMENT ON COLUMN universities.pcip38 IS 'Philosophy And Religious Studies (% of degrees)';
COMMENT ON COLUMN universities.pcip39 IS 'Theology And Religious Vocations (% of degrees)';
COMMENT ON COLUMN universities.pcip40 IS 'Physical Sciences (% of degrees)';
COMMENT ON COLUMN universities.pcip41 IS 'Science Technologies/Technicians (% of degrees)';
COMMENT ON COLUMN universities.pcip42 IS 'Psychology (% of degrees)';
COMMENT ON COLUMN universities.pcip43 IS 'Homeland Security, Law Enforcement, And Firefighting (% of degrees)';
COMMENT ON COLUMN universities.pcip44 IS 'Public Administration And Social Service Professions (% of degrees)';
COMMENT ON COLUMN universities.pcip45 IS 'Social Sciences (% of degrees)';
COMMENT ON COLUMN universities.pcip46 IS 'Construction Trades (% of degrees)';
COMMENT ON COLUMN universities.pcip47 IS 'Mechanic And Repair Technologies/Technicians (% of degrees)';
COMMENT ON COLUMN universities.pcip48 IS 'Precision Production (% of degrees)';
COMMENT ON COLUMN universities.pcip49 IS 'Transportation And Materials Moving (% of degrees)';
COMMENT ON COLUMN universities.pcip50 IS 'Visual And Performing Arts (% of degrees)';
COMMENT ON COLUMN universities.pcip51 IS 'Health Professions And Related Programs (% of degrees)';
COMMENT ON COLUMN universities.pcip52 IS 'Business, Management, Marketing, And Related Support Services (% of degrees)';
COMMENT ON COLUMN universities.pcip54 IS 'History (% of degrees)';
