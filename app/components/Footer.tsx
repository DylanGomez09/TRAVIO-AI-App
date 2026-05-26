"use client";

import { useTranslations, useLocale } from "next-intl";

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  );
}

const linkClass =
  "text-gray-400 hover:text-[#FF6E42] transition-colors duration-200 text-sm";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-[#f9f9f9] mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Upper */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <span className="text-[#092634] text-lg font-semibold tracking-wider">
              {t("brand")}
            </span>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-sm">
              {t("description")}
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[#092634] text-sm font-semibold mb-4 uppercase tracking-wider">
              {t("exploreTitle")}
            </h4>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <a href={`/${locale}/explore`} className={linkClass}>
                {t("destinations")}
              </a>
              <a href={`/${locale}/dashboard`} className={linkClass}>
                {t("itineraries")}
              </a>
              <span className={linkClass}>{t("pricing")}</span>
            </div>
          </div>

          {/* Support */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[#092634] text-sm font-semibold mb-4 uppercase tracking-wider">
              {t("supportTitle")}
            </h4>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <span className={linkClass}>{t("helpCenter")}</span>
              <span className={linkClass}>{t("contactUs")}</span>
              <span className={linkClass}>{t("privacy")}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Lower */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-5">
            <GlobeIcon />
            <ChatIcon />
            <BriefcaseIcon />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-gray-400">
            <span>{t("copyright")}</span>
            <span className="hidden sm:inline">·</span>
            <span>
              {t("developedBy")}{" "}
              <a
                href="https://www.linkedin.com/in/dylang%C3%B3mez09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6E42] hover:underline font-medium"
              >
                Dylan Gómez
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
