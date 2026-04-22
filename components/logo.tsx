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
  xs: { width: 32, height: 32, containerClass: "w-8 h-8" },
  sm: { width: 48, height: 48, containerClass: "w-10 h-10 sm:w-12 sm:h-12" },
  md: { width: 64, height: 64, containerClass: "w-14 h-14 sm:w-16 sm:h-16" },
  lg: { width: 96, height: 96, containerClass: "w-20 h-20 sm:w-24 sm:h-24" },
  xl: { width: 120, height: 120, containerClass: "w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32" },
  "2xl": { width: 160, height: 160, containerClass: "w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40" },
  "3xl": { width: 200, height: 200, containerClass: "w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48" },
  "4xl": { width: 240, height: 240, containerClass: "w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64" },
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
