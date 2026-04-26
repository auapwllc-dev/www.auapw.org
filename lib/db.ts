import { neon } from '@neondatabase/serverless'

// Create a SQL client for database operations
export const sql = neon(process.env.DATABASE_URL!)

// Lead types
export interface Lead {
  id: number
  name: string
  email: string
  phone: string | null
  year: string | null
  make: string | null
  model: string | null
  part_name: string | null
  part_category: string | null
  message: string | null
  source: string
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  assigned_to: string | null
  email_sent: boolean
  email_sent_at: Date | null
  notification_sent: boolean
  created_at: Date
  updated_at: Date
}

export interface EmailTemplate {
  id: number
  name: string
  subject: string
  body: string
  template_type: 'customer_reply' | 'lead_notification' | 'follow_up'
  is_active: boolean
  is_default: boolean
  variables_used: string[]
  created_at: Date
  updated_at: Date
}

// Lead CRUD operations
export async function createLead(data: Partial<Lead>): Promise<Lead> {
  const result = await sql`
    INSERT INTO leads (name, email, phone, year, make, model, part_name, part_category, message, source)
    VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.year || null}, ${data.make || null}, ${data.model || null}, ${data.part_name || null}, ${data.part_category || null}, ${data.message || null}, ${data.source || 'quote_form'})
    RETURNING *
  `
  return result[0] as Lead
}

export async function getLeads(status?: string, limit = 50, offset = 0): Promise<Lead[]> {
  if (status && status !== 'all') {
    const result = await sql`
      SELECT * FROM leads 
      WHERE status = ${status}
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `
    return result as Lead[]
  }
  const result = await sql`
    SELECT * FROM leads 
    ORDER BY created_at DESC 
    LIMIT ${limit} OFFSET ${offset}
  `
  return result as Lead[]
}

export async function getLeadById(id: number): Promise<Lead | null> {
  const result = await sql`SELECT * FROM leads WHERE id = ${id}`
  return result[0] as Lead || null
}

export async function updateLead(id: number, data: Partial<Lead>): Promise<Lead> {
  const result = await sql`
    UPDATE leads 
    SET 
      status = COALESCE(${data.status}, status),
      priority = COALESCE(${data.priority}, priority),
      assigned_to = COALESCE(${data.assigned_to}, assigned_to),
      email_sent = COALESCE(${data.email_sent}, email_sent),
      email_sent_at = COALESCE(${data.email_sent_at}, email_sent_at),
      notification_sent = COALESCE(${data.notification_sent}, notification_sent),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `
  return result[0] as Lead
}

export async function getLeadStats(): Promise<{ status: string; count: number }[]> {
  const result = await sql`
    SELECT status, COUNT(*) as count 
    FROM leads 
    GROUP BY status
  `
  return result as { status: string; count: number }[]
}

// Email Template CRUD operations
export async function getEmailTemplates(type?: string): Promise<EmailTemplate[]> {
  if (type) {
    const result = await sql`
      SELECT * FROM email_templates 
      WHERE template_type = ${type} AND is_active = true
      ORDER BY is_default DESC, name ASC
    `
    return result as EmailTemplate[]
  }
  const result = await sql`
    SELECT * FROM email_templates 
    ORDER BY template_type, is_default DESC, name ASC
  `
  return result as EmailTemplate[]
}

export async function getDefaultTemplate(type: string): Promise<EmailTemplate | null> {
  const result = await sql`
    SELECT * FROM email_templates 
    WHERE template_type = ${type} AND is_default = true AND is_active = true
    LIMIT 1
  `
  return result[0] as EmailTemplate || null
}

export async function getTemplateById(id: number): Promise<EmailTemplate | null> {
  const result = await sql`SELECT * FROM email_templates WHERE id = ${id}`
  return result[0] as EmailTemplate || null
}

export async function createTemplate(data: Partial<EmailTemplate>): Promise<EmailTemplate> {
  const result = await sql`
    INSERT INTO email_templates (name, subject, body, template_type, is_active, is_default, variables_used)
    VALUES (${data.name}, ${data.subject}, ${data.body}, ${data.template_type || 'customer_reply'}, ${data.is_active ?? true}, ${data.is_default ?? false}, ${data.variables_used || []})
    RETURNING *
  `
  return result[0] as EmailTemplate
}

export async function updateTemplate(id: number, data: Partial<EmailTemplate>): Promise<EmailTemplate> {
  const result = await sql`
    UPDATE email_templates 
    SET 
      name = COALESCE(${data.name}, name),
      subject = COALESCE(${data.subject}, subject),
      body = COALESCE(${data.body}, body),
      template_type = COALESCE(${data.template_type}, template_type),
      is_active = COALESCE(${data.is_active}, is_active),
      is_default = COALESCE(${data.is_default}, is_default),
      variables_used = COALESCE(${data.variables_used}, variables_used),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `
  return result[0] as EmailTemplate
}

export async function deleteTemplate(id: number): Promise<void> {
  await sql`DELETE FROM email_templates WHERE id = ${id}`
}

// Populate template with lead data
export function populateTemplate(template: string, lead: Lead): string {
  return template
    .replace(/\{\{name\}\}/g, lead.name || '')
    .replace(/\{\{email\}\}/g, lead.email || '')
    .replace(/\{\{phone\}\}/g, lead.phone || '')
    .replace(/\{\{year\}\}/g, lead.year || '')
    .replace(/\{\{make\}\}/g, lead.make || '')
    .replace(/\{\{model\}\}/g, lead.model || '')
    .replace(/\{\{part_name\}\}/g, lead.part_name || '')
    .replace(/\{\{part_category\}\}/g, lead.part_category || '')
    .replace(/\{\{message\}\}/g, lead.message || '')
}
