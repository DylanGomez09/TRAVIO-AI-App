"use client"

import { useTranslations, useLocale } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"

export default function LandingContent() {
  const t = useTranslations("landing")
  const loginT = useTranslations("login")
  const locale = useLocale()
  const pathname = usePathname()
  const otherLocale = locale === "en" ? "es" : "en"

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 shrink-0">
        <div className="max-w-[1200px] mx-auto px-8 py-4 flex items-center justify-between">
          <span className="text-[#092634] text-lg tracking-widest uppercase">
            Travio AI
          </span>
          <div className="flex items-center gap-4">
            <Link
              href={pathname}
              locale={otherLocale}
              className="text-xs font-medium text-gray-400 hover:text-[#092634] transition-colors uppercase tracking-wider"
            >
              {otherLocale === "es" ? "ES" : "EN"}
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 p-2 md:px-4 md:py-2 border border-gray-200 rounded-full text-sm text-[#092634] hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">👤</span>
              <span className="hidden md:inline">{loginT("submit")}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left */}
        <div
          className="flex-1 flex flex-col justify-center py-8 min-w-0"
          style={{ paddingLeft: "max(2rem, calc((100vw - 1200px) / 2 + 2rem))", paddingRight: "2rem" }}
        >
          <span className="inline-flex items-center gap-2 text-xs text-[#092634] border border-gray-200 rounded-full px-3 py-1 w-fit mb-6">
            {t("badge")}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#092634] leading-none mb-1">
            {t("title1")}
          </h1>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#FF6E42] leading-none mb-6 md:mb-8">
            {t("title2")}
          </h1>

          <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-md">
            {t("subtitle")}
          </p>

          <Link href="/register"
            className="inline-flex items-center gap-2 bg-[#FF6E42] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-[#e85e35] transition-colors w-fit">
            {t("cta")}
          </Link>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-10 md:mt-12">
            <div>
              <p className="text-xl font-semibold text-[#092634]">10k+</p>
              <p className="text-xs text-gray-400">{t("stat1")}</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-[#092634]">24/7</p>
              <p className="text-xs text-gray-400">{t("stat2")}</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-[#092634]">AI</p>
              <p className="text-xs text-gray-400">{t("stat3")}</p>
            </div>
          </div>
        </div>

        {/* Right — imagen */}
        <div className="relative bg-[#092634] overflow-hidden w-full md:w-[45%] md:max-w-[400px] md:shrink-0 h-[300px] md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1000&q=80"
            alt={t("altImage")}
            className="w-full h-full object-cover opacity-90"
          />
          {/* Card flotante */}
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white rounded-2xl shadow-lg p-3 md:p-4 flex items-start gap-3 w-[150px] md:w-[200px]">
            <div className="bg-[#092634] rounded-full p-1.5 md:p-2 mt-0.5">
              <span className="text-white text-[10px] md:text-xs">✈</span>
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-semibold text-[#092634]">
                {t("cardTitle")}
              </p>
              <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">
                {t("cardDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
