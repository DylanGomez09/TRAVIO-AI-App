"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetContent() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    router.push("/login?reset=success");
  }

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-4">Invalid or expired link.</p>
        <Link
          href="/forgot-password"
          className="text-[#FF6E42] text-sm hover:underline"
        >
          Request a new one
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1
        className="text-2xl font-semibold text-[#092634] text-center mb-2"
        style={{ fontFamily: "var(--font-literata)" }}
      >
        New Password
      </h1>
      <p
        className="text-sm text-gray-400 text-center mb-8"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        Enter your new password below.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label
            className="text-sm text-[#092634]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            New Password
          </label>
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2">
            <span className="text-gray-400">🔒</span>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
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
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
      <header className="py-6 flex justify-center">
        <span
          className="text-[#092634] text-xl tracking-widest uppercase"
          style={{ fontFamily: "var(--font-literata)" }}
        >
          Voyager AI
        </span>
      </header>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-md">
          <Suspense>
            <ResetContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
