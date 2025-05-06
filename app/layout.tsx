import "./globals.css"
import type React from "react"
import Link from "next/link"
import { Briefcase, Mail, User, Sparkles } from "lucide-react"
import ThemeCustomizer from "@/components/theme-customizer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background-dark text-text-light">
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center h-16">
              <div className="flex items-center space-x-2 md:space-x-6">
                <NavItem href="/about" icon={<User size={18} />} label="About" />
                <NavItem href="/skills" icon={<Sparkles size={18} />} label="Skills" />
                <NavItem href="/experience" icon={<Briefcase size={18} />} label="Experience" />
                <NavItem href="/contact" icon={<Mail size={18} />} label="Contact" />
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <ThemeCustomizer />
      </body>
    </html>
  )
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center px-3 py-2 rounded-full transition-colors text-gray-400 hover:text-accent hover:bg-white/5"
    >
      <span className="mr-2">{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </Link>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
