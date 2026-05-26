"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

export default function ForgotPasswordForm() {
  const t = useTranslations("forgotPassword");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || t("error"));
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
      <header className="py-6 flex justify-center">
        <span className="text-[#092634] text-lg tracking-widest uppercase">
          Travio AI
        </span>
      </header>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-md">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✉</span>
              </div>
              <h1
                className="text-2xl font-semibold text-[#092634] mb-3"
                style={{ fontFamily: "var(--font-literata)" }}
              >
                {t("emailSent")}
              </h1>
              <p
                className="text-sm text-gray-400 mb-8"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("emailSentDesc")}
              </p>
              <Link
                href="/login"
                className="text-sm text-[#FF6E42] font-medium hover:underline"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("backToLogin")}
              </Link>
            </div>
          ) : (
            <>
              <h1
                className="text-2xl font-semibold text-[#092634] text-center mb-2"
                style={{ fontFamily: "var(--font-literata)" }}
              >
                {t("title")}
              </h1>
              <p
                className="text-sm text-gray-400 text-center mb-8"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("subtitle")}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    className="text-sm text-[#092634]"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {t("emailLabel")}
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2">
                    <span className="text-gray-400">✉</span>
                    <input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 outline-none text-sm bg-transparent"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    />
                  </div>
                </div>

                {error && (
                  <p
                    className="text-sm text-red-500 text-center"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FF6E42] text-white rounded-lg py-3 text-sm font-medium hover:bg-[#e85e35] transition-colors disabled:opacity-60"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {loading ? t("sending") : t("submit")}
                </button>
              </form>

              <p
                className="text-center text-xs text-gray-500 mt-6"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-[#092634] font-medium hover:underline"
                >
                  Log In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
