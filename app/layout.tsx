import "./globals.css"
import type React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background-dark text-text-light">{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
