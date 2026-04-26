"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CAR_MAKES, CAR_MODELS, PART_CATEGORIES, YEARS } from "@/lib/data"
import { Search, MessageSquare, Phone, Mail, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react"

const CONTACT_EMAIL = "auapworld@gmail.com"
const PHONE_DISPLAY = "(888) 818-5001"

const PART_OPTIONS = [
  "Engine", "Transmission", "Transfer Case", "Axle Assembly",
  "Alternator", "Starter", "A/C Compressor", "Power Steering Pump",
  "Radiator", "Fuel Pump", "Catalytic Converter", "ABS Module",
  "Airbag", "Control Arm", "CV Axle", "Door Assembly",
  "Fender", "Hood", "Headlight", "Taillight",
  "Bumper", "Instrument Cluster", "Radio / Infotainment",
  "Seat Assembly", "Window Regulator", "Wiper Motor", "Other",
]

const DRIVE_OPTIONS = ["2WD", "4WD", "AWD", "FWD", "RWD"]

/* ─── Shared field style ─── */
const field =
  "w-full text-sm px-4 py-3 rounded-lg border border-white/10 bg-[rgba(10,12,20,0.8)] text-foreground appearance-none outline-none transition-all focus:border-primary/70 focus:ring-1 focus:ring-primary/25 disabled:opacity-40 placeholder:text-muted-foreground/40"

/* ─── Label ─── */
function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-[0.6rem] font-black tracking-[0.22em] uppercase text-muted-foreground select-none">
      {children}
    </label>
  )
}

/* ─── Select wrapper with chevron icon ─── */
function SelectField({ id, value, onChange, disabled, children }: {
  id: string
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`${field} pr-9 cursor-pointer`}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
    </div>
  )
}

