import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const firstName = session.user?.name?.split(" ")[0] || "Traveler"

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <button className="text-[#092634]">☰</button>
        <span className="text-[#092634] text-sm tracking-widest uppercase"
          style={{ fontFamily: "var(--font-literata)" }}>
          Voyager AI
        </span>
        <div className="w-8 h-8 rounded-full bg-[#092634] flex items-center justify-center">
          <span className="text-white text-xs font-medium">
            {firstName[0]}
          </span>
        </div>
      </header>

      {/* Welcome */}
      <div className="px-6 mt-4 mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1"
          style={{ fontFamily: "var(--font-manrope)" }}>
          Welcome back, {firstName}
        </p>
        <h1 className="text-3xl font-bold text-[#092634]"
          style={{ fontFamily: "var(--font-literata)" }}>
          Your next journey awaits.
        </h1>
      </div>

      {/* Saved Trips */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#092634]"
            style={{ fontFamily: "var(--font-manrope)" }}>
            Saved Trips
          </h2>
          <button className="text-xs text-gray-400 hover:text-[#092634]"
            style={{ fontFamily: "var(--font-manrope)" }}>
            View all
          </button>
        </div>

        {/* Trip cards — placeholder */}
        <div className="flex flex-col gap-4">
          {[
            { city: "Tokyo, Japan", dates: "Oct 12 – Oct 20, 2024", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600", current: true },
            { city: "Amalfi Coast, Italy", dates: "June 04 – June 12, 2026", img: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=600" },
            { city: "Paris, France", dates: "Dec 20 – Dec 28, 2026", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600" },
          ].map((trip) => (
            <div key={trip.city} className="relative rounded-2xl overflow-hidden h-36 cursor-pointer">
              <img src={trip.img} alt={trip.city}
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <p className="text-white font-semibold text-base"
                  style={{ fontFamily: "var(--font-literata)" }}>
                  {trip.city}
                </p>
                <p className="text-white/70 text-xs"
                  style={{ fontFamily: "var(--font-manrope)" }}>
                  {trip.dates}
                </p>
              </div>
              {trip.current && (
                <div className="absolute bottom-3 right-4 bg-[#FF6E42] rounded-full px-3 py-1">
                  <span className="text-white text-xs font-medium"
                    style={{ fontFamily: "var(--font-manrope)" }}>
                    Current
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Plan New Trip */}
        <Link href="/new-trip"
          className="mt-6 w-full bg-[#FF6E42] text-white rounded-full py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#e85e35] transition-colors"
          style={{ fontFamily: "var(--font-manrope)" }}>
          ⊕ Plan New Trip
        </Link>

        {/* AI Recommends */}
        <div className="mt-8 bg-white rounded-2xl p-5 border border-gray-100">
          <h3 className="text-sm font-semibold text-[#092634] mb-1 flex items-center gap-2"
            style={{ fontFamily: "var(--font-manrope)" }}>
            ✦ AI Recommends
          </h3>
          <p className="text-xs text-gray-500 mb-4"
            style={{ fontFamily: "var(--font-manrope)" }}>
            Based on your interest in <span className="font-medium text-[#092634]">Zen Architecture</span>, we've found a hidden Ryokan in Hakone for your Tokyo stay.
          </p>
          <div className="flex gap-3">
            <button className="text-xs border border-gray-200 rounded-full px-4 py-2 text-[#092634] hover:bg-gray-50"
              style={{ fontFamily: "var(--font-manrope)" }}>
              See Details
            </button>
            <button className="text-xs text-gray-400 hover:text-gray-600"
              style={{ fontFamily: "var(--font-manrope)" }}>
              Dismiss
            </button>
          </div>
        </div>
      </div>

      {/* Floating Navbar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-8 shadow-lg border border-gray-100">
        {[
          { icon: "⊕", label: "Explore", href: "/" },
          { icon: "✈", label: "Trips", href: "/dashboard", active: true },
          { icon: "♡", label: "Saved", href: "/saved" },
          { icon: "◎", label: "Profile", href: "/profile" },
        ].map((item) => (
          <Link key={item.label} href={item.href}
            className="flex flex-col items-center gap-1">
            <span className={`text-lg ${item.active ? "text-[#FF6E42]" : "text-gray-400"}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] ${item.active ? "text-[#FF6E42] font-medium" : "text-gray-400"}`}
              style={{ fontFamily: "var(--font-manrope)" }}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  )
}