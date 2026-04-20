# AUAPW Theme System & Design Documentation

## Overview
This document details the comprehensive theme system for **allusedautoparts.world (AUAPW)**, ensuring visual and functional consistency across all pages and interactive components.

---

## 1. COLOR SYSTEM

### Primary Colors
- **Primary (Brand Red)**: `#DC143C` - Used for accents, badges, hover states
- **Primary Light**: `#E63946` - Lighter variant for secondary accents
- **Primary Dark**: `#8B0000` - Darker variant for active states

### Neutral Colors (Semantic Design Tokens)
- **Background**: `#0a0a0f` - Main dark background
- **Card**: `#12121a` - Card/elevated surface color  
- **Secondary**: `#1a1a25` - Secondary surface
- **Foreground**: `#ffffff` - Primary text color
- **Muted Foreground**: `#a0a0a8` - Secondary text color
- **Border**: `#2a2a35` - Border color (30% opacity on components)

### Accent Colors
- **Green**: `#22c55e` - Success, positive actions (Call buttons)
- **Amber**: `#f59e0b` - Warning, attention (Quote request buttons)
- **Blue**: `#3b82f6` - Information (Search buttons)

### Usage Guidelines
- Maximum **3-5 colors total** in any single page design
- Always use design tokens from globals.css instead of hardcoded colors
- Maintain minimum 4.5:1 contrast ratio for accessibility
- Never mix opposing temperatures (hot/cold) in gradients

---

## 2. TYPOGRAPHY SYSTEM

### Font Families
- **Body/UI**: `Geist` (via Next.js font optimization)
  - Regular weight: 400
  - Medium weight: 500
  - Semibold weight: 600
  - Bold weight: 700

- **Headings**: `Geist` (same as body for consistency)
  - Sizes: `text-sm` (0.875rem) to `text-4xl` (2.25rem)
  - Weights: 600, 700, 900

- **Code/Monospace**: `Geist Mono`
  - Used for technical specs and pricing displays

### Typography Rules
- **Line height**: `1.4-1.6` for body text (use `leading-relaxed` or `leading-6`)
- **Letter spacing**: `0.04em` for buttons, `0.3em` for uppercase labels
- **Minimum font size**: 14px for body text (accessibility standard)
- **Text balance**: Use `text-balance` on titles for optimal line breaks

### Hierarchy Example
```
H1: 3.5rem (clamp), bold 700, serif-style
H2: 2.25rem, bold 700
H3: 1.5rem, bold 600
Body: 1rem, regular 400, line-height 1.5
Caption: 0.75rem, regular 400, muted-foreground
```

---

## 3. BUTTON SYSTEM

### Button Classes (Defined in globals.css)

#### Primary Buttons: `.auapw-btn`
**Base style**: Chrome-framed glossy pill button with 3D beveled borders
- Padding: `0.875rem 1.75rem`
- Border radius: `9999px` (full pill)
- Letter spacing: `0.04em`
- Transition: `0.25s cubic-bezier(0.4, 0, 0.2, 1)`
- **Hover effect**: `translateY(-2px) scale(1.02)` with enhanced shadow
- **Active effect**: `scale(0.98)` pressed appearance

#### Color Variants
- `.auapw-btn-blue` - Search/Find actions - `#3b82f6` base
- `.auapw-btn-green` - Call/Phone actions - `#22c55e` base
- `.auapw-btn-amber` - Quote/Form actions - `#f59e0b` base
- `.auapw-btn-red` - Delete/Dangerous actions - `#ef4444` base
- `.auapw-btn-teal` - Special actions - `#06b6d4` base

#### Size Variants
- `.auapw-btn-xs` - Extra small (form controls)
- `.auapw-btn-sm` - Small (secondary buttons)
- `.auapw-btn` - Default (standard buttons)
- `.auapw-btn-lg` - Large (primary CTAs)
- `.auapw-btn-xl` - Extra large (hero CTAs)

