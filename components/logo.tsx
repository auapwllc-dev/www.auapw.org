import Image from "next/image"
import { cn } from "@/lib/utils"

type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"

interface LogoProps {
  size?: LogoSize
  className?: string
  priority?: boolean
  showGlow?: boolean
  variant?: "default" | "ring" | "medallion"
}

const SIZE_MAP: Record<LogoSize, { width: number; height: number; containerClass: string }> = {
  xs: { width: 32, height: 32, containerClass: "w-8 h-8" },
  sm: { width: 56, height: 56, containerClass: "w-14 h-14" },
  md: { width: 72, height: 72, containerClass: "w-[72px] h-[72px]" },
  lg: { width: 100, height: 100, containerClass: "w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]" },
  xl: { width: 140, height: 140, containerClass: "w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px]" },
  "2xl": { width: 180, height: 180, containerClass: "w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px]" },
  "3xl": { width: 240, height: 240, containerClass: "w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px]" },
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
