-- Tebra Mental Health MVP: Tim Anders Detailed Data
-- Featured demo patient with 10+ SOAP notes, 3+ appointments, PHQ-9 tracking

-- ============================================
-- TIM ANDERS APPOINTMENTS (Past & Future)
-- ============================================

-- Past Completed Appointments
INSERT INTO appointments (
  practice_id, patient_id, provider_id, appointment_date, appointment_time,
  type, status, duration_minutes, location, created_at
)
VALUES
  -- 8 months ago - Initial Intake
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE - INTERVAL '8 months',
    '10:00:00',
    'Initial Intake',
    'completed',
    60,
    'Office - Room 3',
    NOW() - INTERVAL '8 months'
  ),
  -- 7.5 months ago
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE - INTERVAL '7 months 15 days',
    '14:00:00',
    'Therapy Session',
    'completed',
    50,
    'Office - Room 3',
    NOW() - INTERVAL '7 months 15 days'
  ),
  -- 7 months ago
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE - INTERVAL '7 months',
    '10:00:00',
    'Therapy Session',
    'completed',
    50,
    'Office - Room 3',
    NOW() - INTERVAL '7 months'
  ),
  -- 6.5 months ago
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE - INTERVAL '6 months 15 days',
    '14:00:00',
    'Therapy Session',
    'completed',
    50,
    'Office - Room 3',
    NOW() - INTERVAL '6 months 15 days'
  ),
  -- 6 months ago
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE - INTERVAL '6 months',
    '10:00:00',
    'Therapy Session',
    'completed',
    50,
    'Office - Room 3',
    NOW() - INTERVAL '6 months'
  ),
  -- 5 months ago
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE - INTERVAL '5 months',
    '14:00:00',
    'Therapy Session',
    'completed',
    50,
    'Office - Room 3',
    NOW() - INTERVAL '5 months'
  ),
  -- 4 months ago
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE - INTERVAL '4 months',
    '10:00:00',
    'Therapy Session',
    'completed',
    50,
    'Office - Room 3',
    NOW() - INTERVAL '4 months'
  ),
  -- 3 months ago
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE - INTERVAL '3 months',
    '14:00:00',
    'Therapy Session',
    'completed',
    50,
    'Office - Room 3',
    NOW() - INTERVAL '3 months'
  ),
  -- 2 months ago
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE - INTERVAL '2 months',
    '10:00:00',
    'Therapy Session',
    'completed',
    50,
    'Office - Room 3',
    NOW() - INTERVAL '2 months'
  ),
  -- 1 month ago
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE - INTERVAL '1 month',
    '14:00:00',
    'Therapy Session',
    'completed',
    50,
    'Office - Room 3',
    NOW() - INTERVAL '1 month'
  ),
  -- 2 weeks ago
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE - INTERVAL '2 weeks',
    '10:00:00',
    'Therapy Session',
    'completed',
    50,
    'Office - Room 3',
    NOW() - INTERVAL '2 weeks'
  ),
  -- 1 week ago
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE - INTERVAL '1 week',
    '14:00:00',
    'Therapy Session',
    'completed',
    50,
    'Office - Room 3',
    NOW() - INTERVAL '1 week'
  );

