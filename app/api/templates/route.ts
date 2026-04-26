import { NextRequest, NextResponse } from 'next/server'
import { getEmailTemplates, createTemplate, initializeTables } from '@/lib/db'

// GET /api/templates - Get all email templates
export async function GET(request: NextRequest) {
  try {
    await initializeTables()
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || undefined

    const templates = await getEmailTemplates(type)
    return NextResponse.json({ templates })
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}

// POST /api/templates - Create a new email template
export async function POST(request: NextRequest) {
  try {
    await initializeTables()
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.subject || !data.body) {
      return NextResponse.json(
        { error: 'Name, subject, and body are required' },
        { status: 400 }
      )
    }

    // Extract variables from template
    const variableRegex = /\{\{(\w+)\}\}/g
    const variables: string[] = []
    let match
    while ((match = variableRegex.exec(data.body)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1])
      }
    }
    // Also check subject
    while ((match = variableRegex.exec(data.subject)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1])
      }
    }

    const template = await createTemplate({
      name: data.name,
      subject: data.subject,
      body: data.body,
      template_type: data.template_type || 'customer_reply',
      is_active: data.is_active ?? true,
      is_default: data.is_default ?? false,
      variables_used: variables,
    })

    return NextResponse.json({ template })
  } catch (error) {
    console.error('Error creating template:', error)
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    )
  }
}