#### Metallic Buttons: `.btn-led`
**Style**: Dark metallic LED button with scan-line shimmer animation
- Background: Brushed dark gunmetal gradient
- Padding: Responsive sizing
- Animation: 3.5s scan-line shimmer infinite
- **Use case**: Circular call buttons, specialized CTAs

#### Metal/3D Buttons: `.metal-btn`
**Style**: Beveled metal buttons with depth effect
- **Use case**: Embossed card interactions, secondary CTAs

---

## 4. COMPONENT PATTERNS

### Card Component (`.embossed-col`)
```
- Background: Card color with 20% opacity overlay
- Border: 1px solid border/50 opacity
- Padding: 1.5rem - 2rem
- Border radius: 0.5rem - 1.5rem
- Box shadow: Embossed 3D effect
- Hover: Border opacity increases to 100%
```
**Used for**: Product cards, specification sections, feature boxes

### Hero Headers
- Full-width gradient background
- Metal line separator at top/bottom
- Breadcrumbs navigation (small text)
- Title with color-coded accent (Acura = Red)
- Supporting description text
- Trust badges with icons

### CTA Sections
Layout pattern for "Don't see the right part?" sections:
- Two-column grid on desktop (1 column mobile)
- **Left**: Circular embossed phone button (`.btn-led` style)
- **Right**: Blue rounded quote request card
- Both with animations and hover effects

---

## 5. LAYOUT & RESPONSIVE DESIGN

### Layout Methods (Priority Order)
1. **Flexbox** - Most layouts (`flex items-center justify-between`)
2. **CSS Grid** - Complex 2D layouts (`grid grid-cols-3 gap-4`)
3. **Spacing** - Use gap classes, never mix margin/padding with gap

### Responsive Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
1. Design base styles for mobile (320px+)
2. Add `md:` or `lg:` prefixes for desktop enhancements
3. Test at: 375px, 768px, 1024px, 1440px

### Common Patterns
```
# Two-column grid that stacks on mobile
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4

# Flex row that wraps on mobile
flex flex-wrap gap-4 justify-center

# Max width container with padding
mx-auto max-w-[1280px] px-6
```

---

## 6. INTERACTIVE STATES

### Button States
| State | Effect |
|-------|--------|
| **Normal** | Base styling with subtle shadow |
| **Hover** | `translateY(-2px)`, enhanced glow, border brightens |
| **Active/Press** | `scale(0.98)`, reduced shadow, pressed appearance |
| **Focus** | `ring-2 ring-primary/50` (keyboard accessible) |
| **Disabled** | `opacity-50`, `cursor-not-allowed`, no hover effects |

### Card States
| State | Effect |
|-------|--------|
| **Normal** | Border 50% opacity, subtle shadow |
| **Hover** | Border brightens, shadow increases, child text color shifts |
| **Active** | Border 100% opacity, enhanced depth |

### Form States
| State | Effect |
|-------|--------|
| **Focus** | `ring-2 ring-primary/50`, border brightens |
| **Error** | `border-red-500/50`, error text in red |
| **Success** | `border-green-500/50`, success icon displays |

---

## 7. ANIMATION & TRANSITIONS

### Global Transitions
- Standard: `transition-all 0.25s cubic-bezier(0.4, 0, 0.2, 1)`
- Hover effects: 200-250ms duration
- Page transitions: 300-500ms duration

### Micro-interactions
- **Button hover**: `translateY(-2px) scale(1.02)` (lift effect)
- **Card hover**: Border brightens, shadow intensifies
- **Icon animations**: Scale or rotate on hover (50-100ms)
- **Shimmer effect**: `.btn-led::after` animation (3.5s loop)

### Disabled Animations
- No animations on disabled states
- `pointer-events: none` for disabled elements

---

## 8. DESIGN TOKENS (CSS Variables in globals.css)

