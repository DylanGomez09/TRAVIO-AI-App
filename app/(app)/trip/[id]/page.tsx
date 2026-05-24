import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import ConfirmButton from "./confirm-button"
import Header from "@/app/components/Header"

export default async function TripPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session) redirect("/login")

  const { id } = await params

  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      activities: { orderBy: [{ dayNumber: "asc" }, { order: "asc" }] },
    },
  })

  if (!trip) redirect("/dashboard")

  const days = Array.from({ length: trip.days }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      <Header userName={session.user?.name || ""} />

      <div className="px-6 max-w-2xl mx-auto">
        <Link
          href="/dashboard"
          className="text-sm text-gray-400 flex items-center gap-1 mb-6 hover:text-[#092634]">
          ← Back to Planner
        </Link>

        {/* Hero image */}
        <div className="relative rounded-2xl overflow-hidden h-52 mb-6">
          <img
            src={`https://api.unsplash.com/photos/random?query=${encodeURIComponent(trip.destination)}+city+landmark&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`}
            alt={trip.destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-5">
            <h1 className="text-white text-3xl font-bold">
              {trip.destination}
            </h1>
            <p className="text-white/70 text-sm">
              Your curated experience
            </p>
          </div>
        </div>

        {/* Trip info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-gray-300 mt-0.5">📅</span>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  Duration
                </p>
                <p className="text-sm font-medium text-[#092634]">
                  {trip.days} days
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-300 mt-0.5">💰</span>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  Budget
                </p>
                <p className="text-sm font-medium text-[#092634] capitalize">
                  {trip.budget === 500
                    ? "Budget"
                    : trip.budget === 2000
                      ? "Mid-Range"
                      : "Luxury"}
                </p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-[#092634]">
                Total Investment
              </p>
              <p className="text-xs text-gray-400">
                Includes all curated experiences
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#092634]">
                $
                {trip.activities
                  .reduce((sum, a) => sum + a.cost, 0)
                  .toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">
                per person
              </p>
            </div>
          </div>
        </div>

        {/* Itinerary by day */}
        <h2 className="text-lg font-semibold text-[#092634] mb-4">
          Your Itinerary
        </h2>

        <div className="flex flex-col gap-4">
          {days.map((day) => {
            const dayActivities = trip.activities.filter(
              (a) => a.dayNumber === day,
            )
            return (
              <div
                key={day}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                  <h3 className="text-sm font-semibold text-[#092634]">
                    Day {day}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {dayActivities.length} activities
                  </span>
                </div>
                <div className="divide-y divide-gray-50">
                  {dayActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="px-5 py-4 flex items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#092634] mb-1">
                          {activity.name}
                        </p>
                        {activity.description && (
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {activity.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          {activity.durationMin && (
                            <span className="text-xs text-gray-400">
                              ⏱ {activity.durationMin}min
                            </span>
                          )}
                          <span className="text-xs px-2 py-0.5 bg-[#F9F9F9] rounded-full text-gray-500 capitalize">
                            {activity.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-semibold text-[#092634]">
                          ${activity.cost}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <Link
            href={`/new-trip?edit=${id}`}
            className="flex-1 border border-gray-200 rounded-full py-3 text-sm text-[#092634] text-center hover:bg-gray-50 transition-colors"
          >
            Edit Preferences
          </Link>
          <ConfirmButton tripId={id} />
        </div>
      </div>
    </div>
  )
}
