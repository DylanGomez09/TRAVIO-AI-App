import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function SavedPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const trips = await prisma.trip.findMany({
    where: { userId: session.user.id, status: "saved" },
    orderBy: { createdAt: "desc" },
    include: {
      activities: { orderBy: { order: "asc" }, take: 1 },
    },
  })

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      <header className="flex items-center justify-between px-6 py-5 max-w-lg mx-auto">
        <button className="text-[#092634]">☰</button>
        <span className="text-[#092634] text-sm tracking-widest uppercase"
          style={{ fontFamily: "var(--font-literata)" }}>
          Voyager AI
        </span>
        <div className="w-8 h-8 rounded-full bg-[#092634] flex items-center justify-center">
          <span className="text-white text-xs font-medium">
            {session.user?.name?.[0] || "U"}
          </span>
        </div>
      </header>

      <div className="px-6 mx-auto">
        <h1 className="text-3xl font-bold text-[#092634] mb-1"
          style={{ fontFamily: "var(--font-literata)" }}>
          Saved Trips
        </h1>
        <p className="text-sm text-gray-400 mb-8"
          style={{ fontFamily: "var(--font-manrope)" }}>
          {trips.length} {trips.length === 1 ? "journey" : "journeys"} curated
        </p>

        {trips.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
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
          <div className="flex flex-col gap-4">
            {trips.map(trip => (
              <Link key={trip.id} href={`/trip/${trip.id}`}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden block hover:shadow-sm transition-shadow">
                <div className="relative h-40 bg-[#092634]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold text-lg"
                      style={{ fontFamily: "var(--font-literata)" }}>
                      {trip.destination}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400"
                      style={{ fontFamily: "var(--font-manrope)" }}>
                      📅 {trip.days} days
                    </span>
                    <span className="text-xs text-gray-400"
                      style={{ fontFamily: "var(--font-manrope)" }}>
                      💰 {trip.budget === 500 ? "Budget" : trip.budget === 2000 ? "Mid-Range" : "Luxury"}
                    </span>
                  </div>
                  <span className="text-xs bg-[#F9F9F9] text-[#092634] px-3 py-1 rounded-full font-medium"
                    style={{ fontFamily: "var(--font-manrope)" }}>
                    {trip.activities.length > 0 ? `${trip.activities.length} activities` : "View"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Floating Navbar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-8 shadow-lg border border-gray-100">
        {[
          { icon: "⊕", label: "Explore", href: "/" },
          { icon: "✈", label: "Trips", href: "/dashboard" },
          { icon: "♡", label: "Saved", href: "/saved", active: true },
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