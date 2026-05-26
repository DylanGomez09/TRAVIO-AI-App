"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ProfileContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations("profile");

  const menuItems = [
    { icon: "👤", label: t("personalInfo"), sub: null },
    { icon: "♡", label: t("travelPrefs"), sub: t("travelPrefsSub") },
    { icon: "🔔", label: t("notifications"), sub: null },
    { icon: "❓", label: t("help"), sub: null },
  ];

  const name = session?.user?.name || "Traveler";
  const email = session?.user?.email || "";
  const initial = name[0]?.toUpperCase();

  async function handleLogout() {
    await signOut({ redirect: false });
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-20 pb-32">
      <div className="max-w-md mx-auto px-6 pt-8">
        {/* Header */}
        <h1
          className="text-center text-base font-semibold text-[#092634] mb-8"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {t("title")}
        </h1>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-[#092634] flex items-center justify-center">
              <span
                className="text-white text-3xl font-semibold"
                style={{ fontFamily: "var(--font-literata)" }}
              >
                {initial}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#FF6E42] rounded-full px-2 py-0.5">
              <span
                className="text-white text-[10px] font-medium"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Pro
              </span>
            </div>
          </div>
          <h2
            className="text-xl font-bold text-[#092634]"
            style={{ fontFamily: "var(--font-literata)" }}
          >
            {name}
          </h2>
          <p
            className="text-sm text-gray-400"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {email}
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            {[
              { value: "0", label: t("trips") },
              { value: "0", label: t("countries") },
              { value: "0", label: t("days") },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-1">
                <p
                  className="text-xl font-bold text-[#092634]"
                  style={{ fontFamily: "var(--font-literata)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs text-gray-400 uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left ${
                i < menuItems.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p
                    className="text-sm font-medium text-[#092634]"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {item.label}
                  </p>
                  {item.sub && (
                    <p
                      className="text-xs text-gray-400"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {item.sub}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-gray-300">›</span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-white border border-gray-100 rounded-2xl py-4 text-sm text-red-400 font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {t("logout")}
        </button>
      </div>
    </div>
  );
}
