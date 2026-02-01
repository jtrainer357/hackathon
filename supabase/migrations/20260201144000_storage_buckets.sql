-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('import-temp', 'import-temp', false, 524288000, NULL), -- 500MB
  ('patient-documents', 'patient-documents', false, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for import-temp
CREATE POLICY "Allow authenticated uploads to import-temp"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'import-temp');

CREATE POLICY "Allow authenticated reads from import-temp"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'import-temp');

-- RLS Policies for patient-documents
CREATE POLICY "Allow authenticated uploads to patient-documents"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'patient-documents');

CREATE POLICY "Allow authenticated reads from patient-documents"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'patient-documents');
