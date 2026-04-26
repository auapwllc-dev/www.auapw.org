import nodemailer from 'nodemailer'
import { Lead, getDefaultTemplate, populateTemplate } from './db'

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Lead notification email addresses
const LEAD_NOTIFICATION_EMAILS = process.env.LEAD_NOTIFICATION_EMAILS || 'auapworld@gmail.com'

interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

// Send email using Gmail SMTP
export async function sendEmail(
  to: string,
  subject: string,
  body: string,
  html?: string
): Promise<EmailResult> {
  try {
    const info = await transporter.sendMail({
      from: `"AUAPW.ORG" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text: body,
      html: html || body.replace(/\n/g, '<br>'),
    })

    return {
      success: true,
      messageId: info.messageId,
    }
  } catch (error) {
    console.error('Email send error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Send lead notification to admin
export async function sendLeadNotification(lead: Lead): Promise<EmailResult> {
  const template = await getDefaultTemplate('lead_notification')
  
  let subject = `New Quote Request: ${lead.part_name || 'Part'} for ${lead.year || ''} ${lead.make || ''} ${lead.model || ''}`
  let body = `
NEW LEAD RECEIVED

--- Customer Details ---
Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || 'Not provided'}

--- Vehicle Information ---
Year: ${lead.year || 'Not specified'}
Make: ${lead.make || 'Not specified'}
Model: ${lead.model || 'Not specified'}

--- Part Requested ---
Part: ${lead.part_name || 'Not specified'}
Category: ${lead.part_category || 'Not specified'}

--- Message ---
${lead.message || 'No message'}

---
View all leads at: https://auapw.org/admin/leads
  `.trim()

  if (template) {
    subject = populateTemplate(template.subject, lead)
    body = populateTemplate(template.body, lead)
  }

  return sendEmail(LEAD_NOTIFICATION_EMAILS, subject, body)
}

// Send customer confirmation email
export async function sendCustomerConfirmation(lead: Lead): Promise<EmailResult> {
  const template = await getDefaultTemplate('customer_reply')
  
  let subject = 'Thank You for Your Quote Request - AUAPW.ORG'
  let body = `
Dear ${lead.name},

Thank you for requesting a quote from All Used Auto Parts Warehouse (AUAPW.ORG)!

We have received your request for:
- Part: ${lead.part_name || 'Auto Part'}
- Vehicle: ${lead.year || ''} ${lead.make || ''} ${lead.model || ''}

Our team is searching our network of 2,000+ verified yards to find the best quality part at the lowest price for you.

Expect to hear from us within 24-48 hours with pricing and availability.

If you have any questions, feel free to reply to this email or call us at (888) 818-5001.

Best regards,
AUAPW.ORG Team
All Used Auto Parts Warehouse

---
This is an automated message.
  `.trim()

  if (template) {
    subject = populateTemplate(template.subject, lead)
    body = populateTemplate(template.body, lead)
  }

  return sendEmail(lead.email, subject, body)
}

// Send custom email to customer
export async function sendCustomEmail(
  to: string,
  subject: string,
  body: string,
  lead?: Lead
): Promise<EmailResult> {
  let finalSubject = subject
  let finalBody = body

  if (lead) {
    finalSubject = populateTemplate(subject, lead)
    finalBody = populateTemplate(body, lead)
  }

  return sendEmail(to, finalSubject, finalBody)
}
