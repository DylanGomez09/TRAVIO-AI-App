import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const firstName = session.user?.name?.split(" ")[0] || "Traveler"

  const trips = await prisma.trip.findMany({
    where: { userId: session.user.id, status: "saved" },
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <button className="text-[#092634]">☰</button>
        <span className="text-[#092634] text-sm tracking-widest uppercase"
          style={{ fontFamily: "var(--font-literata)" }}>
          Travio AI
        </span>
        <div className="w-8 h-8 rounded-full bg-[#092634] flex items-center justify-center">
          <span className="text-white text-xs font-medium">{firstName[0]}</span>
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

      <div className="px-6">
        {/* Saved Trips */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#092634]"
            style={{ fontFamily: "var(--font-manrope)" }}>
            Saved Trips
          </h2>
          <Link href="/saved" className="text-xs text-gray-400 hover:text-[#092634]"
            style={{ fontFamily: "var(--font-manrope)" }}>
            View all
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center mb-6">
            <p className="text-gray-400 text-sm mb-4"
              style={{ fontFamily: "var(--font-manrope)" }}>
              No saved trips yet.
            </p>
            <Link href="/new-trip"
              className="text-sm text-[#FF6E42] font-medium hover:underline"
              style={{ fontFamily: "var(--font-manrope)" }}>
              Plan your first trip →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mb-6">
            {trips.map(trip => (
              <Link key={trip.id} href={`/trip/${trip.id}`}
                className="relative rounded-2xl overflow-hidden h-36 cursor-pointer block">
                <div className="w-full h-full bg-[#092634]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-semibold text-base"
                    style={{ fontFamily: "var(--font-literata)" }}>
                    {trip.destination}
                  </p>
                  <p className="text-white/70 text-xs"
                    style={{ fontFamily: "var(--font-manrope)" }}>
                    {trip.days} days · {trip.budget === 500 ? "Budget" : trip.budget === 2000 ? "Mid-Range" : "Luxury"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Plan New Trip */}
        <Link href="/new-trip"
          className="w-full bg-[#FF6E42] text-white rounded-full py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#e85e35] transition-colors"
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
            Plan your next adventure — your AI concierge is ready to curate a bespoke journey for you.
          </p>
          <Link href="/new-trip"
            className="text-xs border border-gray-200 rounded-full px-4 py-2 text-[#092634] hover:bg-gray-50 inline-block"
            style={{ fontFamily: "var(--font-manrope)" }}>
            Start Planning
          </Link>
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