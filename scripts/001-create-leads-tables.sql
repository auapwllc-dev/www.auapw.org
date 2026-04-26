-- Lead Management System Tables
-- Run this script to create the leads and email_templates tables

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  -- Customer Information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  
  -- Vehicle Information
  year VARCHAR(10),
  make VARCHAR(100),
  model VARCHAR(100),
  
  -- Part Information
  part_name VARCHAR(255),
  part_category VARCHAR(100),
  
  -- Additional Details
  message TEXT,
  source VARCHAR(50) DEFAULT 'quote_form',
  
  -- Lead Status
  status VARCHAR(50) DEFAULT 'new',
  priority VARCHAR(20) DEFAULT 'normal',
  assigned_to VARCHAR(255),
  
  -- Tracking
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMP,
  notification_sent BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  subject VARCHAR(500) NOT NULL,
  body TEXT NOT NULL,
  template_type VARCHAR(50) DEFAULT 'customer_reply',
  is_active BOOLEAN DEFAULT TRUE,
  is_default BOOLEAN DEFAULT FALSE,
  
  -- Available variables: {{name}}, {{email}}, {{phone}}, {{year}}, {{make}}, {{model}}, {{part_name}}, {{part_category}}, {{message}}
  variables_used TEXT[],
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_email_templates_type ON email_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_email_templates_active ON email_templates(is_active);

-- Insert default email template
INSERT INTO email_templates (name, subject, body, template_type, is_default, variables_used)
VALUES (
  'Quote Request Confirmation',
  'Thank You for Your Quote Request - AUAPW.ORG',
  E'Dear {{name}},\n\nThank you for requesting a quote from All Used Auto Parts Warehouse (AUAPW.ORG)!\n\nWe have received your request for:\n- Part: {{part_name}}\n- Vehicle: {{year}} {{make}} {{model}}\n\nOur team is searching our network of 2,000+ verified yards to find the best quality part at the lowest price for you.\n\nExpect to hear from us within 24-48 hours with pricing and availability.\n\nIf you have any questions, feel free to reply to this email or call us at (888) 818-5001.\n\nBest regards,\nAUAPW.ORG Team\nAll Used Auto Parts Warehouse\n\n---\nThis is an automated message. Please do not reply directly to this email.',
  'customer_reply',
  TRUE,
  ARRAY['name', 'part_name', 'year', 'make', 'model']
)
ON CONFLICT (name) DO NOTHING;

-- Insert lead notification template (for internal use)
INSERT INTO email_templates (name, subject, body, template_type, is_default, variables_used)
VALUES (
  'New Lead Notification',
  'New Quote Request: {{part_name}} for {{year}} {{make}} {{model}}',
  E'NEW LEAD RECEIVED\n\n--- Customer Details ---\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\n\n--- Vehicle Information ---\nYear: {{year}}\nMake: {{make}}\nModel: {{model}}\n\n--- Part Requested ---\nPart: {{part_name}}\nCategory: {{part_category}}\n\n--- Message ---\n{{message}}\n\n---\nView all leads at: https://auapw.org/admin/leads',
  'lead_notification',
  TRUE,
  ARRAY['name', 'email', 'phone', 'year', 'make', 'model', 'part_name', 'part_category', 'message']
)
ON CONFLICT (name) DO NOTHING;
