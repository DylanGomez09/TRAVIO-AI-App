"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export default function LandingPage() {
  const t = useTranslations("landing")
  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100 shrink-0">
        <button className="text-[#092634]">☰</button>
        <span className="text-[#092634] text-lg tracking-widest uppercase">
          Travio AI
        </span>
        <Link href="/login" className="text-[#092634]">👤</Link>
      </header>

      {/* Hero */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left */}
        <div className="flex-1 flex flex-col justify-center px-8 xl:px-12 py-8">
          <span className="inline-flex items-center gap-2 text-xs text-[#092634] border border-gray-200 rounded-full px-3 py-1 w-fit mb-6">
            {t("badge")}
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold text-[#092634] leading-tight mb-2">
            {t("title1")}
          </h1>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#FF6E42] leading-tight mb-6">
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