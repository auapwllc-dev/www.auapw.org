# AUAPW Theme Visual Reference Guide

## Color Palette

### Primary Colors
```
Red (Brand)          #DC143C    ██████ (Acura, accents, badges)
Red Light            #E63946    ██████ (Hover states)
Red Dark             #8B0000    ██████ (Active states)
```

### Neutral Colors
```
Background           #0a0a0f    ██████ (Main surface)
Card                 #12121a    ██████ (Elevated surface)
Secondary            #1a1a25    ██████ (Tertiary surface)
Foreground           #ffffff    ██████ (Text - white)
Muted Foreground     #a0a0a8    ██████ (Secondary text)
Border               #2a2a35    ██████ (Dividers, 50% opacity)
```

### Action Colors
```
Green (Success)      #22c55e    ██████ (Call buttons, approval)
Amber (Warning)      #f59e0b    ██████ (Quote, important)
Blue (Info)          #3b82f6    ██████ (Search, discovery)
Red (Danger)         #ef4444    ██████ (Delete, negative)
Teal (Special)       #06b6d4    ██████ (Unique actions)
```

---

## Button Styles

### 1. Chrome-Framed Pill Button (`.auapw-btn`)
```
Shape:     Rounded pill (border-radius: 9999px)
Size:      0.875rem × 1.75rem padding
Shadow:    Multi-layer chrome frame effect
Color:     Varies by variant
Motion:    Hover: translateY(-2px) scale(1.02)
```

**Color Variants:**
- `.auapw-btn-amber` → Golden (Quote, forms)
- `.auapw-btn-green` → Green (Phone, calls)
- `.auapw-btn-blue` → Blue (Search, find)
- `.auapw-btn-red` → Red (Delete, danger)
- `.auapw-btn-teal` → Cyan (Special)

**Size Variants:**
- `.auapw-btn-xs` → Extra small (form controls)
- `.auapw-btn-sm` → Small (secondary)
- `.auapw-btn` → Default (standard)
- `.auapw-btn-lg` → Large (primary)
- `.auapw-btn-xl` → Extra large (hero)

### 2. Metallic LED Button (`.btn-led`)
```
Shape:     Perfect circle (border-radius: 999px)
Style:     Brushed dark gunmetal with 3D effect
Animation: Scan-line shimmer (3.5s loop)
Shadow:    Deep multi-layer shadow (metallic appearance)
Motion:    Hover glow intensifies
```

### 3. Metal 3D Button (`.metal-btn`)
```
Style:     Beveled metal with depth
Finish:    Polished appearance
Shadow:    Embossed inset effect
Motion:    Subtle scale on hover
```

---

## Component Examples

### Hero Section Layout
```
┌─────────────────────────────────────┐
│ Metal Line Separator                │
│─────────────────────────────────────│
│                                     │
│ [Icon] Category Label               │
│                                     │
│ [Logo] │  Main Title (Red Accent)   │
│        │  Descriptive subtitle      │
│        │  with multiple lines       │
│                                     │
│ [Badge] [Badge] [Badge] [Badge]    │
│─────────────────────────────────────│
│ Metal Line Separator                │
└─────────────────────────────────────┘
```

### Product Card Layout
```
┌────────────────────────┐
│ [Category] [OEM Badge] │
│                        │
│   [Product Image]      │
│    (with USED WM)      │
│                        │
│ Product Title          │
│ Brief Description      │
│                        │
│ Compatible: TLX RDX... │
│                        │
│ From $2,499  Save 40%  │
│ View Details →         │
└────────────────────────┘
```

### CTA Hero Section - "Don't See The Right Part?"
```
┌──────────────────────────────────────────────────┐
│  DON'T SEE THE RIGHT PART?                       │
│  Our team can source from additional yards      │
│  Call or request a quote for immediate assist. │
│                                                  │
│  [Circular Phone]          [Blue Quote Card]    │
│   Call (888) 818-5001      Request              │
│   (Metallic effect)        Free Quote           │
│   Glowing accents          Premium Industry     │
└──────────────────────────────────────────────────┘
```

### Trust Badges Row
```
[Shield Icon] 6-Month Warranty | [Truck Icon] Free Shipping | [Clock Icon] 24-HR Response
```

---

## Typography Hierarchy

### Heading 1 (Hero Titles)
- Size: 3.5rem (responsive clamp)
- Weight: Bold 700
- Color: Foreground white
- Example: "Used Acura Engines"

### Heading 2 (Section Titles)
- Size: 2.25rem
- Weight: Bold 700
- Color: Foreground white
- Example: "Product Specifications"

### Heading 3 (Subsections)
- Size: 1.5rem
- Weight: Bold 600
- Color: Foreground white
- Example: "Compatible Models"

### Body Text
- Size: 1rem
- Weight: Regular 400
- Color: Foreground white
- Line-height: 1.5 (relaxed)
- Example: "Every used Acura engine..."

### Small Text / Captions
- Size: 0.875rem
- Weight: Regular 400
- Color: Muted foreground
- Example: "Starting price" labels

### Labels & Badges
- Size: 0.75rem
- Weight: Bold 600
- Letter-spacing: 0.3em
- Color: Varies
- Example: "OEM QUALITY PARTS"

---

