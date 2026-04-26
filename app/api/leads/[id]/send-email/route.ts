import { NextRequest, NextResponse } from 'next/server'
import { getLeadById, updateLead, getTemplateById } from '@/lib/db'
import { sendCustomEmail } from '@/lib/email'

// POST /api/leads/[id]/send-email - Send email to lead
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    const lead = await getLeadById(parseInt(id))
    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }

    let subject = data.subject
    let body = data.body

    // If template_id is provided, use that template
    if (data.template_id) {
      const template = await getTemplateById(data.template_id)
      if (template) {
        subject = template.subject
        body = template.body
      }
    }

    // Send the email
    const result = await sendCustomEmail(lead.email, subject, body, lead)

    if (result.success) {
      // Update lead to mark email as sent
      await updateLead(parseInt(id), {
        email_sent: true,
        email_sent_at: new Date(),
      })

      return NextResponse.json({
        success: true,
        messageId: result.messageId,
      })
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
