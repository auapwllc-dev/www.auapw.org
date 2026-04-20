"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CAR_MAKES, CAR_MODELS, PART_CATEGORIES, YEARS, US_STATES } from "@/lib/data"
import { Search, Phone, MessageSquare, AlertCircle } from "lucide-react"

interface SearchFormProps {
  compact?: boolean
}

const ZIP_RE = /^\d{5}$/

function validateZip(zip: string): string | null {
  if (zip && !ZIP_RE.test(zip)) return "ZIP code must be exactly 5 digits."
  return null
}

export function SearchForm({ compact = false }: SearchFormProps) {
  const router = useRouter()
  const [year, setYear] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [part, setPart] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")

  const [makeError, setMakeError] = useState<string | null>(null)
  const [zipError, setZipError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const models = make ? CAR_MODELS[make] || [] : []

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)

    const zipErr = validateZip(zip)
    setZipError(zipErr)

    if (!make) {
      setMakeError("Please select a vehicle make to search.")
      return
    }
    setMakeError(null)
    if (zipErr) return

    const params = new URLSearchParams()
    if (year) params.set("year", year)
    params.set("make", make)
    if (model) params.set("model", model)
    if (part) params.set("part", part)
    if (state) params.set("state", state)
    if (city.trim()) params.set("city", city.trim())
    if (zip) params.set("zip", zip)

    router.push(`/search?${params.toString()}`)
  }

  const selectBase =
    "w-full font-sans text-sm px-4 py-3.5 bg-[rgba(13,15,22,0.75)] backdrop-blur-sm border rounded-lg text-foreground appearance-none outline-none transition-all"
  const selectClass = (hasError: boolean) =>
    `${selectBase} ${
      hasError
        ? "border-red-500/60 focus:border-red-500/80 focus:ring-1 focus:ring-red-500/20"
        : "border-border/50 focus:border-primary/55 focus:ring-1 focus:ring-primary/20"
    }`
  const inputClass = selectClass(zipError !== null && submitted)

  return (
    <div className={`glass-card rounded-lg ${compact ? "shadow-md" : "shadow-[0_16px_48px_rgba(0,0,0,0.35)]"}`}>
      <div className="metal-line" />
      <div className={compact ? "p-5 sm:p-6" : "p-8 sm:p-10 lg:p-12"}>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="text-[0.7rem] font-bold tracking-[0.25em] uppercase text-primary">
              Find Your Part
            </span>
          </div>
          <a
            href="tel:8888185001"
            aria-label="Call us at 888-818-5001"
            className="text-[0.75rem] font-semibold text-muted-foreground tracking-wide hidden sm:block"
          >
            <Phone className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" />
            (888) 818-5001
          </a>
        </div>

        <form onSubmit={handleSubmit} noValidate aria-label="Part search form">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {/* Year */}
            <div>
              <label htmlFor="sf-year" className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2.5">
                Year
              </label>
              <select
                id="sf-year"
                className={selectClass(false)}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Select Year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            {/* Make */}
            <div>
              <label htmlFor="sf-make" className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2.5">
                Make <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <select
                id="sf-make"
                className={selectClass(!!makeError)}
                value={make}
                onChange={(e) => {
                  setMake(e.target.value)
                  setModel("")
                  setMakeError(null)
                }}
                aria-required="true"
                aria-invalid={!!makeError}
                aria-describedby={makeError ? "sf-make-error" : undefined}
              >
                <option value="">Select Make</option>
                {CAR_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              {makeError && (
                <p id="sf-make-error" role="alert" className="mt-2 flex items-center gap-1 text-[11px] text-red-400">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {makeError}
                </p>
              )}
            </div>

            {/* Model */}
            <div>
              <label htmlFor="sf-model" className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2.5">
                Model
              </label>
              <select
                id="sf-model"
                className={selectClass(false)}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!make}
                aria-disabled={!make}
              >
                <option value="">{make ? "Select Model" : "Select Make First"}</option>
                {models.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Part */}
            <div>
              <label htmlFor="sf-part" className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2.5">
                Part Type
              </label>
              <select
                id="sf-part"
                className={selectClass(false)}
                value={part}
                onChange={(e) => setPart(e.target.value)}
              >
                <option value="">Select Part</option>
                {PART_CATEGORIES.map((cat) => (
                  <optgroup key={cat.id} label={cat.label}>
                    {cat.parts.map((p) => <option key={p} value={p}>{p}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {!compact && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6" style={{ gridTemplateColumns: "1.4fr 1.6fr 1fr" }}>
              {/* State */}
              <div>
                <label htmlFor="sf-state" className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2.5">
                  State
                </label>
                <select
                  id="sf-state"
                  className={selectClass(false)}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">All States</option>
                  {US_STATES.map((s) => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
                </select>
              </div>

              {/* City */}
              <div>
                <label htmlFor="sf-city" className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2.5">
                  City{" "}
                  <span className="font-normal tracking-normal normal-case text-muted-foreground/60">(optional)</span>
                </label>
                <input
                  id="sf-city"
                  type="text"
                  className={selectClass(false)}
                  placeholder="e.g. Los Angeles"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  autoComplete="address-level2"
                />
              </div>

              {/* Zip */}
              <div>
                <label htmlFor="sf-zip" className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2.5">
                  Zip Code
                </label>
                <input
                  id="sf-zip"
                  type="text"
                  inputMode="numeric"
                  className={inputClass}
                  placeholder="e.g. 90001"
                  maxLength={5}
                  value={zip}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 5)
                    setZip(v)
                    setZipError(validateZip(v))
                  }}
                  aria-invalid={!!zipError}
                  aria-describedby={zipError ? "sf-zip-error" : undefined}
                  autoComplete="postal-code"
                />
                {zipError && (
                  <p id="sf-zip-error" role="alert" className="mt-2 flex items-center gap-1 text-[11px] text-red-400">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {zipError}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3 items-stretch flex-wrap">
            <button
              type="submit"
              className="btn-led flex-1 min-w-[180px] inline-flex items-center justify-center gap-2.5 text-[0.75rem] font-bold tracking-[0.18em] uppercase px-6 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
              aria-label="Search available parts"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              Search Available Parts
            </button>
            <a
              href="tel:8888185001"
              aria-label="Call us to order by phone"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-[0.7rem] font-bold tracking-[0.18em] uppercase border border-border/60 text-muted-foreground rounded-lg hover:border-foreground/50 hover:text-foreground transition-all"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              Call
            </a>
            <a
              href="/quote"
              aria-label="Request a free quote"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-[0.7rem] font-bold tracking-[0.18em] uppercase border border-border/60 text-muted-foreground rounded-lg hover:border-foreground/50 hover:text-foreground transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              Quote
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
