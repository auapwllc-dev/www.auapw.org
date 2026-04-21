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

  const baseContainerStyles = cn(
    "flex items-center justify-center overflow-hidden shrink-0",
    containerClass,
    className
  )

  const ringStyles = cn(
    baseContainerStyles,
    "rounded-full border-2 border-[rgba(100,120,140,0.4)] bg-gradient-to-br from-[#0a0c12] via-[#0f1118] to-[#05070b]",
    "shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_-2px_8px_rgba(255,255,255,0.05),0_12px_32px_rgba(0,0,0,0.6)]"
  )

  const medallionStyles = cn(
    baseContainerStyles,
    "rounded-full border-2 border-[rgba(255,255,255,0.18)] bg-[rgba(13,15,22,0.70)]"
  )

  const containerStyles =
    variant === "ring"
      ? ringStyles
      : variant === "medallion"
        ? medallionStyles
        : baseContainerStyles

  const boxShadow =
    variant === "medallion"
      ? "0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.10)"
      : variant === "ring"
        ? "0 3px 10px rgba(0,0,0,.5)"
        : undefined

  return (
    <div className="relative">
      <div className={containerStyles} style={boxShadow ? { boxShadow } : undefined}>
        <Image
          src="/logo-auapw.png"
          alt="AUAPW.ORG - Quality Used Auto Parts"
          width={width}
          height={height}
          className="object-contain"
          priority={priority}
          style={variant === "ring" ? { 
            lineHeight: "0em", 
            letterSpacing: "0.742em",
            marginTop: "-3px",
            marginLeft: "-2px",
            marginBottom: "-3px",
            paddingBottom: "-16px",
            textAlign: "left",
            borderStyle: "none",
            borderWidth: "393px",
            borderRadius: "545px",
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            opacity: "1"
          } : size === "sm" ? {
            filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))"
          } : { 
            lineHeight: "11.9", 
            letterSpacing: "0.005em" 
          }}
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