## Spacing System

### Standard Gaps (Flexbox)
```
gap-2   → 0.5rem (8px)
gap-3   → 0.75rem (12px)
gap-4   → 1rem (16px)
gap-6   → 1.5rem (24px)
gap-8   → 2rem (32px)
```

### Padding Scales
```
p-4  → 1rem (all sides)
p-6  → 1.5rem (all sides)
p-8  → 2rem (all sides)
px-6 → 1.5rem (left-right)
py-8 → 2rem (top-bottom)
```

### Margin Scales
```
mb-4  → margin-bottom: 1rem
mt-6  → margin-top: 1.5rem
mx-auto → center horizontally
```

---

## Responsive Breakpoints

### Mobile-First Approach
```
Default (0px+)         → Mobile styling
sm: 640px              → Small enhancements
md: 768px              → Tablet layout
lg: 1024px             → Desktop layout
xl: 1280px             → Large desktop
2xl: 1536px            → Extra large
```

### Common Patterns
```
grid grid-cols-1
md:grid-cols-2
lg:grid-cols-4

flex flex-col
md:flex-row

w-full
md:w-1/2
lg:w-1/3
```

---

## Animation Specifications

### Button Hover Animation
```
Transform:  translateY(-2px) scale(1.02)
Duration:   0.25s
Easing:     cubic-bezier(0.4, 0, 0.2, 1)
Shadow:     Enhanced with +4px offset increase
```

### Button Active Animation
```
Transform:  scale(0.98)
Duration:   Instant (0.1s)
Shadow:     Reduced (pressed appearance)
```

### Card Hover Animation
```
Border:     Opacity 50% → 100%
Shadow:     Enhanced +2px depth
Color:      Text brightens on hover
Duration:   0.3s transition
```

### Shimmer Effect (LED button)
```
Animation:  Horizontal scan-line
Duration:   3.5s
Direction:  Left to right, looping
Width:      45% of button
Opacity:    15% peak brightness
```

---

## States Reference

| State | Button | Card | Input |
|-------|--------|------|-------|
| **Normal** | Base shadow | Border 50% opacity | Border light |
| **Hover** | Lift effect, enhanced glow | Border brightens | Ring highlight |
| **Active** | Scale 98%, pressed | Border 100% opacity | Focus ring |
| **Focus** | Ring 2px primary | Border highlighted | Ring 2px primary |
| **Disabled** | Opacity 50%, no hover | Opacity 50% | Opacity 50%, no interaction |

---

## Accessibility Checklist

✅ Minimum 4.5:1 contrast ratio on all text
✅ Focus indicators always visible (ring-2 on buttons)
✅ Semantic HTML: `<button>`, `<a>`, `<main>`, `<nav>`
✅ ARIA labels on complex components
✅ Alt text on all meaningful images
✅ Screen reader text with `.sr-only` class
✅ 44x44px minimum touch targets
✅ No animations for `prefers-reduced-motion`
✅ Keyboard navigation fully supported
✅ Skip to content links available

---

## File References

**CSS Definitions**: `/app/globals.css`
- Lines 918-1022: `.btn-led` and related classes
- Lines 3603-3628: `.metal-btn` styling
- Lines 3717-4166: `.auapw-btn` and all variants

**Design Tokens**: `/app/globals.css` (top of file)
- CSS custom properties for colors
- Semantic design tokens
- Shadow and effect definitions

**Component Library**: `/components/`
- `navbar.tsx` - Top navigation
- `footer.tsx` - Footer with links
- `home/cta-section.tsx` - CTA component example

**Documentation**: 
- `THEME_SYSTEM.md` - Complete reference
- `IMPLEMENTATION_SUMMARY.md` - Deployment info

---

## Quick Copy-Paste Examples

### CTA Button Pair (Quote + Call)
```tsx
<div className="flex flex-wrap gap-4 justify-center">
  <Link href="/quote" className="auapw-btn auapw-btn-amber">
    <MessageSquare className="w-4 h-4" />
    <span>REQUEST FREE QUOTE</span>
  </Link>
  <a href="tel:(888) 818-5001" className="auapw-btn auapw-btn-green">
    <Phone className="w-4 h-4" />
    <span>(888) 818-5001</span>
  </a>
</div>
```

### Trust Badge
```tsx
<div className="embossed-col rounded-lg p-5 flex items-start gap-3.5">
  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
    <Shield className="w-5 h-5 text-primary" />
  </div>
  <div>
    <p className="text-[13px] font-bold">6-Month Warranty</p>
    <p className="text-xs text-muted-foreground">Full coverage and protection</p>
  </div>
</div>
```

### Product Card
```tsx
<Link href="/makes/acura/parts/engine" className="embossed-col rounded-xl p-4">
  <Image src="/engine.jpg" alt="Engine" width={200} height={200} />
  <h3 className="font-semibold mb-2">Used Acura Engine</h3>
  <p className="text-xs text-muted-foreground mb-3">High-quality OEM part</p>
  <div className="flex justify-between">
    <span className="font-bold text-primary">From $2,499</span>
    <Package className="w-4 h-4 text-muted-foreground" />
  </div>
</Link>
```

---

**Last Updated**: 2026-04-21
**Status**: ✅ Complete & Production Ready
