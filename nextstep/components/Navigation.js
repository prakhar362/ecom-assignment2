"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const isLogin = pathname === "/login"
  const isDashboard = pathname === "/jobs" || pathname === "/employer/dashboard" || pathname === "/superadmin/dashboard"
  const isDoc = pathname === "/terms" || pathname === "/privacy"

  if (isDashboard || isDoc) return null

  if (isLogin) {
    // Minimal Header for Login Page
    return (
      <header className="absolute top-0 left-0 w-full z-50 p-6 sm:p-10 pointer-events-none">
        <div className="container mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 pointer-events-auto">
            <span className="text-3xl font-black text-white tracking-tight drop-shadow-md">NextStep</span>
          </Link>
        </div>
      </header>
    )
  }

  // Full Header for other pages
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-indigo-600 tracking-tight">NextStep</span>
        </Link>

        {/* Centered Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          <Link href="/#features" className="hover:text-indigo-600 transition-colors">Features</Link>
          <Link href="/#testimonials" className="hover:text-indigo-600 transition-colors">Testimonials</Link>
          <Link href="/#pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
          <Link href="#" className="hover:text-indigo-600 transition-colors">Contact Us</Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors mr-2">
            Log in
          </Link>
          <Link href="/login" className="hidden md:inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-transform hover:scale-105 active:scale-95">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  const pathname = usePathname()
  if (pathname === "/login" || pathname === "/jobs" || pathname === "/employer/dashboard" || pathname === "/superadmin/dashboard" || pathname === "/terms" || pathname === "/privacy") return null;

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-black text-white mb-4 tracking-tight">NextStep</h3>
          <p className="text-sm leading-relaxed max-w-xs">Revolutionizing the way ambitious talent connects with world-class engineering teams globally.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-200 mb-4 uppercase tracking-wider text-xs">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
            <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing Options</Link></li>
            <li><Link href="/#testimonials" className="hover:text-white transition-colors">Customer Stories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-200 mb-4 uppercase tracking-wider text-xs">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-200 mb-4 uppercase tracking-wider text-xs">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <span>&copy; {new Date().getFullYear()} NextStep Technologies Inc. All rights reserved.</span>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-white">Twitter</span>
          <span className="cursor-pointer hover:text-white">LinkedIn</span>
          <span className="cursor-pointer hover:text-white">GitHub</span>
        </div>
      </div>
    </footer>
  )
}
