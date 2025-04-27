import "./globals.css"
import type React from "react"
import DebugInfo from "@/components/debug-info"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background-dark text-text-light">
        {children}
        <DebugInfo />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
