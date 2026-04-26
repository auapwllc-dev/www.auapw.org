import { NextRequest, NextResponse } from 'next/server'
import { createLead, getLeads, getLeadStats } from '@/lib/db'
import { sendLeadNotification, sendCustomerConfirmation } from '@/lib/email'

// GET /api/leads - Get all leads with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') || undefined
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const stats = searchParams.get('stats') === 'true'

    if (stats) {
      const leadStats = await getLeadStats()
      return NextResponse.json({ stats: leadStats })
    }

    const leads = await getLeads(status, limit, offset)
    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}

// POST /api/leads - Create a new lead and send notifications
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Create lead in database
    const lead = await createLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      year: data.year,
      make: data.make,
      model: data.model,
      part_name: data.part_name || data.partName,
      part_category: data.part_category || data.partCategory,
      message: data.message,
      source: data.source || 'quote_form',
    })

    // Send notifications asynchronously (don't block response)
    const emailPromises: Promise<unknown>[] = []

    // Send notification to admin
    emailPromises.push(
      sendLeadNotification(lead).catch((err) => {
        console.error('Failed to send lead notification:', err)
      })
    )

    // Send confirmation to customer
    emailPromises.push(
      sendCustomerConfirmation(lead).catch((err) => {
        console.error('Failed to send customer confirmation:', err)
      })
    )

    // Don't await - let emails send in background
    Promise.all(emailPromises)

    return NextResponse.json({
      success: true,
      lead: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
      },
      message: 'Quote request submitted successfully',
    })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    )
  }
}