```css
:root {
  /* Colors */
  --background: #0a0a0f;
  --foreground: #ffffff;
  --card: #12121a;
  --card-foreground: #ffffff;
  --primary: #DC143C;
  --primary-foreground: #ffffff;
  --secondary: #1a1a25;
  --muted: #2a2a35;
  --muted-foreground: #a0a0a8;
  --border: #2a2a35;
  
  /* Sizing */
  --radius: 0.5rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow: 0 4px 12px rgba(0,0,0,0.15);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.25);
}
```

---

## 9. ACCESSIBILITY REQUIREMENTS

### WCAG 2.1 Compliance
- **Color contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus indicators**: Always visible (avoid `outline: none` without replacement)
- **Semantic HTML**: Use `<button>`, `<a>`, `<form>`, `<main>`, etc.
- **ARIA labels**: Add when visual content isn't sufficient
- **Alt text**: Descriptive alt text for all meaningful images
- **Screen reader text**: Use `.sr-only` Tailwind class for screen-reader-only content

### Mobile Accessibility
- Minimum touch target: 44x44px (buttons, links)
- Text size: Minimum 16px on mobile (avoid zooming)
- Sufficient spacing: Gap of at least 8px between interactive elements

---

## 10. ACURA PARTS PAGES - SPECIFIC IMPLEMENTATION

### `/makes/acura/parts` (Listing Page)
**Theme elements**:
- Hero header with Acura red accent (`#e63946`)
- Full search + category filters
- Part cards with product images and prices
- "Browse by category" section at bottom
- Final CTA with `.auapw-btn-amber` and `.auapw-btn-green` buttons

### `/makes/acura/parts/[part]` (Detail Page)
**Theme elements**:
- Breadcrumb navigation
- Hero section with pricing badge
- Trust badges (warranty, shipping, response time)
- Product specifications table
- FAQ accordion sections
- Related parts section
- **Special section**: "Don't see the right part?" with:
  - Circular embossed phone button (`.btn-led` style)
  - Blue rounded quote request card
  - Hover animations on both
- Final CTA section

### Google Merchant Center Feed
- Generated XML and CSV feeds at `/public/feeds/acura-gmc-feed.*`
- 24 product categories with OEM pricing and warranty info
- Automatic 15% markup applied to base prices

---

## 11. VALIDATION CHECKLIST

Before deploying any page to production:

- [ ] All buttons use `.auapw-btn` or appropriate variant class
- [ ] Color scheme uses only 3-5 total colors
- [ ] Typography follows hierarchy rules
- [ ] Responsive design tested at 375px, 768px, 1024px, 1440px
- [ ] All images have descriptive alt text
- [ ] Focus states visible on keyboard navigation
- [ ] Contrast ratio minimum 4.5:1 on all text
- [ ] Animations disabled for `prefers-reduced-motion`
- [ ] Forms include proper ARIA labels and error handling
- [ ] Mobile touch targets minimum 44x44px
- [ ] Page build completes without TypeScript errors
- [ ] All external links open in new tab if appropriate

---

## 12. QUICK REFERENCE

### Common Component Usage

**Colorful CTA buttons**:
```tsx
<Link href="/quote" className="auapw-btn auapw-btn-amber">
  <MessageSquare className="w-4 h-4" />
  <span>REQUEST FREE QUOTE</span>
</Link>

<a href="tel:(888) 818-5001" className="auapw-btn auapw-btn-green">
  <Phone className="w-4 h-4" />
  <span>(888) 818-5001</span>
</a>
```

**Circular phone button**:
```tsx
<a href="tel:(888) 818-5001" className="btn-led">
  <Phone className="w-8 h-8" />
  <span>CALL (888) 818-5001</span>
</a>
```

**Card with badges**:
```tsx
<div className="embossed-col rounded-lg p-5">
  <Shield className="w-5 h-5 text-primary" />
  <p className="font-bold">6-Month Warranty</p>
  <p className="text-xs text-muted-foreground">Full coverage</p>
</div>
```

---

## Contact & Support
For theme updates or questions, refer to `/app/globals.css` for authoritative styling definitions.
