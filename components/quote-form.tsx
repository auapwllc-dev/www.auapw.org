"use client"

import { useState } from "react"
import { CAR_MAKES, CAR_MODELS, YEARS } from "@/lib/data"
import { Phone, AlertCircle, CheckCircle2 } from "lucide-react"

const CONTACT_EMAIL = "aupworld@gmail.com"
const PHONE_DISPLAY = "(888) 818-5001"

interface QuoteFormProps {
  defaultPart?: "Engine" | "Transmission" | ""
  compact?: boolean
}

export function QuoteForm({ defaultPart = "", compact = false }: QuoteFormProps) {
  const [part, setPart] = useState(defaultPart)
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [option, setOption] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [zip, setZip] = useState("")
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const models = make ? CAR_MODELS[make] || [] : []

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!make) { setError("Please select a vehicle make."); return }
    if (!name.trim()) { setError("Please enter your name."); return }
    if (!phone.trim()) { setError("Please enter your phone number."); return }

    // Build mailto URL synchronously — must happen inside the user gesture
    // so the browser does NOT block it
    const subject = `Quote Request: ${year || ""} ${make} ${model || ""} - ${part || "Auto Part"}`.trim()

    const body = [
      `New Quote Request from All Auto Part Store`,
      ``,
      `--- Vehicle Details ---`,
      `Part: ${part || "Not specified"}`,
      `Make: ${make}`,
      `Model: ${model || "Not specified"}`,
      `Year: ${year || "Not specified"}`,
      `Option: ${option || "Not specified"}`,
      ``,
      `--- Customer Details ---`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `ZIP: ${zip || "Not provided"}`,
      ``,
      `--- Message ---`,
      message || "(no additional details)",
    ].join("\n")

    const mailtoUrl =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    // Create and immediately click a real anchor tag — this is a synchronous
    // user-gesture-triggered action so browsers allow mailto: without blocking
    const link = document.createElement("a")
    link.href = mailtoUrl
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setSuccess(true)
  }

  const fieldClass =
    "w-full font-sans text-[13px] sm:text-sm px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg border border-border/50 bg-input text-foreground appearance-none outline-none transition-all focus:border-primary/55 focus:ring-1 focus:ring-primary/20"

  if (success) {
    return (
      <div className="glass-card rounded-lg p-8 text-center">
        <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto mb-5" />
        <h3 className="text-2xl font-bold text-foreground mb-3">Email Client Opened!</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Your email client should now be open with all quote details pre-filled. Just hit <strong>Send</strong> to submit your request to {CONTACT_EMAIL}.
        </p>
        <div className="bg-card/50 border border-border/30 rounded-lg p-4 mb-5">
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Email did not open? Contact us directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:8888185001"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-bold text-sm rounded-lg hover:bg-primary/90 transition-all"
            >
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border text-foreground font-bold text-sm rounded-lg bg-muted/30 hover:bg-muted/60 transition-all"
            >
              <img src="/images/icon-email-logo.png" alt="Email" className="w-4 h-4" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <button
          onClick={() => {
            setSuccess(false)
            setMake(""); setModel(""); setName(""); setPhone("")
            setEmail(""); setZip(""); setMessage(""); setPart(defaultPart)
          }}
          className="text-sm text-primary hover:underline"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <div
      className="glass-card rounded-xl sm:rounded-2xl h-full flex flex-col"
      style={{ background: "rgba(7,9,15,0.45)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)" }}
    >
      <div className={compact ? "p-3 sm:p-4" : "p-4 sm:p-6 lg:p-8 flex flex-col h-full"}>
        <h3 className="text-[11px] sm:text-[13px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-primary mb-4 sm:mb-6 lg:mb-[65px] font-roboto">
          Fill Form to Get Quote
        </h3>

        {error && (
          <div className="mb-4 flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3" role="alert">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div>
              <label htmlFor="qf-part" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Select Part
              </label>
              <select id="qf-part" className={fieldClass} value={part} onChange={(e) => setPart(e.target.value)}>
                <option value="">Select Part</option>
                <option value="Engine">Engine</option>
                <option value="Transmission">Transmission</option>
              </select>
            </div>
            <div>
              <label htmlFor="qf-make" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Select Make <span className="text-red-400">*</span>
              </label>
              <select id="qf-make" className={fieldClass} value={make} onChange={(e) => { setMake(e.target.value); setModel("") }} aria-required="true">
                <option value="">Select Make</option>
                {CAR_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div>
              <label htmlFor="qf-model" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Select Model
              </label>
              <select id="qf-model" className={fieldClass} value={model} onChange={(e) => setModel(e.target.value)} disabled={!make}>
                <option value="">{make ? "Select Model" : "Select Make First"}</option>
                {models.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="qf-year" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Select Year
              </label>
              <select id="qf-year" className={fieldClass} value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Select Year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="qf-option" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Select Option
              </label>
              <select id="qf-option" className={fieldClass} value={option} onChange={(e) => setOption(e.target.value)}>
                <option value="">Select Option</option>
                <option value="2WD">2WD</option>
                <option value="4WD">4WD</option>
                <option value="AWD">AWD</option>
                <option value="FWD">FWD</option>
                <option value="RWD">RWD</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div>
              <label htmlFor="qf-name" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input id="qf-name" type="text" className={fieldClass} placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="qf-phone" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Phone <span className="text-red-400">*</span>
              </label>
              <input id="qf-phone" type="tel" className={fieldClass} placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div>
              <label htmlFor="qf-email" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Email
              </label>
              <input id="qf-email" type="email" className={fieldClass} placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="qf-zip" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                ZIP Code
              </label>
              <input id="qf-zip" type="text" inputMode="numeric" className={fieldClass} placeholder="ZIP Code" maxLength={5} value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))} autoComplete="postal-code" />
            </div>
          </div>

          {!compact && (
            <div className="mb-3 sm:mb-4">
              <label htmlFor="qf-msg" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Additional Details
              </label>
              <textarea
                id="qf-msg"
                className={`${fieldClass} min-h-[60px] sm:min-h-[80px]`}
                placeholder="Any additional details about the part you need..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          )}

          <div className="mt-auto pt-3 sm:pt-4">
            <button
              type="submit"
              className="w-full relative overflow-hidden rounded-full transition-all hover:shadow-lg hover:shadow-black/40"
            >
              <img src="/images/button-get-quote.png" alt="Get A Quote" className="w-full h-auto block" />
            </button>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-2 sm:mt-3 leading-relaxed">
              Clicking the button will open your email client with your quote details pre-filled to send to {CONTACT_EMAIL}.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
