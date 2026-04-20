"use client"

import Link from "next/link"
import { Menu, X, Zap, ShoppingCart, Heart, Home, ChevronDown, Globe, MessageSquare, Phone } from "lucide-react"
import { useState } from "react"
import { BrandWordmark } from "@/components/brand-wordmark"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { useCartStore } from "@/lib/stores/cart-store"
import { useWishlistStore } from "@/lib/stores/wishlist-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartItems = useCartStore((state) => state.getTotalItems())
  const wishlistCount = useWishlistStore((state) => state.getCount())

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Used Parts", href: "/parts" },
    { label: "Engines", href: "/used-engines" },
    { label: "Transmissions", href: "/used-transmissions" },
  ]

  const allPages = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Used Parts", href: "/parts" },
    { label: "Used Engines", href: "/used-engines" },
    { label: "Used Transmissions", href: "/used-transmissions" },
    { label: "All Makes", href: "/makes" },
    { label: "Inventory", href: "/inventory" },
    { label: "Search", href: "/search" },
    { label: "Get a Quote", href: "/quote" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Cart", href: "/cart" },
    { label: "Compare Parts", href: "/comparison" },
  ]

  const partsCategories = [
    { label: "Engine Parts", href: "/used-engines-parts" },
    { label: "Transmission Parts", href: "/used-transmissions-parts" },
    { label: "Drivetrain Parts", href: "/used-drivetrain-parts" },
    { label: "Electrical Parts", href: "/used-electrical-parts" },
    { label: "Cooling & Climate", href: "/used-cooling-parts" },
    { label: "Brakes & Safety", href: "/used-brakes-parts" },
    { label: "Suspension & Steering", href: "/used-suspension-parts" },
    { label: "Body & Interior", href: "/used-body-parts" },
    { label: "Exhaust System", href: "/used-exhaust-parts" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* ── Animated premium banner with scrolling text ────────────────────────── */}
      <div className="header-boss-banner">
        <div className="header-boss-banner-scroll">
          <div className="header-boss-banner-item">
            <Zap className="w-3 h-3" />
            <span>2,000+ Verified Yards</span>
          </div>
          <div className="header-boss-banner-item">
            <Zap className="w-3 h-3" />
            <span>Free Shipping All Parts</span>
          </div>
          <div className="header-boss-banner-item">
            <Zap className="w-3 h-3" />
            <span>24/7 Customer Support</span>
          </div>
          <div className="header-boss-banner-item">
            <Zap className="w-3 h-3" />
            <span>2,000+ Verified Yards</span>
          </div>
          <div className="header-boss-banner-item">
            <Zap className="w-3 h-3" />
            <span>Free Shipping All Parts</span>
          </div>
        </div>
      </div>

      {/* ── Premium glassmorphic header ────────────────────────── */}
      <div className="header-boss-container">
        <div className="header-boss-bg" />

        <div className="mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 flex items-center h-full justify-between gap-2 sm:gap-4 relative z-10">

          {/* Logo + Wordmark — premium left anchor */}
          <Link href="/" className="flex items-center gap-4 shrink-0 group header-boss-logo-group">
            <div className="header-boss-logo-ring">
              <Logo size="md" priority showGlow />
            </div>
            <div className="flex flex-col justify-center pt-[2px]">
              <BrandWordmark size="nav" showSubline />
            </div>
          </Link>

          {/* Center — embossed typography navigation (desktop only) */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="header-boss-nav-text group relative"
              >
                <span className="header-boss-nav-label">{item.label}</span>
                <span className="header-boss-nav-glow" />
              </Link>
            ))}

            {/* Parts Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="header-boss-nav-text group relative flex items-center gap-1.5 outline-none">
                <span className="header-boss-nav-label">Parts</span>
                <ChevronDown className="w-3 h-3 opacity-50 transition-transform group-data-[state=open]:rotate-180" />
                <span className="header-boss-nav-glow" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 bg-card/95 backdrop-blur-xl border-border/50">
                <DropdownMenuLabel className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  Parts by Category
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {partsCategories.map((cat) => (
                  <DropdownMenuItem key={cat.href} asChild>
                    <Link
                      href={cat.href}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                      {cat.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/parts"
                    className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-primary"
                  >
                    View All Parts
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Review All Website Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="header-boss-nav-text group relative flex items-center gap-1.5 outline-none">
                <Globe className="w-3.5 h-3.5 opacity-70" />
                <span className="header-boss-nav-label">All Pages</span>
                <ChevronDown className="w-3 h-3 opacity-50 transition-transform group-data-[state=open]:rotate-180" />
                <span className="header-boss-nav-glow" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 bg-card/95 backdrop-blur-xl border-border/50">
                <DropdownMenuLabel className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  Review All Website
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allPages.map((page) => (
                  <DropdownMenuItem key={page.href} asChild>
                    <Link
                      href={page.href}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                      {page.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right — CTA, phone, menu */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Cart indicator */}
            <Link href="/cart" className="relative hidden sm:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 transition-colors" title="Cart">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {cartItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* Desktop: Premium GET QUOTE button (hidden on mobile) */}
            <Link href="/quote" className="hidden sm:flex auapw-btn auapw-btn-amber auapw-btn-sm">
              <MessageSquare className="w-4 h-4" />
              <span>Free Quote</span>
            </Link>

            {/* Mobile: Phone and Email icons (shown only on mobile) */}
            <div className="flex items-center gap-2 sm:hidden">
              <a href="tel:8888185001" className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-500/20 border border-green-500/40 hover:bg-green-500/30 transition-colors">
                <Phone className="w-4 h-4 text-green-400" />
              </a>
              <a href="mailto:support@auapw.org" className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-500/40 hover:bg-teal-500/30 transition-colors">
                <MessageSquare className="w-4 h-4 text-teal-400" />
              </a>
            </div>

            {/* Mobile menu toggle - larger touch target for accessibility */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Bottom shimmer rule */}
        <div className="header-boss-rule" />
      </div>

      {/* ── Mobile drawer ──────────────────────── */}
      {mobileOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="header-boss-mobile-drawer z-50">
            <div className="px-4 py-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
              {/* Main Navigation */}
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 transition-colors text-sm font-medium"
                  >
                    {item.icon && <item.icon className="w-4 h-4 opacity-70" />}
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-white/10 my-2" />

              {/* Parts Categories Section */}
              <div className="flex items-center gap-2 px-2">
                <span className="text-xs font-bold tracking-wider uppercase text-primary">Parts by Category</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {partsCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2 text-xs rounded-md bg-primary/10 hover:bg-primary/20 active:bg-primary/30 transition-colors truncate text-center text-primary"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-white/10 my-2" />

              {/* Review All Website Section */}
              <div className="flex items-center gap-2 px-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold tracking-wider uppercase text-blue-400">All Pages</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {allPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2 text-xs rounded-md bg-white/5 hover:bg-white/10 active:bg-white/15 transition-colors truncate text-center"
                  >
                    {page.label}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-white/10 my-2" />

              {/* Quick actions + Theme */}
              <div className="grid grid-cols-3 gap-2">
                <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium">
                  <ShoppingCart className="w-4 h-4" />
                  {cartItems > 0 ? cartItems : "Cart"}
                </Link>
                <div className="flex items-center justify-center px-3 py-2.5 rounded-lg bg-white/5">
                  <ThemeToggle />
                </div>
              </div>

              {/* Contact + CTA */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <a href="tel:8888185001" className="auapw-btn auapw-btn-green auapw-btn-sm">
                  <Phone className="w-4 h-4" />
                  <span>(888) 818-5001</span>
                </a>
                <Link href="/quote" onClick={() => setMobileOpen(false)} className="auapw-btn auapw-btn-amber auapw-btn-sm">
                  <MessageSquare className="w-4 h-4" />
                  <span>Free Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
