import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Header from "@/app/components/Header"
import TripCard from "@/app/components/TripCard"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const firstName = session.user?.name?.split(" ")[0] || "Traveler"

  const trips = await prisma.trip.findMany({
    where: { userId: session.user.id, status: "saved" },
    orderBy: { createdAt: "desc" },
    take: 3,
  })

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      <Header userName={session.user?.name ?? ""} />

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Welcome */}
        <p className="text-sm text-gray-400 mb-1">
          Welcome back, {firstName}
        </p>
        <h1 className="text-4xl font-bold text-[#092634] mb-8">
          Your next journey awaits
        </h1>

        {/* Saved Trips */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#092634]">
            Saved Trips
          </h2>
          <Link href="/saved"
            className="text-sm text-[#FF6E42] hover:underline">
            View all
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center mb-8">
            <p className="text-gray-400 text-sm mb-4">
              No saved trips yet.
            </p>
            <Link href="/new-trip"
              className="text-sm text-[#FF6E42] font-medium hover:underline">
              Plan your first trip ?
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {trips.map(trip => (
              <TripCard
                key={trip.id}
                id={trip.id}
                destination={trip.destination}
                days={trip.days}
                budget={trip.budget}
              />
            ))}
          </div>
        )}

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AI Recommendation */}
          <div className="bg-[#092634] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <p className="text-[#FF6E42] text-xs font-semibold tracking-widest uppercase mb-3">
                AI Recommendation
              </p>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FF6E42] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">?</span>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    Plan Your Next Adventure
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Your AI concierge is ready to craft a deeply personalized itinerary tailored to your unique tastes.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/new-trip"
                className="bg-white text-[#092634] rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
                Explore Now
              </Link>
            </div>
          </div>

          {/* Concierge Pulse */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-[#092634] mb-4">
              Concierge Pulse
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { title: "AI Travel Tips", desc: "Get personalized recommendations based on your travel style." },
                { title: "Smart Itineraries", desc: "Your AI concierge optimizes time and budget automatically." },
                { title: "Curated Experiences", desc: "Discover hidden gems tailored to your interests." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FF6E42] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#092634]">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

