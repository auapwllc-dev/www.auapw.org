import { STEPS } from "@/lib/data"
import { SectionHeading } from "./parts-grid"

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-zinc-950 text-white py-16 md:py-24 overflow-hidden"
    >
      {/* subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary-foreground px-3 py-1 text-[11px] md:text-xs font-black uppercase tracking-widest">
            <span className="h-1 w-1 bg-primary" aria-hidden="true" />
            How It Works
          </div>
          <h2 className="mt-4 font-sans font-black text-balance text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
            From search to shipped in minutes.
          </h2>
          <p className="mt-4 text-base md:text-lg text-zinc-300 leading-relaxed text-pretty">
            Three simple steps. No account required. No pushy sales calls.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className="relative bg-white/[0.03] border border-white/10 backdrop-blur p-7 md:p-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-black text-5xl md:text-6xl text-primary leading-none tabular-nums">
                  {s.n}
                </span>
                <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-black text-xl md:text-2xl leading-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-sm md:text-base text-zinc-300 leading-relaxed">
                {s.body}
              </p>
              {i < STEPS.length - 1 ? (
                <div
                  className="hidden md:block absolute top-1/2 -right-4 h-px w-8 bg-primary/60"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <a
            href="#quote"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm px-8 h-12 shadow-lg hover:bg-primary/90 transition-colors"
          >
            Get Started — It&apos;s Free
          </a>
        </div>
      </div>
    </section>
  )
}
