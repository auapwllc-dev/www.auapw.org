"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  FileText, Plus, Edit2, Trash2, Save, X, ArrowLeft,
  RefreshCw, CheckCircle2, AlertCircle, Eye
} from "lucide-react"

interface EmailTemplate {
  id: number
  name: string
  subject: string
  body: string
  template_type: string
  is_active: boolean
  is_default: boolean
  variables_used: string[]
  created_at: string
  updated_at: string
}

const AVAILABLE_VARIABLES = [
  { key: "name", description: "Customer name" },
  { key: "email", description: "Customer email" },
  { key: "phone", description: "Customer phone" },
  { key: "year", description: "Vehicle year" },
  { key: "make", description: "Vehicle make" },
  { key: "model", description: "Vehicle model" },
  { key: "part_name", description: "Part requested" },
  { key: "part_category", description: "Part category" },
  { key: "message", description: "Customer message" },
]

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    body: "",
    template_type: "customer_reply",
    is_active: true,
    is_default: false,
  })

  useEffect(() => {
    fetchTemplates()
  }, [])

  async function fetchTemplates() {
    setLoading(true)
    try {
      const res = await fetch("/api/templates")
      const data = await res.json()
      setTemplates(data.templates || [])
    } catch (error) {
      console.error("Failed to fetch templates:", error)
    }
    setLoading(false)
  }

  function startCreate() {
    setFormData({
      name: "",
      subject: "",
      body: "",
      template_type: "customer_reply",
      is_active: true,
      is_default: false,
    })
    setEditingTemplate(null)
    setIsCreating(true)
  }

  function startEdit(template: EmailTemplate) {
    setFormData({
      name: template.name,
      subject: template.subject,
      body: template.body,
      template_type: template.template_type,
      is_active: template.is_active,
      is_default: template.is_default,
    })
    setEditingTemplate(template)
    setIsCreating(false)
  }

  function cancelEdit() {
    setEditingTemplate(null)
    setIsCreating(false)
    setPreviewMode(false)
  }

  async function saveTemplate() {
    if (!formData.name || !formData.subject || !formData.body) {
      alert("Please fill in all required fields")
      return
    }

    setSaving(true)
    try {
      const url = isCreating ? "/api/templates" : `/api/templates/${editingTemplate?.id}`
      const method = isCreating ? "POST" : "PATCH"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchTemplates()
        cancelEdit()
      } else {
        const data = await res.json()
        alert(`Failed to save: ${data.error}`)
      }
    } catch (error) {
      console.error("Failed to save template:", error)
      alert("Failed to save template")
    }
    setSaving(false)
  }

  async function deleteTemplate(id: number) {
    if (!confirm("Are you sure you want to delete this template?")) return

    try {
      const res = await fetch(`/api/templates/${id}`, { method: "DELETE" })
      if (res.ok) {
        fetchTemplates()
      } else {
        alert("Failed to delete template")
      }
    } catch (error) {
      console.error("Failed to delete template:", error)
    }
  }

  function insertVariable(variable: string) {
    const textarea = document.getElementById("template-body") as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = formData.body
      const before = text.substring(0, start)
      const after = text.substring(end)
      const newText = `${before}{{${variable}}}${after}`
      setFormData({ ...formData, body: newText })
      setTimeout(() => {
        textarea.focus()
        textarea.selectionStart = textarea.selectionEnd = start + variable.length + 4
      }, 0)
    }
  }

  function getPreviewText(text: string) {
    return text
      .replace(/\{\{name\}\}/g, "John Smith")
      .replace(/\{\{email\}\}/g, "john@example.com")
      .replace(/\{\{phone\}\}/g, "(555) 123-4567")
      .replace(/\{\{year\}\}/g, "2020")
      .replace(/\{\{make\}\}/g, "Toyota")
      .replace(/\{\{model\}\}/g, "Camry")
      .replace(/\{\{part_name\}\}/g, "Engine")
      .replace(/\{\{part_category\}\}/g, "2WD")
      .replace(/\{\{message\}\}/g, "Looking for a reliable engine with low mileage.")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/30 bg-card/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/leads" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-black text-foreground">Email Templates</h1>
                <p className="text-sm text-muted-foreground">Create and manage email templates</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={fetchTemplates} className="auapw-btn auapw-btn-outline auapw-btn-sm">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button onClick={startCreate} className="auapw-btn auapw-btn-green auapw-btn-sm">
                <Plus className="w-4 h-4" />
                New Template
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Templates List */}
          <div className="lg:col-span-1">
            <h2 className="text-sm font-black tracking-widest uppercase text-muted-foreground mb-4">
              Templates ({templates.length})
            </h2>
            
            {loading ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <RefreshCw className="w-6 h-6 mx-auto animate-spin text-primary" />
              </div>
            ) : templates.length === 0 ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <FileText className="w-10 h-10 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">No templates yet</p>
                <button onClick={startCreate} className="mt-4 auapw-btn auapw-btn-green auapw-btn-sm">
                  Create First Template
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`glass-card rounded-xl p-4 cursor-pointer transition-all hover:border-primary/30 ${
                      editingTemplate?.id === template.id ? "border-primary/50 bg-primary/5" : ""
                    }`}
                    onClick={() => startEdit(template)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground text-sm">{template.name}</h3>
                      <div className="flex items-center gap-1">
                        {template.is_default && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-primary/20 text-primary">
                            DEFAULT
                          </span>
                        )}
                        {template.is_active ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{template.subject}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-card border border-border/30 text-muted-foreground">
                        {template.template_type.replace("_", " ")}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); startEdit(template) }}
                          className="p-1.5 rounded hover:bg-card/50 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteTemplate(template.id) }}
                          className="p-1.5 rounded hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Editor */}
          <div className="lg:col-span-2">
            {(editingTemplate || isCreating) ? (
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-black text-foreground">
                    {isCreating ? "Create Template" : "Edit Template"}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewMode(!previewMode)}
                      className={`auapw-btn auapw-btn-sm ${previewMode ? "auapw-btn-amber" : "auapw-btn-outline"}`}
                    >
                      <Eye className="w-4 h-4" />
                      {previewMode ? "Edit" : "Preview"}
                    </button>
                    <button onClick={cancelEdit} className="auapw-btn auapw-btn-outline auapw-btn-sm">
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button onClick={saveTemplate} disabled={saving} className="auapw-btn auapw-btn-green auapw-btn-sm">
                      <Save className="w-4 h-4" />
                      {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>

                {previewMode ? (
                  <div className="space-y-4">
                    <div className="bg-card/50 rounded-lg p-4 border border-border/30">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Subject Preview</label>
                      <p className="text-foreground font-semibold mt-1">{getPreviewText(formData.subject)}</p>
                    </div>
                    <div className="bg-card/50 rounded-lg p-4 border border-border/30">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Body Preview</label>
                      <pre className="text-foreground text-sm mt-2 whitespace-pre-wrap font-sans">
                        {getPreviewText(formData.body)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="text-xs font-bold uppercase text-muted-foreground mb-1.5 block">
                        Template Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-border/30 bg-input text-foreground text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none"
                        placeholder="e.g., Quote Confirmation"
                      />
                    </div>

                    {/* Type */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-muted-foreground mb-1.5 block">
                          Template Type
                        </label>
                        <select
                          value={formData.template_type}
                          onChange={(e) => setFormData({ ...formData, template_type: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-border/30 bg-input text-foreground text-sm focus:border-primary/50 outline-none"
                        >
                          <option value="customer_reply">Customer Reply</option>
                          <option value="lead_notification">Lead Notification</option>
                          <option value="follow_up">Follow Up</option>
                        </select>
                      </div>
                      <div className="flex items-end gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.is_active}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            className="w-4 h-4 rounded border-border/30"
                          />
                          <span className="text-sm text-foreground">Active</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.is_default}
                            onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                            className="w-4 h-4 rounded border-border/30"
                          />
                          <span className="text-sm text-foreground">Default</span>
                        </label>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="text-xs font-bold uppercase text-muted-foreground mb-1.5 block">
                        Email Subject <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-border/30 bg-input text-foreground text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none"
                        placeholder="e.g., Your Quote Request - {{part_name}}"
                      />
                    </div>

                    {/* Variables */}
                    <div>
                      <label className="text-xs font-bold uppercase text-muted-foreground mb-1.5 block">
                        Insert Variable
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {AVAILABLE_VARIABLES.map((v) => (
                          <button
                            key={v.key}
                            type="button"
                            onClick={() => insertVariable(v.key)}
                            className="px-2 py-1 text-xs rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            title={v.description}
                          >
                            {`{{${v.key}}}`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Body */}
                    <div>
                      <label className="text-xs font-bold uppercase text-muted-foreground mb-1.5 block">
                        Email Body <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="template-body"
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                        rows={12}
                        className="w-full px-3 py-2 rounded-lg border border-border/30 bg-input text-foreground text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none resize-none font-mono"
                        placeholder="Dear {{name}},&#10;&#10;Thank you for your quote request..."
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-card rounded-xl p-12 text-center">
                <FileText className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Select or Create a Template</h3>
                <p className="text-muted-foreground mb-6">
                  Choose a template from the list to edit, or create a new one.
                </p>
                <button onClick={startCreate} className="auapw-btn auapw-btn-green">
                  <Plus className="w-5 h-5" />
                  Create New Template
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
