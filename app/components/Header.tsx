"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTranslations, useLocale } from "next-intl";
import Navbar from "@/app/components/Navbar";

export default function Header() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Traveler";
  const firstName = userName.split(" ")[0];
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("header");
  const otherLocale = locale === "en" ? "es" : "en";

  const navItems = [
    { label: t("explore"), href: "/explore" },
    { label: t("trips"), href: "/dashboard" },
    { label: t("concierge"), href: "/concierge" },
    { label: t("saved"), href: "/saved" },
  ];

  if (pathname === "/trip/loading") return null;

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-[#092634] text-base font-semibold tracking-wider">
            {t("brand")}
          </span>

          <nav className="hidden md:flex items-center gap-1 relative">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 z-10 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-[#092634]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#FF6E42] rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/new-trip"
              className="hidden md:block bg-[#FF6E42] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#e85e35] transition-colors"
            >
              {t("planTrip")}
            </Link>
            <Link
              href={pathname}
              locale={otherLocale}
              className="text-xs font-medium text-gray-400 hover:text-[#092634] transition-colors uppercase tracking-wider"
            >
              {otherLocale === "es" ? t("switchToEs") : t("switchToEn")}
            </Link>
            <Link
              href="/profile"
              className="w-8 h-8 rounded-full bg-[#092634] flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <span className="text-white text-xs font-medium">
                {firstName[0]}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile — bottom bar */}
      </header>
      <Navbar />
    </>
  );
}