-- Future Appointments (3 upcoming)
INSERT INTO appointments (
  practice_id, patient_id, provider_id, appointment_date, appointment_time,
  type, status, duration_minutes, location, created_at
)
VALUES
  -- Next week Thursday 10:00 AM
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE + INTERVAL '6 days',
    '10:00:00',
    'Therapy Session',
    'scheduled',
    50,
    'Office - Room 3',
    NOW()
  ),
  -- 2 weeks from now
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE + INTERVAL '2 weeks',
    '10:00:00',
    'Therapy Session',
    'scheduled',
    50,
    'Office - Room 3',
    NOW()
  ),
  -- 3 weeks from now
  (
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    CURRENT_DATE + INTERVAL '3 weeks',
    '10:00:00',
    'Therapy Session',
    'scheduled',
    50,
    'Office - Room 3',
    NOW()
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- TIM ANDERS SESSION NOTES (12 Detailed SOAP Notes)
-- ============================================

-- Note 1: Initial Intake (8 months ago)
INSERT INTO session_notes (
  practice_id, patient_id, provider_id, note_date, session_type,
  subjective, objective, assessment, plan,
  therapist_name, session_duration_minutes, cpt_code, diagnosis_codes, status, created_at
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '8 months',
  'Initial Intake',
  'Client reports experiencing persistent anxiety and overwhelming stress related to his work as a software engineer. States "I feel like I''m constantly on edge, even on weekends." Reports difficulty sleeping (waking at 3-4 AM with racing thoughts), muscle tension in shoulders and neck, and frequent headaches. Anxiety has increased over past 6 months since taking on team lead role. Notes occasional panic-like symptoms when faced with tight deadlines. Reports supportive spouse (Rachel) who encouraged him to seek therapy. No current suicidal ideation or self-harm behaviors. Previous therapy experience 5 years ago for stress management, found it "somewhat helpful."',
  'Client presented as well-groomed, casually dressed, appeared younger than stated age. Made good eye contact, though frequently shifted in seat during discussion of work stressors. Speech was clear and goal-directed, though rapid at times when discussing anxious thoughts. Affect was anxious with visible signs of tension (furrowed brow, clenched jaw). Mood described as "stressed and worried." Thought process was logical and organized. No evidence of perceptual disturbances. Insight appeared good - client demonstrates awareness of anxiety patterns and triggers. Motivation for treatment appeared high.',
  'Client presents with symptoms consistent with Generalized Anxiety Disorder and Adjustment Disorder with Anxiety. Primary stressors include increased work responsibilities, perfectionist tendencies, and difficulty with work-life boundaries. Strengths include strong social support system, previous therapy experience, high motivation for change, and good insight into patterns. PHQ-9 score: 12 (moderate depression), GAD-7 score: 15 (moderate-severe anxiety). Client is appropriate candidate for weekly CBT focused on anxiety management and stress reduction.',
  'Begin weekly 50-minute CBT sessions focused on anxiety management techniques. Introduce psychoeducation about anxiety and the cognitive-behavioral model. Assign thought record to track anxious thoughts and situations. Teach diaphragmatic breathing and progressive muscle relaxation for immediate symptom relief. Encourage client to establish clear work boundaries (no email after 7 PM). Schedule follow-up PHQ-9 and GAD-7 in 6 weeks. Client agreeable to plan and expressed optimism about treatment.',
  'Dr. Sarah Chen',
  60,
  '90791',
  'F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety',
  'final',
  NOW() - INTERVAL '8 months'
);

-- Note 2: Session 2 (7.5 months ago)
INSERT INTO session_notes (
  practice_id, patient_id, provider_id, note_date, session_type,
  subjective, objective, assessment, plan,
  therapist_name, session_duration_minutes, cpt_code, diagnosis_codes, status, created_at
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '7 months 15 days',
  'Therapy Session',
  'Client reports mixed week. Successfully completed thought records on 4 out of 7 days, noting patterns of catastrophic thinking related to work performance. States "I noticed I always jump to worst-case scenarios." Practiced breathing exercises 3 times, found them "somewhat calming but hard to remember in the moment." Sleep remains disrupted (averaging 5-6 hours per night). Reports one positive development: had conversation with manager about workload, who was "surprisingly understanding." Still experiencing muscle tension and headaches 4-5 days per week. Anxiety level self-rated as 7/10 this week.',
  'Client appeared slightly less tense than previous session. Maintained good eye contact, posture more relaxed. Demonstrated understanding of CBT concepts when discussing thought records. Affect congruent with content - showed frustration when discussing sleep difficulties, brightened when discussing manager conversation. Speech normal rate and tone. No evidence of psychomotor agitation. Thought process organized and reality-based.',
  'Client showing early engagement with CBT techniques and developing insight into cognitive patterns. Successfully identifying catastrophic thinking, which is a positive prognostic indicator. Sleep disturbance persists as significant concern - may be maintaining anxiety cycle. Conversation with manager demonstrates willingness to implement behavioral changes. Continue building CBT skills and address sleep hygiene.',
  'Review completed thought records and identify cognitive distortions. Introduce cognitive restructuring techniques for catastrophic thinking patterns. Provide sleep hygiene education and develop pre-sleep routine protocol. Practice breathing exercises in session to improve automaticity. Homework: continue thought records daily, implement new sleep routine for 5 nights, practice breathing exercises 2x daily (morning and evening). Next session: review progress and introduce worry time technique.',
  'Dr. Sarah Chen',
  50,
  '90836',
  'F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety',
  'final',
  NOW() - INTERVAL '7 months 15 days'
);

-- Note 3: Session 3 (7 months ago)
INSERT INTO session_notes (
  practice_id, patient_id, provider_id, note_date, session_type,
  subjective, objective, assessment, plan,
  therapist_name, session_duration_minutes, cpt_code, diagnosis_codes, status, created_at
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '7 months',
  'Therapy Session',
  'Client reports "pretty good week overall." Implemented sleep routine with 70% consistency - going to bed at 10:30 PM, no screens after 10 PM, reading for 20 minutes. Sleep improved to 6.5-7 hours per night. States "I actually feel more rested." Continued thought records, identifying patterns of all-or-nothing thinking and mind reading about colleagues'' perceptions. Successfully used cognitive restructuring twice when feeling anxious about project deadlines. Anxiety level self-rated as 5/10 this week. Headaches decreased to 2-3 times this week. Reports feeling "more hopeful" about managing stress.',
  'Client appeared noticeably more relaxed. Smiled several times during session. Speech calm and measured. Affect brighter, more euthymic. Demonstrated good understanding of cognitive restructuring when discussing examples. Showed pride when describing improved sleep. No signs of psychomotor agitation. Thought process clear and logical.',
  'Significant progress noted in sleep hygiene and symptom reduction. Client actively engaging with CBT techniques and generalizing skills to real-world situations. Decreased anxiety and headaches suggest interventions are effective. All-or-nothing thinking and mind reading identified as key cognitive patterns to address. Client''s improved hopefulness is positive prognostic indicator.',
  'Reinforce successful sleep routine and problem-solve barriers to 100% consistency. Deep dive into all-or-nothing thinking pattern - introduce continuum thinking exercise. Practice identifying evidence for and against mind reading assumptions. Introduce "worry time" technique: schedule 15 minutes daily for worrying, practice postponing worries outside this time. Homework: continue thought records with focus on all-or-nothing thinking, practice continuum thinking 3x this week, implement worry time daily. Consider reducing frequency to biweekly sessions if progress continues.',
  'Dr. Sarah Chen',
  50,
  '90836',
  'F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety',
  'final',
  NOW() - INTERVAL '7 months'
);

-- Note 4: Session 4 (6.5 months ago)
INSERT INTO session_notes (
  practice_id, patient_id, provider_id, note_date, session_type,
  subjective, objective, assessment, plan,
  therapist_name, session_duration_minutes, cpt_code, diagnosis_codes, status, created_at
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '6 months 15 days',
  'Therapy Session',
  'Client reports challenging week due to major project deadline. Anxiety increased to 7/10. States "I knew this was coming but still felt overwhelmed." Successfully implemented worry time technique 4 out of 7 days, found it "helpful to contain the spiral." Sleep routine disrupted twice due to late-night work sessions. Used cognitive restructuring multiple times but noted "it''s harder when I''m really stressed." Practiced breathing exercises before difficult meetings with moderate success. No panic attacks despite high stress. Rachel commented he seems "less irritable overall" compared to previous months. Headaches occurred 3 times this week.',
  'Client appeared more tense than previous session but better than initial sessions. Some fidgeting noted, particularly when discussing project deadline. Affect anxious but appropriate. Speech slightly rapid when discussing stressors but remained coherent. Demonstrated good recall of CBT techniques and ability to analyze their effectiveness. Showed realistic appraisal of both successes and challenges. No cognitive distortions in processing the stressful week.',
  'Expected increase in anxiety given significant real-world stressor (project deadline). Positive that client maintained use of coping skills under pressure, even if imperfectly. Client showing resilience and realistic self-appraisal. Feedback from spouse suggests behavioral changes are noticeable. Sleep disruption concerning but understandable given circumstances. Client appropriately differentiating between "normal" stress response and problematic anxiety.',
  'Process experience of high-stress week and reinforce that coping skills don''t eliminate stress but make it manageable. Discuss concept of "good enough" vs. perfectionism in work context - explore how perfectionism fuels anxiety. Introduce self-compassion exercises. Review sleep hygiene importance even during high-stress periods - brainstorm strategies for protecting sleep during deadlines. Homework: practice self-compassion break exercise 3x, maintain worry time, resume regular sleep routine now that deadline has passed. Schedule next session in 10 days to maintain momentum.',
  'Dr. Sarah Chen',
  50,
  '90836',
  'F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety',
  'final',
  NOW() - INTERVAL '6 months 15 days'
);

-- Note 5: Session 5 (6 months ago) - PHQ-9 administered
INSERT INTO session_notes (
  practice_id, patient_id, provider_id, note_date, session_type,
  subjective, objective, assessment, plan,
  therapist_name, session_duration_minutes, cpt_code, diagnosis_codes, status, created_at
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '6 months',
  'Therapy Session',
  'Client reports anxiety level back down to 4-5/10 after project completion. States "I survived the deadline and actually got positive feedback." Feeling "proud but also wondering why I put so much pressure on myself." Sleep routine re-established with good consistency. Practiced self-compassion exercises, initially felt "weird and forced" but noticed slight shift in self-talk by end of week. Continuing to use thought records, now able to identify distortions more quickly. Discussing with Rachel about setting better boundaries with work - she is "very supportive." Headaches minimal this week (only 1 occurrence).',
  'Client appeared relaxed and engaged. Made consistent eye contact. Affect euthymic with appropriate range. Smiled when discussing positive work feedback. Demonstrated growing metacognitive awareness about perfectionism patterns. Speech normal pace and tone. Showed genuine curiosity about connection between perfectionism and anxiety. No signs of depression or anxiety beyond baseline.',
  'Significant progress over past 6 weeks. PHQ-9 score decreased from 12 to 8 (mild depression), GAD-7 score decreased from 15 to 10 (moderate anxiety). Client developing strong CBT skills and applying them independently. Insight into perfectionism as anxiety driver represents important therapeutic shift. Relationship dynamics positive with good support system. Sleep improved substantially. Ready to explore deeper patterns around perfectionism and self-worth.',
  'Explore origins of perfectionism - family of origin dynamics, early achievement patterns. Introduce concept of "good enough" and practice applying to low-stakes situations. Continue self-compassion work. Discuss values clarification exercise to differentiate between genuine values and fear-driven behaviors. Homework: values worksheet, identify 3 "good enough" opportunities this week, continue self-compassion break when noticing harsh self-talk. Plan to transition to biweekly sessions after next appointment if progress continues.',
  'Dr. Sarah Chen',
  50,
  '90836',
  'F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety',
  'final',
  NOW() - INTERVAL '6 months'
);

-- Note 6: Session 6 (5 months ago)
INSERT INTO session_notes (
  practice_id, patient_id, provider_id, note_date, session_type,
  subjective, objective, assessment, plan,
  therapist_name, session_duration_minutes, cpt_code, diagnosis_codes, status, created_at
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '5 months',
  'Therapy Session',
  'Client reports "really good stretch." Completed values worksheet, identified core values as connection, growth, and integrity - noticed work perfectionism often conflicts with connection value (missing time with Rachel). Successfully implemented "good enough" approach on 3 work tasks, states "it was uncomfortable but the world didn''t end." Anxiety averaging 3-4/10 most days. Sleep consistent at 7-8 hours nightly. Self-compassion becoming more natural. Shared insight: "I think I learned early on that my worth came from achieving, and I''m realizing that''s not actually true." No headaches this week.',
  'Client appeared calm and reflective. Affect euthymic with broad range. Demonstrated deep engagement with values work - appeared moved when discussing connection vs. achievement conflict. Speech thoughtful and measured. Body language open and relaxed. Showed capacity for psychological mindedness and willingness to explore vulnerable material. No signs of distress.',
  'Substantial therapeutic progress. Client showing integration of CBT skills into daily life and moving into deeper insight work. Values clarification revealing core conflicts driving anxiety. Symptom reduction sustained over multiple weeks. Sleep normalized. Client demonstrating emotional flexibility and self-awareness. Ready for deeper schema work around self-worth and achievement. Appropriate for transition to biweekly sessions.',
  'Transition to biweekly sessions to support independence and generalization of skills. Begin exploring early family messages about achievement and worth. Introduce schema therapy concepts of conditional vs. unconditional self-worth. Continue values-based behavioral activation - identify specific ways to honor connection value. Homework: timeline exercise mapping achievement/worth messages from childhood to present, plan one "connection-focused" activity with Rachel for next week, continue good enough practice. Next session in 2 weeks.',
  'Dr. Sarah Chen',
  50,
  '90836',
  'F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety',
  'final',
  NOW() - INTERVAL '5 months'
);

-- Note 7: Session 7 (4 months ago)
INSERT INTO session_notes (
  practice_id, patient_id, provider_id, note_date, session_type,
  subjective, objective, assessment, plan,
  therapist_name, session_duration_minutes, cpt_code, diagnosis_codes, status, created_at
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '4 months',
  'Therapy Session',
  'Client reports biweekly schedule feels "right - like I have room to practice skills independently." Completed timeline exercise, identified strong pattern of achievement-based approval from father, mother''s anxiety about "safety" careers. States "I see how I internalized both messages - achieve for approval, but also be anxious because the world is scary." Had meaningful conversation with Rachel about fears of "not being enough," she was supportive. Planned and completed cooking class together (connection activity). Anxiety level 3/10 baseline with occasional spikes to 5-6/10 during work stress. Using coping skills automatically now without conscious effort in many situations.',
  'Client appeared insightful and engaged. Affect euthymic throughout. Demonstrated sophisticated understanding of intergenerational patterns and their impact. Showed vulnerability when discussing father relationship without defensiveness. Expressed gratitude for Rachel''s support with warmth. Speech thoughtful, taking time to find accurate words for internal experiences. Body language relaxed and open. Strong therapeutic alliance evident.',
  'Excellent progress in schema work. Client connecting present anxiety patterns to developmental experiences without self-blame. Relationship with partner used as corrective emotional experience (unconditional acceptance). Behavioral activation around connection value successful. Anxiety symptoms well-managed with integrated coping skills. Client showing signs of "therapist internalization" - automatic use of skills without conscious effort. Ready for relapse prevention planning as nearing therapeutic goals.',
  'Continue schema work focusing on reparenting stance toward self. Explore differentiation from father''s achievement focus while honoring positive aspects of relationship. Introduce concept of "earned security" - how we can revise early attachment patterns. Begin relapse prevention planning: identify early warning signs of anxiety increase, review successful coping strategies, develop action plan for future stressors. Homework: letter to younger self offering compassion and different messages about worth, identify 3 early warning signs of anxiety relapse. Next session in 2 weeks.',
  'Dr. Sarah Chen',
  50,
  '90836',
  'F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety',
  'final',
  NOW() - INTERVAL '4 months'
);

-- Note 8: Session 8 (3 months ago) - PHQ-9 administered
INSERT INTO session_notes (
  practice_id, patient_id, provider_id, note_date, session_type,
  subjective, objective, assessment, plan,
  therapist_name, session_duration_minutes, cpt_code, diagnosis_codes, status, created_at
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '3 months',
  'Therapy Session',
  'Client reports "feeling really different than when I started." Wrote letter to younger self, became emotional but found it "healing." Shared letter with Rachel who also became tearful and supportive. Anxiety baseline now 2-3/10 most days, brief spikes to 5/10 during work challenges but recovers quickly using skills. Sleep excellent. Started exercising 3x per week which helps mood. Identified early warning signs: sleep disruption, irritability, headaches returning, avoiding difficult conversations. States "I actually feel equipped to handle setbacks now instead of fearing them."',
  'Client appeared genuinely content and grounded. Affect euthymic with full range and spontaneous smiling. Demonstrated pride in progress without minimization or grandiosity. Speech reflected integrated understanding of therapeutic concepts. Showed emotional access when discussing letter exercise without overwhelm. Body language confident and relaxed. Strong sense of self-efficacy evident.',
  'Remarkable therapeutic progress. PHQ-9 score: 4 (minimal depression), GAD-7 score: 6 (mild anxiety) - both well within normal range. Client has achieved stated therapeutic goals: reduced anxiety, improved sleep, developed coping skills, increased self-compassion, enhanced relationship with partner. Schema work successful in shifting core beliefs about self-worth. Client demonstrates resilience and confidence in managing future stressors. Appropriate for termination planning.',
  'Celebrate therapeutic gains and client''s hard work. Complete relapse prevention plan with specific action steps. Discuss transition to termination - plan for 2 more biweekly sessions then move to monthly "check-in" sessions for 3 months before full termination. Normalize potential for future challenges and frame as opportunities for practice rather than failure. Homework: complete relapse prevention worksheet with specific resources and supports, reflect on therapy journey and key takeaways. Begin discussing "life after therapy."',
  'Dr. Sarah Chen',
  50,
  '90836',
  'F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety',
  'final',
  NOW() - INTERVAL '3 months'
);

-- Note 9: Session 9 (2 months ago)
INSERT INTO session_notes (
  practice_id, patient_id, provider_id, note_date, session_type,
  subjective, objective, assessment, plan,
  therapist_name, session_duration_minutes, cpt_code, diagnosis_codes, status, created_at
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '2 months',
  'Therapy Session',
  'Client reports continued progress. Had moderately stressful work situation (team conflict) and successfully used skills: identified catastrophic thinking, reality-tested with colleague, used self-compassion when initial response wasn''t perfect. Resolved situation effectively. States "I noticed I was anxious but I didn''t become my anxiety - that felt huge." Rachel comments he is "so much calmer overall." Completed relapse prevention plan. Feeling "ready but also a little nervous" about spacing out sessions. Acknowledges some anticipatory anxiety about termination but recognizes it as normal.',
  'Client appeared confident and emotionally regulated. Affect euthymic throughout session. Demonstrated sophisticated ability to observe and describe internal experiences without over-identification. Showed realistic confidence in managing termination anxiety. Speech clear and paced normally. No signs of regression or avoidance around termination. Strong consolidation of therapeutic gains evident.',
  'Client successfully generalizing skills to real-world challenges without therapist support. Meta-cognitive awareness well-developed ("I was anxious but I didn''t become my anxiety"). Relationship satisfaction high with partner noting sustained changes. Appropriate anticipatory anxiety about termination - sign of meaningful therapeutic relationship without problematic dependence. Ready for step-down to monthly check-ins.',
  'Review relapse prevention plan and ensure client has copy. Discuss termination as healthy transition, not abandonment or failure. Normalize ongoing growth outside therapy. Plan monthly check-in sessions for next 3 months (2-month intervals for first check-in, then reassess). Establish clear return-to-therapy criteria if needed in future. Homework: practice being own therapist - notice one situation this month and journal about it using CBT framework. Schedule first check-in for next month.',
  'Dr. Sarah Chen',
  50,
  '90836',
  'F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety',
  'final',
  NOW() - INTERVAL '2 months'
);

-- Note 10: Check-in Session (1 month ago)
INSERT INTO session_notes (
  practice_id, patient_id, provider_id, note_date, session_type,
  subjective, objective, assessment, plan,
  therapist_name, session_duration_minutes, cpt_code, diagnosis_codes, status, created_at
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '1 month',
  'Follow-up',
  'Client reports "doing really well." Completed CBT journal entry on own when faced with anxiety about presentation - successfully identified thinking traps and reframed. Presentation went well. Anxiety levels remain low (2-3/10 baseline). Sleep consistent. Relationship with Rachel strong - recently discussed future family planning without anxiety overwhelming the conversation. Exercise routine maintained. States "I feel like I have my life back, but actually better than before because I understand myself more." Minimal anxiety about therapy spacing, feels "ready for independence."',
  'Client appeared healthy and well-adjusted. Affect bright and euthymic. Demonstrated continued integration of therapeutic concepts naturally in conversation. Showed pride in independent problem-solving. Speech reflected self-assurance without arrogance. No signs of anxiety or depression. Strong therapeutic gains maintained.',
  'Sustained therapeutic progress with independent use of CBT skills. Client showing continued growth in areas beyond initial treatment goals (relationship communication, future planning). No signs of relapse. Anxiety and depression symptoms remain minimal. Client demonstrating post-traumatic growth mindset - viewing therapy as positive transformation rather than "fixing" a problem. Ready for termination with option to return as needed.',
  'Celebrate continued success and independence. Discuss open-door policy - client can return to therapy at any point for tune-up sessions or new concerns without it meaning "failure." Provide psychoeducation about life transitions as potential vulnerability periods. Plan final check-in session in 6-8 weeks, then complete termination. Client agrees to reach out sooner if any concerns arise. Homework: continue living life, notice growth, practice self-compassion.',
  'Dr. Sarah Chen',
  50,
  '90837',
  'F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety',
  'final',
  NOW() - INTERVAL '1 month'
);

-- Note 11: Session (2 weeks ago)
INSERT INTO session_notes (
  practice_id, patient_id, provider_id, note_date, session_type,
  subjective, objective, assessment, plan,
  therapist_name, session_duration_minutes, cpt_code, diagnosis_codes, status, created_at
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '2 weeks',
  'Therapy Session',
  'Client reports handling minor work stress well. Used cognitive restructuring when project timeline changed unexpectedly. States "Two months ago this would have sent me into a spiral, but I just problem-solved it." Continuing to maintain sleep routine, exercise, and connection time with Rachel. Discussing potential promotion at work - feels "excited and a little nervous, but the good kind of nervous." Recognizes this as eustress vs. distress. Anxiety levels stable at 2-3/10. No headaches, muscle tension minimal.',
  'Client appeared confident and emotionally balanced. Affect euthymic with appropriate enthusiasm when discussing promotion possibility. Demonstrated sophisticated understanding of anxiety spectrum (distress vs. eustress). Speech clear and thoughtful. Body language relaxed. Showed gratitude for therapeutic process without dependence. Strong evidence of internalized therapist function.',
  'Client continues to demonstrate sustained therapeutic gains. Successfully differentiating between problematic anxiety and normal stress responses. Approaching potential promotion with healthy mindset rather than perfectionism-fueled anxiety. All symptom measures remain in healthy ranges. Client ready for final termination session.',
  'Process upcoming termination and review therapy journey. Discuss how skills can be applied to new challenges (promotion). Reinforce client''s capacity for continued growth independently. Plan final session as closure and celebration of progress. Remind client of open-door policy for future needs. Homework: reflect on most important lessons learned in therapy, prepare for final session discussion of future goals and values-driven life.',
  'Dr. Sarah Chen',
  50,
  '90836',
  'F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety',
  'final',
  NOW() - INTERVAL '2 weeks'
);

-- Note 12: Most Recent Session (1 week ago) - PHQ-9 administered
INSERT INTO session_notes (
  practice_id, patient_id, provider_id, note_date, session_type,
  subjective, objective, assessment, plan,
  therapist_name, session_duration_minutes, cpt_code, diagnosis_codes, status, created_at
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '1 week',
  'Therapy Session',
  'Client reports feeling "genuinely good." Reflecting on therapy journey, identifies key takeaways: self-compassion vs. self-criticism, challenging automatic negative thoughts, values-driven living, sleep importance, and understanding anxiety as manageable rather than overwhelming. States "I know I''ll still face challenges, but I trust myself to handle them now." Decided to pursue promotion opportunity with realistic expectations. Rachel very supportive. Anxiety baseline 1-2/10, which client recognizes as "normal human anxiety." Sleep excellent at 7-8 hours consistently. Feels "ready" for termination while acknowledging therapy has been important.',
  'Client appeared peaceful and grounded in final session. Affect euthymic with full emotional range. Demonstrated mature integration of therapeutic work and realistic outlook on future. Expressed appropriate gratitude while taking ownership of own growth. Speech reflected self-assurance and clarity. No signs of anxiety about termination. Body language open and confident. Strong evidence of secure attachment to therapeutic process without problematic dependence.',
  'Outstanding therapeutic outcome. Client achieved all treatment goals and demonstrated sustained symptom reduction. PHQ-9 score: 3 (minimal), GAD-7 score: 4 (minimal) - both well within normal range showing 75% reduction from baseline. Client developed robust CBT skills, enhanced self-awareness, shifted core beliefs about self-worth, improved relationship quality, and established healthy coping mechanisms. Ready for termination with excellent prognosis for maintaining gains. No current clinical diagnoses meet threshold criteria.',
  'Complete termination as planned. Review relapse prevention plan one final time. Celebrate client''s hard work, courage, and growth throughout treatment. Reinforce open-door policy - normalize that returning to therapy in future is sign of strength, not failure. Provide referral information if client moves or needs different services. Wish client well in promotion process and future endeavors. Document successful treatment completion. Client discharged from active treatment with option to return as needed.',
  'Dr. Sarah Chen',
  50,
  '90836',
  'Z codes for history of psychological trauma, treatment completed',
  'final',
  NOW() - INTERVAL '1 week'
);

-- ============================================
-- TIM ANDERS OUTCOME MEASURES (PHQ-9 over 6 months)
-- ============================================
INSERT INTO outcome_measures (
  patient_id, measure_type, score, measurement_date, administered_by, notes, created_at
)
VALUES
  -- Baseline (8 months ago)
  (
    'c0000000-0000-0000-0000-000000000001',
    'PHQ-9',
    18,
    CURRENT_DATE - INTERVAL '8 months',
    'b0000000-0000-0000-0000-000000000001',
    'Initial intake assessment - moderate-severe depression symptoms',
    NOW() - INTERVAL '8 months'
  ),
  -- 6 weeks into treatment (6.5 months ago)
  (
    'c0000000-0000-0000-0000-000000000001',
    'PHQ-9',
    16,
    CURRENT_DATE - INTERVAL '6 months 15 days',
    'b0000000-0000-0000-0000-000000000001',
    'Early treatment response, sleep improvements noted',
    NOW() - INTERVAL '6 months 15 days'
  ),
  -- 3 months into treatment (5 months ago)
  (
    'c0000000-0000-0000-0000-000000000001',
    'PHQ-9',
    14,
    CURRENT_DATE - INTERVAL '5 months',
    'b0000000-0000-0000-0000-000000000001',
    'Continued improvement with CBT skills development',
    NOW() - INTERVAL '5 months'
  ),
  -- 4 months into treatment (4 months ago)
  (
    'c0000000-0000-0000-0000-000000000001',
    'PHQ-9',
    12,
    CURRENT_DATE - INTERVAL '4 months',
    'b0000000-0000-0000-0000-000000000001',
    'Moderate depression range, good engagement in therapy',
    NOW() - INTERVAL '4 months'
  ),
  -- 5 months into treatment (3 months ago)
  (
    'c0000000-0000-0000-0000-000000000001',
    'PHQ-9',
    10,
    CURRENT_DATE - INTERVAL '3 months',
    'b0000000-0000-0000-0000-000000000001',
    'Schema work phase, continued symptom reduction',
    NOW() - INTERVAL '3 months'
  ),
  -- 6 months into treatment (2 months ago)
  (
    'c0000000-0000-0000-0000-000000000001',
    'PHQ-9',
    8,
    CURRENT_DATE - INTERVAL '2 months',
    'b0000000-0000-0000-0000-000000000001',
    'Mild depression, preparing for termination phase',
    NOW() - INTERVAL '2 months'
  ),
  -- Most recent (1 week ago)
  (
    'c0000000-0000-0000-0000-000000000001',
    'PHQ-9',
    3,
    CURRENT_DATE - INTERVAL '1 week',
    'b0000000-0000-0000-0000-000000000001',
    'Minimal symptoms, treatment completion - 75% symptom reduction from baseline',
    NOW() - INTERVAL '1 week'
  );

-- Also add GAD-7 scores for anxiety tracking
INSERT INTO outcome_measures (
  patient_id, measure_type, score, measurement_date, administered_by, notes, created_at
)
VALUES
  -- Baseline
  (
    'c0000000-0000-0000-0000-000000000001',
    'GAD-7',
    15,
    CURRENT_DATE - INTERVAL '8 months',
    'b0000000-0000-0000-0000-000000000001',
    'Initial intake - moderate-severe anxiety',
    NOW() - INTERVAL '8 months'
  ),
  -- 6 weeks
  (
    'c0000000-0000-0000-0000-000000000001',
    'GAD-7',
    12,
    CURRENT_DATE - INTERVAL '6 months 15 days',
    'b0000000-0000-0000-0000-000000000001',
    'Early treatment response',
    NOW() - INTERVAL '6 months 15 days'
  ),
  -- 3 months
  (
    'c0000000-0000-0000-0000-000000000001',
    'GAD-7',
    10,
    CURRENT_DATE - INTERVAL '5 months',
    'b0000000-0000-0000-0000-000000000001',
    'Moderate anxiety range',
    NOW() - INTERVAL '5 months'
  ),
  -- 4 months
  (
    'c0000000-0000-0000-0000-000000000001',
    'GAD-7',
    8,
    CURRENT_DATE - INTERVAL '4 months',
    'b0000000-0000-0000-0000-000000000001',
    'Mild anxiety range',
    NOW() - INTERVAL '4 months'
  ),
  -- 5 months
  (
    'c0000000-0000-0000-0000-000000000001',
    'GAD-7',
    6,
    CURRENT_DATE - INTERVAL '3 months',
    'b0000000-0000-0000-0000-000000000001',
    'Continued improvement',
    NOW() - INTERVAL '3 months'
  ),
  -- 6 months
  (
    'c0000000-0000-0000-0000-000000000001',
    'GAD-7',
    5,
    CURRENT_DATE - INTERVAL '2 months',
    'b0000000-0000-0000-0000-000000000001',
    'Minimal anxiety symptoms',
    NOW() - INTERVAL '2 months'
  ),
  -- Most recent
  (
    'c0000000-0000-0000-0000-000000000001',
    'GAD-7',
    4,
    CURRENT_DATE - INTERVAL '1 week',
    'b0000000-0000-0000-0000-000000000001',
    'Normal range - treatment completion',
    NOW() - INTERVAL '1 week'
  )
ON CONFLICT DO NOTHING;