/* ══════════════════════════════════════════
   SEARCH FORM PANEL
══════════════════════════════════════════ */
function SearchPanel() {
  const router = useRouter()
  const [part,  setPart]  = useState("")
  const [make,  setMake]  = useState("")
  const [model, setModel] = useState("")
  const [year,  setYear]  = useState("")
  const [option, setOption] = useState("")
  const [error, setError] = useState<string | null>(null)

  const models = make ? CAR_MODELS[make] || [] : []

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!make) { setError("Please select a vehicle make."); return }
    setError(null)
    const p = new URLSearchParams()
    if (part)  p.set("part",  part)
    p.set("make", make)
    if (model) p.set("model", model)
    if (year)  p.set("year",  year)
    if (option) p.set("option", option)
    router.push(`/search?${p.toString()}`)
  }

  return (
    <div className="flex flex-col h-full">

      {/* Panel header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}>
          <Search className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <p className="text-[0.55rem] font-black tracking-[0.28em] uppercase text-blue-400/80 leading-none mb-1">Step 1</p>
          <h3 className="text-base font-black tracking-tight text-foreground leading-none">Search Parts</h3>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-1.5 text-[0.65rem] font-semibold text-muted-foreground">
          <Phone className="w-3 h-3" />
          {PHONE_DISPLAY}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSearch} noValidate className="flex flex-col gap-4 flex-1">

        {/* Select Part */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sf-part">Select Part</Label>
          <SelectField id="sf-part" value={part} onChange={setPart}>
            <option value="">Select Part</option>
            {PART_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </SelectField>
        </div>

        {/* Select Make */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sf-make">Select Make <span className="text-red-400">*</span></Label>
          <SelectField id="sf-make" value={make} onChange={(v) => { setMake(v); setModel(""); setError(null) }}>
            <option value="">Select Make</option>
            {CAR_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
          </SelectField>
        </div>

        {/* Select Model */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sf-model">Select Model</Label>
          <SelectField id="sf-model" value={model} onChange={setModel} disabled={!make}>
            <option value="">{make ? "Select Model" : "Select Make First"}</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </SelectField>
        </div>

        {/* Select Year */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sf-year">Select Year</Label>
          <SelectField id="sf-year" value={year} onChange={setYear}>
            <option value="">Select Year</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </SelectField>
        </div>

        {/* Select Option */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sf-option">Select Option</Label>
          <SelectField id="sf-option" value={option} onChange={setOption}>
            <option value="">Select Option</option>
            {DRIVE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </SelectField>
        </div>

        {/* Submit */}
        <div className="mt-auto pt-2 flex flex-col gap-3">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg font-black text-sm tracking-[0.15em] uppercase transition-all text-white"
            style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
              border: "1px solid rgba(59,130,246,0.4)",
              boxShadow: "0 4px 20px rgba(37,99,235,0.35)"
            }}
          >
            <Search className="w-4 h-4" />
            Search Available Parts
          </button>
          <a
            href="tel:8888185001"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold tracking-[0.12em] uppercase transition-all text-green-400 hover:text-green-300"
            style={{ border: "1px solid rgba(34,197,94,0.25)", background: "rgba(34,197,94,0.06)" }}
          >
            <Phone className="w-3.5 h-3.5" />
            Call {PHONE_DISPLAY}
          </a>
        </div>

      </form>
    </div>
  )
}

/* ══════════════════════════════════════════
   QUOTE FORM PANEL
══════════════════════════════════════════ */
function QuotePanel() {
  const [part,    setPart]    = useState("")
  const [make,    setMake]    = useState("")
  const [model,   setModel]   = useState("")
  const [year,    setYear]    = useState("")
  const [option,  setOption]  = useState("")
  const [name,    setName]    = useState("")
  const [phone,   setPhone]   = useState("")
  const [email,   setEmail]   = useState("")
  const [zip,     setZip]     = useState("")
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const models = make ? CAR_MODELS[make] || [] : []

  function reset() {
    setSuccess(false)
    setPart(""); setMake(""); setModel(""); setYear(""); setOption("")
    setName(""); setPhone(""); setEmail(""); setZip(""); setError(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!make)        { setError("Please select a vehicle make.");   return }
    if (!name.trim()) { setError("Please enter your name.");         return }
    if (!phone.trim()){ setError("Please enter your phone number."); return }
    setError(null)

    const subject = `Quote Request: ${[year, make, model].filter(Boolean).join(" ")} — ${part || "Auto Part"}`
    const body = [
      "New Quote Request — AUAPW.ORG",
      "",
      "═══════════════════════════",
      "  VEHICLE & PART DETAILS",
      "═══════════════════════════",
      `Part Needed : ${part    || "Not specified"}`,
      `Make        : ${make}`,
      `Model       : ${model   || "Not specified"}`,
      `Year        : ${year    || "Not specified"}`,
      `Option      : ${option  || "Not specified"}`,
      "",
      "═══════════════════════════",
      "  CUSTOMER DETAILS",
      "═══════════════════════════",
      `Name        : ${name}`,
      `Phone       : ${phone}`,
      `Email       : ${email   || "Not provided"}`,
      `ZIP Code    : ${zip     || "Not provided"}`,
      "",
      `---`,
      `Submitted via AUAPW.ORG — ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PST`,
    ].join("\n")

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-5 h-full py-8">
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
          <CheckCircle2 className="w-7 h-7 text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-black text-foreground mb-1">Quote Request Sent!</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your email client opened with all details. Just press <strong>Send</strong> to reach us at <strong>{CONTACT_EMAIL}</strong>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <a href={`tel:8888185001`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-black tracking-wider uppercase text-green-400"
            style={{ border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.08)" }}>
            <Phone className="w-3.5 h-3.5" />{PHONE_DISPLAY}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-black tracking-wider uppercase text-blue-400"
            style={{ border: "1px solid rgba(59,130,246,0.3)", background: "rgba(59,130,246,0.08)" }}>
            <Mail className="w-3.5 h-3.5" />Email Us
          </a>
        </div>
        <button onClick={reset} className="text-xs text-muted-foreground underline hover:text-foreground transition-colors">
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">

      {/* Panel header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)" }}>
          <MessageSquare className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <p className="text-[0.55rem] font-black tracking-[0.28em] uppercase text-amber-400/80 leading-none mb-1">Free Quote</p>
          <h3 className="text-base font-black tracking-tight text-foreground leading-none">Fill Form to Get Quote</h3>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5 flex-1">

        {/* Select Part */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="qf-part">Select Part</Label>
          <SelectField id="qf-part" value={part} onChange={setPart}>
            <option value="">Select Part</option>
            {PART_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </SelectField>
        </div>

        {/* Select Make */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="qf-make">Select Make <span className="text-red-400">*</span></Label>
          <SelectField id="qf-make" value={make} onChange={(v) => { setMake(v); setModel(""); setError(null) }}>
            <option value="">Select Make</option>
            {CAR_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
          </SelectField>
        </div>

        {/* Select Model */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="qf-model">Select Model</Label>
          <SelectField id="qf-model" value={model} onChange={setModel} disabled={!make}>
            <option value="">{make ? "Select Model" : "Select Make First"}</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </SelectField>
        </div>

        {/* Select Year */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="qf-year">Select Year</Label>
          <SelectField id="qf-year" value={year} onChange={setYear}>
            <option value="">Select Year</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </SelectField>
        </div>

        {/* Select Option */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="qf-option">Select Option</Label>
          <SelectField id="qf-option" value={option} onChange={setOption}>
            <option value="">Select Option</option>
            {DRIVE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </SelectField>
        </div>

        {/* Name + Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="qf-name">Your Name <span className="text-red-400">*</span></Label>
            <input id="qf-name" type="text" className={field} placeholder="Full Name"
              value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="qf-phone">Phone <span className="text-red-400">*</span></Label>
            <input id="qf-phone" type="tel" className={field} placeholder="Phone Number"
              value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
          </div>
        </div>

        {/* Email + ZIP */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="qf-email">Email</Label>
            <input id="qf-email" type="email" className={field} placeholder="Email Address"
              value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="qf-zip">ZIP Code</Label>
            <input id="qf-zip" type="text" inputMode="numeric" className={field} placeholder="ZIP Code"
              maxLength={5} value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              autoComplete="postal-code" />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-auto pt-1">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg font-black text-sm tracking-[0.15em] uppercase transition-all text-black"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
              border: "1px solid rgba(251,191,36,0.5)",
              boxShadow: "0 4px 20px rgba(245,158,11,0.4)"
            }}
          >
            <MessageSquare className="w-4 h-4" />
            Get A Free Quote
          </button>
          <p className="text-[9px] text-muted-foreground mt-2.5 leading-relaxed text-center">
            By submitting, you authorize AUAPW.ORG to contact you with offers &amp; information.{" "}
            <a href="/privacy-policy" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
          </p>
        </div>

      </form>
    </div>
  )
}

/* ══════════════════════════════════════════
   COMBINED FORM — main export
══════════════════════════════════════════ */
export function CombinedForm() {
  return (
    <div className="w-full max-w-5xl mx-auto">

      {/* Section heading */}
      <div className="text-center mb-8">
        <p className="text-[0.6rem] font-black tracking-[0.3em] uppercase text-primary mb-2">
          AUAPW.ORG — Nationwide Parts Network
        </p>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground text-balance leading-tight">
          Search Parts or Get a Free Quote
        </h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Select your vehicle details below — search our 2,000+ yard network or request a quote instantly.
        </p>
      </div>

      {/* Two-panel grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
          background: "rgba(8,10,18,0.85)",
        }}
      >

        {/* ── LEFT: Search ── */}
        <div className="p-6 sm:p-8 flex flex-col border-b lg:border-b-0 lg:border-r"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {/* Blue accent top stripe */}
          <div className="h-[3px] w-full rounded-full mb-6"
            style={{ background: "linear-gradient(90deg, #1d4ed8, #3b82f6, transparent)" }} />
          <SearchPanel />
        </div>

        {/* ── RIGHT: Quote ── */}
        <div className="p-6 sm:p-8 flex flex-col">
          {/* Amber accent top stripe */}
          <div className="h-[3px] w-full rounded-full mb-6"
            style={{ background: "linear-gradient(90deg, #b45309, #fbbf24, transparent)" }} />
          <QuotePanel />
        </div>

      </div>

      {/* Bottom trust bar */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
        {[
          { label: "Response Time", value: "Under 24 Hrs" },
          { label: "Warranty", value: "30–180 Days" },
          { label: "Yards Nationwide", value: "2,000+" },
          { label: "States Covered", value: "All 50" },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span className="text-[0.9rem] font-black text-foreground">{value}</span>
            <span className="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
