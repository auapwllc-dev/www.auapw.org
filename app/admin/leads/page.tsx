"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Users, Mail, Phone, Calendar, ChevronDown, 
  Send, RefreshCw, FileText, AlertCircle, CheckCircle2,
  Clock, XCircle, Trophy, ArrowLeft
} from "lucide-react"

interface Lead {
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
  status: string
  priority: string
  email_sent: boolean
  created_at: string
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  quoted: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  won: "bg-green-500/20 text-green-400 border-green-500/30",
  lost: "bg-red-500/20 text-red-400 border-red-500/30",
}

const statusIcons: Record<string, React.ReactNode> = {
  new: <AlertCircle className="w-4 h-4" />,
  contacted: <Phone className="w-4 h-4" />,
  quoted: <FileText className="w-4 h-4" />,
  won: <Trophy className="w-4 h-4" />,
  lost: <XCircle className="w-4 h-4" />,
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [stats, setStats] = useState<Record<string, number>>({})

  useEffect(() => {
    fetchLeads()
    fetchStats()
  }, [statusFilter])

  async function fetchLeads() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== "all") params.set("status", statusFilter)
      const res = await fetch(`/api/leads?${params}`)
      const data = await res.json()
      setLeads(data.leads || [])
    } catch (error) {
      console.error("Failed to fetch leads:", error)
    }
    setLoading(false)
  }

  async function fetchStats() {
    try {
      const res = await fetch("/api/leads?stats=true")
      const data = await res.json()
      const statsMap: Record<string, number> = {}
      data.stats?.forEach((s: { status: string; count: number }) => {
        statsMap[s.status] = parseInt(String(s.count))
      })
      setStats(statsMap)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  async function updateLeadStatus(id: number, status: string) {
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      fetchLeads()
      fetchStats()
    } catch (error) {
      console.error("Failed to update lead:", error)
    }
  }

  async function sendEmail(lead: Lead) {
    setSendingEmail(true)
    try {
      const res = await fetch(`/api/leads/${lead.id}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `Your Quote Request - ${lead.part_name || "Auto Part"}`,
          body: `Dear ${lead.name},\n\nThank you for your interest in the ${lead.part_name || "auto part"} for your ${lead.year || ""} ${lead.make || ""} ${lead.model || ""}.\n\nWe are currently processing your request and will get back to you shortly with pricing and availability.\n\nBest regards,\nAUAPW.ORG Team`,
        }),
      })
      if (res.ok) {
        alert("Email sent successfully!")
        fetchLeads()
      } else {
        const data = await res.json()
        alert(`Failed to send email: ${data.error}`)
      }
    } catch (error) {
      console.error("Failed to send email:", error)
      alert("Failed to send email")
    }
    setSendingEmail(false)
  }

  const totalLeads = Object.values(stats).reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/30 bg-card/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-black text-foreground">Lead Management</h1>
                <p className="text-sm text-muted-foreground">Review and manage quote requests</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/templates" className="auapw-btn auapw-btn-silver auapw-btn-sm">
                <FileText className="w-4 h-4" />
                Email Templates
              </Link>
              <button onClick={() => { fetchLeads(); fetchStats() }} className="auapw-btn auapw-btn-outline auapw-btn-sm">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-black text-foreground">{totalLeads}</p>
            <p className="text-xs text-muted-foreground">Total Leads</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <AlertCircle className="w-6 h-6 mx-auto mb-2 text-blue-400" />
            <p className="text-2xl font-black text-foreground">{stats.new || 0}</p>
            <p className="text-xs text-muted-foreground">New</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Phone className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
            <p className="text-2xl font-black text-foreground">{stats.contacted || 0}</p>
            <p className="text-xs text-muted-foreground">Contacted</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <FileText className="w-6 h-6 mx-auto mb-2 text-purple-400" />
            <p className="text-2xl font-black text-foreground">{stats.quoted || 0}</p>
            <p className="text-xs text-muted-foreground">Quoted</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-green-400" />
            <p className="text-2xl font-black text-foreground">{stats.won || 0}</p>
            <p className="text-xs text-muted-foreground">Won</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <XCircle className="w-6 h-6 mx-auto mb-2 text-red-400" />
            <p className="text-2xl font-black text-foreground">{stats.lost || 0}</p>
            <p className="text-xs text-muted-foreground">Lost</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <label className="text-sm font-semibold text-muted-foreground">Filter by status:</label>
          <div className="flex flex-wrap gap-2">
            {["all", "new", "contacted", "quoted", "won", "lost"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  statusFilter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg font-semibold text-foreground mb-2">No leads found</p>
              <p className="text-muted-foreground">Quote requests will appear here when customers submit the form.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-card/50 border-b border-border/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-muted-foreground">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-muted-foreground">Vehicle</th>
                    <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-muted-foreground">Part</th>
                    <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {leads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className="hover:bg-card/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-semibold text-foreground">{lead.name}</p>
                          <p className="text-xs text-muted-foreground">{lead.email}</p>
                          {lead.phone && <p className="text-xs text-muted-foreground">{lead.phone}</p>}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-foreground">
                          {[lead.year, lead.make, lead.model].filter(Boolean).join(" ") || "—"}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-foreground">{lead.part_name || "—"}</p>
                        {lead.part_category && (
                          <p className="text-xs text-muted-foreground">{lead.part_category}</p>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${statusColors[lead.status] || statusColors.new}`}>
                          {statusIcons[lead.status]}
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(lead.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className="text-xs px-2 py-1 rounded-lg border border-border/30 bg-card text-foreground"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="quoted">Quoted</option>
                            <option value="won">Won</option>
                            <option value="lost">Lost</option>
                          </select>
                          <button
                            onClick={() => sendEmail(lead)}
                            disabled={sendingEmail}
                            className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                            title="Send email"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedLead(null)}>
            <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-foreground">Lead Details</h2>
                <button onClick={() => setSelectedLead(null)} className="p-2 rounded-lg hover:bg-card/50 transition-colors">
                  <XCircle className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Name</label>
                    <p className="text-foreground font-semibold">{selectedLead.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Email</label>
                    <p className="text-foreground">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Phone</label>
                    <p className="text-foreground">{selectedLead.phone || "—"}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Status</label>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${statusColors[selectedLead.status]}`}>
                      {statusIcons[selectedLead.status]}
                      {selectedLead.status}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border/30 pt-4">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Vehicle</label>
                  <p className="text-foreground font-semibold">
                    {[selectedLead.year, selectedLead.make, selectedLead.model].filter(Boolean).join(" ") || "Not specified"}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Part Requested</label>
                  <p className="text-foreground font-semibold">{selectedLead.part_name || "Not specified"}</p>
                  {selectedLead.part_category && (
                    <p className="text-sm text-muted-foreground">Category: {selectedLead.part_category}</p>
                  )}
                </div>

                {selectedLead.message && (
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Message</label>
                    <p className="text-foreground bg-card/50 rounded-lg p-3 text-sm">{selectedLead.message}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Submitted: {new Date(selectedLead.created_at).toLocaleString()}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  {selectedLead.email_sent ? (
                    <span className="flex items-center gap-1 text-green-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Email sent
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-400">
                      <AlertCircle className="w-4 h-4" />
                      Email not sent
                    </span>
                  )}
                </div>

                <div className="border-t border-border/30 pt-4 flex gap-3">
                  <button
                    onClick={() => sendEmail(selectedLead)}
                    disabled={sendingEmail}
                    className="auapw-btn auapw-btn-green flex-1"
                  >
                    <Send className="w-4 h-4" />
                    {sendingEmail ? "Sending..." : "Send Email"}
                  </button>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="auapw-btn auapw-btn-silver"
                  >
                    <Mail className="w-4 h-4" />
                    Open in Mail
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
