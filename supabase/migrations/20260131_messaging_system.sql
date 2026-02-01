-- Tebra Mental Health MVP: Messaging System Migration
-- Channel-agnostic messaging architecture

-- ============================================
-- MESSAGE CHANNELS (extensible enum-like table)
-- ============================================
CREATE TABLE IF NOT EXISTS message_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  supports_attachments BOOLEAN DEFAULT false,
  supports_rich_text BOOLEAN DEFAULT false,
  max_content_length INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed MVP channels
INSERT INTO message_channels (code, name, icon_name, supports_attachments, supports_rich_text, max_content_length) VALUES
  ('sms', 'SMS', 'MessageSquare01Icon', false, false, 1600),
  ('email', 'Email', 'Mail01Icon', true, true, null),
  ('voice', 'Voice Message', 'VoiceIcon', true, false, null)
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- CONVERSATIONS (patient-centric threads)
-- ============================================
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL,
  patient_id UUID NOT NULL,
  last_message_at TIMESTAMPTZ,
  last_message_preview VARCHAR(100),
  last_message_channel VARCHAR(50),
  unread_count INTEGER DEFAULT 0,
  is_archived BOOLEAN DEFAULT false,
  is_flagged BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(practice_id, patient_id)
);

-- ============================================
-- MESSAGES (core unit - channel-agnostic)
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  practice_id UUID NOT NULL,
  patient_id UUID NOT NULL,
  channel_code VARCHAR(50) NOT NULL,
  direction VARCHAR(10) NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('patient', 'provider', 'staff', 'system')),
  sender_id UUID,
  sender_name VARCHAR(100),
  recipient_type VARCHAR(20),
  recipient_id UUID,
  subject VARCHAR(500),
  content_text TEXT,
  content_html TEXT,
  content_metadata JSONB DEFAULT '{}',
  audio_url VARCHAR(500),
  audio_duration_seconds INTEGER,
  transcription TEXT,
  status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('draft', 'queued', 'sent', 'delivered', 'read', 'failed')),
  status_updated_at TIMESTAMPTZ,
  error_message TEXT,
  external_id VARCHAR(255),
  delivery_metadata JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  is_flagged_by_ai BOOLEAN DEFAULT false,
  ai_flag_reason VARCHAR(255),
  ai_suggested_response TEXT,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MESSAGE ATTACHMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS message_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  content_type VARCHAR(100) NOT NULL,
  size_bytes INTEGER NOT NULL,
  storage_url VARCHAR(500) NOT NULL,
  duration_seconds INTEGER,
  width INTEGER,
  height INTEGER,
  thumbnail_url VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MESSAGE TEMPLATES
-- ============================================
CREATE TABLE IF NOT EXISTS message_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  channel_codes VARCHAR(50)[] DEFAULT '{}',
  subject_template VARCHAR(500),
  content_template TEXT NOT NULL,
  category VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_templates ENABLE ROW LEVEL SECURITY;

-- Practice isolation policies
CREATE POLICY "conversations_practice_isolation" ON conversations
  FOR ALL USING (practice_id = (SELECT current_setting('app.current_practice_id', true))::uuid);

CREATE POLICY "messages_practice_isolation" ON messages
  FOR ALL USING (practice_id = (SELECT current_setting('app.current_practice_id', true))::uuid);

CREATE POLICY "attachments_via_messages" ON message_attachments
  FOR ALL USING (
    message_id IN (SELECT id FROM messages WHERE practice_id = (SELECT current_setting('app.current_practice_id', true))::uuid)
  );

CREATE POLICY "templates_practice_isolation" ON message_templates
  FOR ALL USING (practice_id = (SELECT current_setting('app.current_practice_id', true))::uuid);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_conversations_practice_patient ON conversations(practice_id, patient_id);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message ON conversations(practice_id, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_unread ON conversations(practice_id, unread_count) WHERE unread_count > 0;
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_practice_patient ON messages(practice_id, patient_id);
CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(practice_id, channel_code, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(practice_id, is_read) WHERE is_read = false;
CREATE INDEX IF NOT EXISTS idx_messages_flagged ON messages(practice_id, is_flagged_by_ai) WHERE is_flagged_by_ai = true;

-- ============================================
-- TRIGGER: Update conversation summary on new message
-- ============================================
CREATE OR REPLACE FUNCTION update_conversation_summary()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations SET
    last_message_at = NEW.created_at,
    last_message_preview = LEFT(NEW.content_text, 100),
    last_message_channel = NEW.channel_code,
    unread_count = CASE WHEN NEW.direction = 'inbound' THEN unread_count + 1 ELSE unread_count END,
    updated_at = NOW()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_conversation_summary ON messages;
CREATE TRIGGER trigger_update_conversation_summary
AFTER INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION update_conversation_summary();
