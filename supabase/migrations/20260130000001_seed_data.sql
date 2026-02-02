-- Tebra Mental Health MVP: Seed Data Migration
-- Realistic demo data with Tim Anders as featured patient

-- ============================================
-- PRACTICE
-- ============================================
INSERT INTO practices (id, name, address, phone, email, created_at)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Serenity Therapy Group',
  '123 Wellness Way, Suite 200, San Francisco, CA 94102',
  '(415) 555-0100',
  'info@serenitygroup.com',
  NOW() - INTERVAL '2 years'
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- USERS (Providers & Staff)
-- ============================================
INSERT INTO users (id, practice_id, email, name, role, credentials, phone, created_at)
VALUES
  (
    'b0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'sarah.chen@serenitygroup.com',
    'Dr. Sarah Chen',
    'therapist',
    'PhD, LMFT',
    '(415) 555-0101',
    NOW() - INTERVAL '2 years'
  ),
  (
    'b0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'jay.trainer@serenitygroup.com',
    'Jay Trainer',
    'admin',
    NULL,
    '(415) 555-0102',
    NOW() - INTERVAL '1 year'
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- PATIENTS (58 Total - Tim Anders is First)
-- ============================================

-- Tim Anders (Featured Demo Patient)
INSERT INTO patients (
  id, practice_id, first_name, last_name, email, phone, date_of_birth, pronouns,
  address, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship,
  chief_complaint, treatment_plan, active_diagnoses, insurance_provider, insurance_id, created_at
)
VALUES (
  'c0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'Tim',
  'Anders',
  'tim.anders@email.com',
  '(415) 555-1001',
  '1990-03-15',
  'he/him',
  '456 Oak Street, Apt 3B, San Francisco, CA 94110',
  'Rachel Anders',
  '(415) 555-1002',
  'Spouse',
  'Anxiety and work stress',
  'Weekly CBT sessions focused on anxiety management, work-life balance, and stress reduction techniques. Client is motivated and engaged in treatment.',
  'F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety',
  'Blue Cross Blue Shield',
  'BCBS-9876543',
  NOW() - INTERVAL '8 months'
) ON CONFLICT (id) DO NOTHING;

-- Additional 57 Patients
INSERT INTO patients (
  practice_id, first_name, last_name, email, phone, date_of_birth, pronouns,
  chief_complaint, active_diagnoses, insurance_provider, created_at
)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Sarah', 'Martinez', 'sarah.m@email.com', '(415) 555-2001', '1985-07-22', 'she/her', 'Depression and isolation', 'F33.1 Major Depressive Disorder, Recurrent, Moderate', 'Aetna', NOW() - INTERVAL '1 year'),
  ('a0000000-0000-0000-0000-000000000001', 'Michael', 'Johnson', 'mjohnson@email.com', '(415) 555-2002', '1978-11-30', 'he/him', 'Relationship issues', 'Z63.0 Relationship Distress with Spouse', 'Cigna', NOW() - INTERVAL '5 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Emily', 'Chen', 'emily.chen@email.com', '(415) 555-2003', '1992-02-14', 'she/her', 'Social anxiety', 'F40.10 Social Anxiety Disorder', 'Kaiser Permanente', NOW() - INTERVAL '6 months'),
  ('a0000000-0000-0000-0000-000000000001', 'David', 'Williams', 'dwilliams@email.com', '(415) 555-2004', '1988-09-05', 'he/him', 'Panic attacks', 'F41.0 Panic Disorder', 'United Healthcare', NOW() - INTERVAL '4 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Jennifer', 'Brown', 'jbrown@email.com', '(415) 555-2005', '1995-04-18', 'she/her', 'Eating disorder recovery', 'F50.02 Anorexia Nervosa, Restricting Type', 'Blue Shield', NOW() - INTERVAL '10 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Robert', 'Garcia', 'rgarcia@email.com', '(415) 555-2006', '1980-12-25', 'he/him', 'Alcohol use', 'F10.20 Alcohol Use Disorder, Moderate', 'Medicare', NOW() - INTERVAL '7 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Lisa', 'Anderson', 'landerson@email.com', '(415) 555-2007', '1987-06-08', 'she/her', 'Grief and loss', 'Z63.4 Bereavement', 'Aetna', NOW() - INTERVAL '3 months'),
  ('a0000000-0000-0000-0000-000000000001', 'James', 'Taylor', 'jtaylor@email.com', '(415) 555-2008', '1993-10-12', 'he/him', 'ADHD and focus issues', 'F90.0 Attention-Deficit/Hyperactivity Disorder', 'Cigna', NOW() - INTERVAL '9 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Amanda', 'Thomas', 'athomas@email.com', '(415) 555-2009', '1991-01-27', 'she/her', 'Postpartum depression', 'F53.0 Postpartum Depression', 'Blue Cross', NOW() - INTERVAL '4 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Christopher', 'Moore', 'cmoore@email.com', '(415) 555-2010', '1982-08-19', 'he/him', 'Work burnout', 'Z56.6 Burnout', 'Kaiser', NOW() - INTERVAL '2 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Michelle', 'Martin', 'mmartin@email.com', '(415) 555-2011', '1989-05-03', 'she/her', 'Trauma from childhood', 'F43.10 PTSD', 'United Healthcare', NOW() - INTERVAL '1 year'),
  ('a0000000-0000-0000-0000-000000000001', 'Daniel', 'Lee', 'dlee@email.com', '(415) 555-2012', '1994-03-29', 'he/him', 'Performance anxiety', 'F41.1 Generalized Anxiety Disorder', 'Aetna', NOW() - INTERVAL '5 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Jessica', 'White', 'jwhite@email.com', '(415) 555-2013', '1986-11-16', 'she/her', 'Obsessive thoughts', 'F42.2 OCD, Mixed Thoughts and Acts', 'Blue Shield', NOW() - INTERVAL '8 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Matthew', 'Harris', 'mharris@email.com', '(415) 555-2014', '1979-07-07', 'he/him', 'Sleep issues and stress', 'F51.01 Insomnia, Chronic', 'Medicare', NOW() - INTERVAL '6 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Nicole', 'Clark', 'nclark@email.com', '(415) 555-2015', '1990-12-21', 'she/her', 'Bipolar disorder management', 'F31.81 Bipolar II Disorder', 'Cigna', NOW() - INTERVAL '2 years'),
  ('a0000000-0000-0000-0000-000000000001', 'Kevin', 'Lewis', 'klewis@email.com', '(415) 555-2016', '1983-04-09', 'he/him', 'Anger management', 'F63.81 Intermittent Explosive Disorder', 'Kaiser', NOW() - INTERVAL '4 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Rachel', 'Walker', 'rwalker@email.com', '(415) 555-2017', '1992-09-14', 'she/her', 'Body image issues', 'F45.22 Body Dysmorphic Disorder', 'United Healthcare', NOW() - INTERVAL '7 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Brian', 'Hall', 'bhall@email.com', '(415) 555-2018', '1987-02-28', 'he/him', 'Chronic pain and depression', 'F33.1 Major Depressive Disorder', 'Aetna', NOW() - INTERVAL '1 year'),
  ('a0000000-0000-0000-0000-000000000001', 'Stephanie', 'Allen', 'sallen@email.com', '(415) 555-2019', '1996-06-11', 'she/her', 'College transition stress', 'F43.22 Adjustment Disorder', 'Blue Cross', NOW() - INTERVAL '3 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Steven', 'Young', 'syoung@email.com', '(415) 555-2020', '1981-10-05', 'he/him', 'Marital conflict', 'Z63.0 Relationship Distress', 'Blue Shield', NOW() - INTERVAL '5 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Lauren', 'King', 'lking@email.com', '(415) 555-2021', '1993-01-19', 'she/her', 'Self-esteem issues', 'F34.1 Dysthymia', 'Medicare', NOW() - INTERVAL '9 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Andrew', 'Wright', 'awright@email.com', '(415) 555-2022', '1984-08-23', 'he/him', 'Career transition anxiety', 'F41.1 Generalized Anxiety Disorder', 'Cigna', NOW() - INTERVAL '2 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Megan', 'Lopez', 'mlopez@email.com', '(415) 555-2023', '1991-05-07', 'she/her', 'Perfectionism and stress', 'F42.8 OCD, Other Specified', 'Kaiser', NOW() - INTERVAL '6 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Joshua', 'Hill', 'jhill@email.com', '(415) 555-2024', '1986-12-15', 'he/him', 'Substance abuse recovery', 'F11.20 Opioid Use Disorder', 'United Healthcare', NOW() - INTERVAL '8 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Brittany', 'Scott', 'bscott@email.com', '(415) 555-2025', '1994-03-31', 'she/her', 'LGBTQ+ identity exploration', 'Z60.0 Acculturation Difficulty', 'Aetna', NOW() - INTERVAL '4 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Ryan', 'Green', 'rgreen@email.com', '(415) 555-2026', '1989-11-09', 'he/him', 'Gaming addiction', 'F63.0 Gambling Disorder', 'Blue Cross', NOW() - INTERVAL '3 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Samantha', 'Adams', 'sadams@email.com', '(415) 555-2027', '1995-07-17', 'she/her', 'Domestic violence recovery', 'F43.10 PTSD', 'Blue Shield', NOW() - INTERVAL '10 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Tyler', 'Baker', 'tbaker@email.com', '(415) 555-2028', '1988-02-04', 'he/him', 'Social isolation', 'F40.10 Social Anxiety Disorder', 'Medicare', NOW() - INTERVAL '7 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Ashley', 'Nelson', 'anelson@email.com', '(415) 555-2029', '1992-09-26', 'she/her', 'Chronic worry', 'F41.1 Generalized Anxiety Disorder', 'Cigna', NOW() - INTERVAL '5 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Justin', 'Carter', 'jcarter@email.com', '(415) 555-2030', '1980-04-13', 'he/him', 'Mid-life crisis', 'F43.22 Adjustment Disorder', 'Kaiser', NOW() - INTERVAL '6 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Kayla', 'Mitchell', 'kmitchell@email.com', '(415) 555-2031', '1990-10-28', 'she/her', 'Fertility stress', 'Z31.6 General Counseling and Advice', 'United Healthcare', NOW() - INTERVAL '4 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Brandon', 'Perez', 'bperez@email.com', '(415) 555-2032', '1985-06-19', 'he/him', 'Procrastination', 'F90.0 ADHD, Predominantly Inattentive', 'Aetna', NOW() - INTERVAL '2 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Courtney', 'Roberts', 'croberts@email.com', '(415) 555-2033', '1993-01-08', 'she/her', 'Family conflict', 'Z63.9 Family Circumstances, Unspecified', 'Blue Cross', NOW() - INTERVAL '7 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Eric', 'Turner', 'eturner@email.com', '(415) 555-2034', '1987-08-22', 'he/him', 'Health anxiety', 'F45.21 Illness Anxiety Disorder', 'Blue Shield', NOW() - INTERVAL '5 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Melissa', 'Phillips', 'mphillips@email.com', '(415) 555-2035', '1991-12-30', 'she/her', 'Seasonal affective disorder', 'F33.0 Major Depressive Disorder, Recurrent, Mild', 'Medicare', NOW() - INTERVAL '9 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Jonathan', 'Campbell', 'jcampbell@email.com', '(415) 555-2036', '1982-05-16', 'he/him', 'Executive stress', 'Z56.3 Job Stress', 'Cigna', NOW() - INTERVAL '3 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Heather', 'Parker', 'hparker@email.com', '(415) 555-2037', '1994-11-24', 'she/her', 'Codependency issues', 'F60.7 Dependent Personality Disorder', 'Kaiser', NOW() - INTERVAL '8 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Nathan', 'Evans', 'nevans@email.com', '(415) 555-2038', '1986-03-11', 'he/him', 'Sports injury recovery', 'F43.22 Adjustment Disorder', 'United Healthcare', NOW() - INTERVAL '4 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Allison', 'Edwards', 'aedwards@email.com', '(415) 555-2039', '1990-07-29', 'she/her', 'Assertiveness training', 'Z73.1 Other Problems Related to Life Management', 'Aetna', NOW() - INTERVAL '6 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Kyle', 'Collins', 'kcollins@email.com', '(415) 555-2040', '1988-01-14', 'he/him', 'Gambling problem', 'F63.0 Gambling Disorder', 'Blue Cross', NOW() - INTERVAL '10 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Vanessa', 'Stewart', 'vstewart@email.com', '(415) 555-2041', '1992-09-02', 'she/her', 'Boundary setting', 'Z60.4 Social Exclusion and Rejection', 'Blue Shield', NOW() - INTERVAL '3 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Gregory', 'Sanchez', 'gsanchez@email.com', '(415) 555-2042', '1979-04-27', 'he/him', 'Retirement transition', 'F43.22 Adjustment Disorder', 'Medicare', NOW() - INTERVAL '5 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Tiffany', 'Morris', 'tmorris@email.com', '(415) 555-2043', '1995-11-13', 'she/her', 'Test anxiety', 'F41.8 Other Anxiety Disorders', 'Cigna', NOW() - INTERVAL '7 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Patrick', 'Rogers', 'progers@email.com', '(415) 555-2044', '1983-06-08', 'he/him', 'Communication skills', 'Z63.0 Relationship Distress', 'Kaiser', NOW() - INTERVAL '2 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Crystal', 'Reed', 'creed@email.com', '(415) 555-2045', '1989-02-21', 'she/her', 'Childhood trauma', 'F43.10 PTSD', 'United Healthcare', NOW() - INTERVAL '1 year'),
  ('a0000000-0000-0000-0000-000000000001', 'Sean', 'Cook', 'scook@email.com', '(415) 555-2046', '1991-10-17', 'he/him', 'Identity crisis', 'Z60.0 Acculturation Difficulty', 'Aetna', NOW() - INTERVAL '4 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Monica', 'Morgan', 'mmorgan@email.com', '(415) 555-2047', '1984-08-05', 'she/her', 'Empty nest syndrome', 'F43.21 Adjustment Disorder with Depressed Mood', 'Blue Cross', NOW() - INTERVAL '6 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Trevor', 'Bell', 'tbell@email.com', '(415) 555-2048', '1993-12-25', 'he/him', 'Financial stress', 'Z59.9 Housing and Economic Problems', 'Blue Shield', NOW() - INTERVAL '3 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Diana', 'Murphy', 'dmurphy@email.com', '(415) 555-2049', '1987-05-19', 'she/her', 'Spiritual crisis', 'Z71.8 Religious or Spiritual Problem', 'Medicare', NOW() - INTERVAL '8 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Austin', 'Bailey', 'abailey@email.com', '(415) 555-2050', '1990-03-06', 'he/him', 'Video game addiction', 'F63.0 Behavioral Addiction', 'Cigna', NOW() - INTERVAL '5 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Rebecca', 'Rivera', 'rrivera@email.com', '(415) 555-2051', '1986-11-22', 'she/her', 'Chronic fatigue', 'F48.8 Other Somatoform Disorders', 'Kaiser', NOW() - INTERVAL '9 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Marcus', 'Cooper', 'mcooper@email.com', '(415) 555-2052', '1992-07-10', 'he/him', 'Workplace harassment', 'Z56.81 Sexual Harassment on the Job', 'United Healthcare', NOW() - INTERVAL '2 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Victoria', 'Richardson', 'vrichardson@email.com', '(415) 555-2053', '1988-01-28', 'she/her', 'Hoarding behavior', 'F42.3 Hoarding Disorder', 'Aetna', NOW() - INTERVAL '7 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Zachary', 'Cox', 'zcox@email.com', '(415) 555-2054', '1994-09-15', 'he/him', 'Social media addiction', 'F63.9 Impulse Control Disorder', 'Blue Cross', NOW() - INTERVAL '4 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Alexis', 'Howard', 'ahoward@email.com', '(415) 555-2055', '1985-04-03', 'she/her', 'Decision paralysis', 'F41.1 Generalized Anxiety Disorder', 'Blue Shield', NOW() - INTERVAL '6 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Cameron', 'Ward', 'cward@email.com', '(415) 555-2056', '1991-12-11', 'they/them', 'Gender identity exploration', 'Z60.0 Acculturation Difficulty', 'Medicare', NOW() - INTERVAL '10 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Olivia', 'Torres', 'otorres@email.com', '(415) 555-2057', '1989-06-27', 'she/her', 'Phobia of flying', 'F40.248 Other Specific Phobia', 'Cigna', NOW() - INTERVAL '3 months'),
  ('a0000000-0000-0000-0000-000000000001', 'Ethan', 'Peterson', 'epeterson@email.com', '(415) 555-2058', '1993-02-14', 'he/him', 'Imposter syndrome', 'F60.6 Avoidant Personality Disorder', 'Kaiser', NOW() - INTERVAL '5 months')
ON CONFLICT DO NOTHING;
