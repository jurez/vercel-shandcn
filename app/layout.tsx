import type React from "react"
import { Roboto } from "next/font/google"
import "./globals.css"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}

export const metadata = {
  title: "Real-Time Odds Animation",
  description: "A web application featuring interactive and dynamic odds animations",
    generator: 'v0.dev'
}
