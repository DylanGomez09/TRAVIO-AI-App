import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCachedUserTrips } from "@/lib/cache";
import { getDestinationImage } from "@/lib/unsplash";
import Link from "next/link";
import TripCard from "@/app/components/TripCard";

export default async function SavedPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const trips = await getCachedUserTrips(session.user.id);

  const tripsWithImages = await Promise.all(
    trips.map(async (trip) => ({
      ...trip,
      image: await getDestinationImage(trip.destination),
    })),
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <h1
          className="text-3xl font-bold text-[#092634] mb-1"
          style={{ fontFamily: "var(--font-literata)" }}
        >
          Saved Trips
        </h1>
        <p
          className="text-sm text-gray-400 mb-8"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {trips.length} {trips.length === 1 ? "journey" : "journeys"} curated
        </p>

        {tripsWithImages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <p
              className="text-gray-400 text-sm mb-4"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              No saved trips yet.
            </p>
            <Link
              href="/new-trip"
              className="text-sm text-[#FF6E42] font-medium hover:underline"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Plan your first trip →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {tripsWithImages.map((trip) => (
              <TripCard
                key={trip.id}
                id={trip.id}
                destination={trip.destination}
                days={trip.days}
                budget={trip.budget}
                image={trip.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
