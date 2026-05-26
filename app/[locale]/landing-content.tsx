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
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm text-[#092634] hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">👤</span>
              <span>{loginT("submit")}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex">
        {/* Left */}
        <div
          className="flex-1 flex flex-col justify-center py-8 min-w-0"
          style={{ paddingLeft: "max(2rem, calc((100vw - 1200px) / 2 + 2rem))", paddingRight: "2rem" }}
        >
          <span className="inline-flex items-center gap-2 text-xs text-[#092634] border border-gray-200 rounded-full px-3 py-1 w-fit mb-6">
            {t("badge")}
          </span>

          <h1 className="text-5xl lg:text-6xl font-black text-[#092634] leading-none mb-1">
            {t("title1")}
          </h1>
          <h1 className="text-5xl lg:text-6xl font-black text-[#FF6E42] leading-none mb-8">
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
          <div className="flex gap-8 mt-12">
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
        <div className="relative bg-[#092634] overflow-hidden w-[45%] max-w-[400px] shrink-0">
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1000&q=80"
            alt={t("altImage")}
            className="w-full h-full object-cover opacity-90"
          />
          {/* Card flotante */}
          <div className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-lg p-4 flex items-start gap-3 w-[200px]">
            <div className="bg-[#092634] rounded-full p-2 mt-0.5">
              <span className="text-white text-xs">✈</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#092634]">
                {t("cardTitle")}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {t("cardDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
