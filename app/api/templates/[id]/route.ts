import { NextRequest, NextResponse } from 'next/server'
import { getTemplateById, updateTemplate, deleteTemplate } from '@/lib/db'

// GET /api/templates/[id] - Get a single template
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const template = await getTemplateById(parseInt(id))

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ template })
  } catch (error) {
    console.error('Error fetching template:', error)
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    )
  }
}

// PATCH /api/templates/[id] - Update a template
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    // Extract variables if body is updated
    let variables: string[] | undefined
    if (data.body || data.subject) {
      const variableRegex = /\{\{(\w+)\}\}/g
      variables = []
      let match
      const textToScan = (data.body || '') + (data.subject || '')
      while ((match = variableRegex.exec(textToScan)) !== null) {
        if (!variables.includes(match[1])) {
          variables.push(match[1])
        }
      }
    }

    const template = await updateTemplate(parseInt(id), {
      name: data.name,
      subject: data.subject,
      body: data.body,
      template_type: data.template_type,
      is_active: data.is_active,
      is_default: data.is_default,
      variables_used: variables,
    })

    return NextResponse.json({ template })
  } catch (error) {
    console.error('Error updating template:', error)
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    )
  }
}

// DELETE /api/templates/[id] - Delete a template
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteTemplate(parseInt(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting template:', error)
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    )
  }
}
