import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Header from "@/app/components/Header"
import TripCard from "@/app/components/TripCard"

export default async function SavedPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const trips = await prisma.trip.findMany({
    where: { userId: session.user.id, status: "saved" },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      <Header userName={session.user?.name ?? ""} />

      <div className="px-6 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-[#092634] mb-1">
          Saved Trips
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          {trips.length} {trips.length === 1 ? "journey" : "journeys"} curated
        </p>

        {trips.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <p className="text-gray-400 text-sm mb-4">
              No saved trips yet.
            </p>
            <Link href="/new-trip"
              className="text-sm text-[#FF6E42] font-medium hover:underline">
              Plan your first trip ?
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {trips.map(trip => (
              <TripCard key={trip.id} id={trip.id} destination={trip.destination} days={trip.days} budget={trip.budget} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
