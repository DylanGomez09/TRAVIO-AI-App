import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCachedUserTrips } from "@/lib/cache";
import { getDestinationImage } from "@/lib/unsplash";
import { Link } from "@/i18n/navigation";
import TripCard from "@/app/components/TripCard";
import { SavedSkeleton } from "@/app/components/SavedSkeleton";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })
  return {
    title: t("saved.title"),
    description: t("saved.description"),
  }
}

export default function SavedPage() {
  return (
    <Suspense fallback={<SavedSkeleton />}>
      <SavedAuthCheck />
    </Suspense>
  );
}

async function SavedAuthCheck() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return <SavedContent userId={session.user.id} />;
}

async function SavedContent({ userId }: { userId: string }) {
  const t = await getTranslations("saved");
  const trips = await getCachedUserTrips(userId);

  const tripsWithImages = await Promise.all(
    trips.map(async (trip) => ({
      ...trip,
      image: await getDestinationImage(trip.destination),
    })),
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-20 pb-32">
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <h1
          className="text-3xl font-bold text-[#092634] mb-1"
          style={{ fontFamily: "var(--font-literata)" }}
        >
          {t("title")}
        </h1>
        <p
          className="text-sm text-gray-400 mb-8"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {t("journeys", { count: trips.length })}
        </p>

        {tripsWithImages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <p
              className="text-gray-400 text-sm mb-4"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("emptyTitle")}
            </p>
            <Link
              href="/new-trip"
              className="text-sm text-[#FF6E42] font-medium hover:underline"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("emptyCta")}
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
