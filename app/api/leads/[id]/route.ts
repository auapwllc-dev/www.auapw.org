import { NextRequest, NextResponse } from 'next/server'
import { getLeadById, updateLead } from '@/lib/db'

// GET /api/leads/[id] - Get a single lead
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lead = await getLeadById(parseInt(id))

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ lead })
  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lead' },
      { status: 500 }
    )
  }
}

// PATCH /api/leads/[id] - Update a lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    const lead = await updateLead(parseInt(id), {
      status: data.status,
      priority: data.priority,
      assigned_to: data.assigned_to,
      email_sent: data.email_sent,
      email_sent_at: data.email_sent_at ? new Date(data.email_sent_at) : undefined,
      notification_sent: data.notification_sent,
    })

    return NextResponse.json({ lead })
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    )
  }
}
