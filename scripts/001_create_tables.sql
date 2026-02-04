CREATE TABLE IF NOT EXISTS public.user_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  linkedin TEXT,
  github TEXT,
  portfolio TEXT,
  location TEXT,
  phone TEXT,
  company_name TEXT,
  company_location TEXT,
  position TEXT,
  contact_person TEXT,
  cover_letter_content TEXT,
  template_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own_documents" ON public.user_documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "users_insert_own_documents" ON public.user_documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_update_own_documents" ON public.user_documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "users_delete_own_documents" ON public.user_documents FOR DELETE USING (auth.uid() = user_id);
