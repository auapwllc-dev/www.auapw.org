import Image from "next/image"
import { cn } from "@/lib/utils"

type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

interface LogoProps {
  size?: LogoSize
  className?: string
  priority?: boolean
  showGlow?: boolean
  variant?: "default" | "ring" | "medallion"
}

const SIZE_MAP: Record<LogoSize, { width: number; height: number; containerClass: string }> = {
  xs: { width: 32, height: 32, containerClass: "w-8 h-8" },
  sm: { width: 46, height: 46, containerClass: "w-[46px] h-[46px]" },
  md: { width: 56, height: 56, containerClass: "w-14 h-14" },
  lg: { width: 72, height: 72, containerClass: "w-[72px] h-[72px] sm:w-[90px] sm:h-[90px]" },
  xl: { width: 100, height: 100, containerClass: "w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] lg:w-[110px] lg:h-[110px]" },
  "2xl": { width: 120, height: 120, containerClass: "w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]" },
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
