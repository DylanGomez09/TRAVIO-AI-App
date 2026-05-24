import type { Metadata } from "next"
import { Literata, Manrope } from "next/font/google"
import "./globals.css"

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Travio",
  description: "Smart Travel, Zero Stress",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${literata.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  )
}