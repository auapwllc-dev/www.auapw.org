"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { MAKES } from "@/lib/data"
import { SectionHeading } from "./parts-grid"

const LETTERS = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")]

export function MakesGrid() {
  const [filter, setFilter] = useState<string>("All")

  const filtered = useMemo(() => {
    if (filter === "All") return MAKES
    return MAKES.filter((m) => m.toUpperCase().startsWith(filter))
  }, [filter])

  return (
    <section id="makes" className="bg-card/40 border-y border-border py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Shop By Brand"
          title="Parts for 50+ domestic and import makes."
          lede="Select a letter to jump to a brand, or browse the full list below."
        />

        {/* A–Z filter */}
        <div
          role="tablist"
          aria-label="Filter makes by letter"
          className="mt-10 flex flex-wrap justify-center gap-1.5"
        >
          {LETTERS.map((l) => {
            const active = l === filter
            const available =
              l === "All" ||
              MAKES.some((m) => m.toUpperCase().startsWith(l))
            return (
              <button
                key={l}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(l)}
                disabled={!available}
                className={`min-w-[36px] h-8 px-2.5 text-[11px] font-bold tracking-wide transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : available
                      ? "bg-secondary/80 text-secondary-foreground hover:bg-secondary"
                      : "bg-muted text-muted-foreground opacity-40 cursor-not-allowed"
                }`}
              >
                {l}
              </button>
            )
          })}
        </div>

        {/* Makes grid */}
        <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
          {filtered.map((m) => (
            <li key={m}>
              <Link
                href="#quote"
                className="group flex items-center justify-center text-center h-14 md:h-16 bg-background border border-border px-3 text-sm md:text-base font-bold text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
              >
                {m}
              </Link>
            </li>
          ))}
        </ul>
        {filtered.length === 0 ? (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No makes starting with {filter}. Try another letter.
          </p>
        ) : null}
      </div>
    </section>
  )
}
