import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Travio AI — Smart Travel, Zero Stress",
    template: "%s | Travio AI",
  },
  description:
    "Your personal AI travel concierge. Discover curated itineraries, smart recommendations, and zero-stress travel planning powered by artificial intelligence.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", url: "/icon.png", type: "image/png", sizes: "192x192" },
  ],
  openGraph: {
    type: "website",
    siteName: "Travio AI",
    title: "Travio AI — Smart Travel, Zero Stress",
    description:
      "Your personal AI travel concierge. Discover curated itineraries, smart recommendations, and zero-stress travel planning powered by artificial intelligence.",
    images: [{ url: "/opengraph-image.png", width: 192, height: 192 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travio AI — Smart Travel, Zero Stress",
    description:
      "Your personal AI travel concierge. Discover curated itineraries, smart recommendations, and zero-stress travel planning powered by artificial intelligence.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
