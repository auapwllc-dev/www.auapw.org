import Image from "next/image"
import { cn } from "@/lib/utils"

type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"

interface LogoProps {
  size?: LogoSize
  className?: string
  priority?: boolean
  showGlow?: boolean
  variant?: "default" | "ring" | "medallion"
}

const SIZE_MAP: Record<LogoSize, { width: number; height: number; containerClass: string }> = {
  xs: { width: 40, height: 40, containerClass: "w-10 h-10" },
  sm: { width: 80, height: 80, containerClass: "w-20 h-20" },
  md: { width: 120, height: 120, containerClass: "w-[120px] h-[120px]" },
  lg: { width: 160, height: 160, containerClass: "w-[140px] h-[140px] sm:w-[160px] sm:h-[160px]" },
  xl: { width: 200, height: 200, containerClass: "w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px]" },
  "2xl": { width: 280, height: 280, containerClass: "w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px]" },
  "3xl": { width: 360, height: 360, containerClass: "w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px]" },
  "4xl": { width: 480, height: 480, containerClass: "w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px]" },
}

export function Logo({
  size = "md",
  className,
  priority = false,
  showGlow = false,
  variant = "default",
}: LogoProps) {
  const { width, height, containerClass } = SIZE_MAP[size]

  const containerStyles = cn(
    "flex items-center justify-center overflow-hidden shrink-0",
    containerClass,
    className
  )

  return (
    <div className="relative">
      <div className={containerStyles}>
        <Image
          src="/logo-auapw.png"
          alt="AUAPW.ORG - Quality Used Auto Parts"
          width={width}
          height={height}
          className="object-contain"
          priority={priority}
        />
      </div>
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(232,232,232,0.15) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      )}
    </div>
  )
}
