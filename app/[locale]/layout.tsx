import type { Metadata } from "next"
import { Literata, Manrope } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import Footer from "@/app/components/Footer"
import "../globals.css"

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })

  return {
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      locale: locale === "es" ? "es_ES" : "en_US",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      siteName: t("siteName"),
    },
    twitter: {
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: "seo" })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Travio AI",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    description: t("defaultDescription"),
    knowsAbout: "AI-powered travel planning and personalized itineraries",
    slogan: "Smart Travel, Zero Stress",
  }

  return (
    <html lang={locale}>
      <body className={`${literata.variable} ${manrope.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            {children}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
