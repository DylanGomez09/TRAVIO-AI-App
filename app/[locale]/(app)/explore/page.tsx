import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getTrendingDestinations } from "@/lib/cache";
import LazyTripImage from "@/app/components/LazyTripImage";
import {
  ExploreHeaderSkeleton,
  DestinationsGridSkeleton,
  ExplorePageSkeleton,
} from "@/app/components/ExploreSkeleton";

const tagColors: Record<string, string> = {
  culture: "bg-blue-50 text-blue-600",
  food: "bg-orange-50 text-orange-600",
  nature: "bg-green-50 text-green-600",
  adventure: "bg-red-50 text-red-600",
  wellness: "bg-purple-50 text-purple-600",
  architecture: "bg-yellow-50 text-yellow-700",
  beaches: "bg-cyan-50 text-cyan-600",
  history: "bg-stone-100 text-stone-600",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })
  return {
    title: t("explore.title"),
    description: t("explore.description"),
  }
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<ExplorePageSkeleton />}>
      <ExploreAuthCheck />
    </Suspense>
  );
}

async function ExploreAuthCheck() {
  const session = await auth();
  if (!session) redirect("/login");
  return <ExploreContent />;
}

async function ExploreContent() {
  const t = await getTranslations("explore");

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-20 pb-32">
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <div className="mb-8">
          <span className="text-xs text-[#FF6E42] font-medium tracking-widest uppercase">
            {t("badge")}
          </span>
          <h1 className="text-4xl font-bold text-[#092634] mt-1">
            {t("title")}
          </h1>
          <p className="text-sm text-gray-400 mt-2">{t("subtitle")}</p>
        </div>

        <Suspense fallback={<DestinationsGridSkeleton />}>
          <DestinationsSection />
        </Suspense>
      </div>
    </div>
  );
}

async function DestinationsSection() {
  const t = await getTranslations("explore");
  const destinations = await getTrendingDestinations();

  if (destinations.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-sm">{t("planTrip")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {destinations.map((dest: any, i: number) => {
        const bgClass =
          i % 3 === 0
            ? "bg-[#092634]"
            : i % 3 === 1
              ? "bg-[#351E06]"
              : "bg-[#1a3a4a]";

        return (
          <Link
            key={dest.city}
            href={`/new-trip?destination=${encodeURIComponent(dest.city + ", " + dest.country)}`}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer block"
          >
            <div className="h-44 relative overflow-hidden">
              <div className={`absolute inset-0 ${bgClass}`} />
              <LazyTripImage
                destination={`${dest.city} ${dest.country}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h2 className="text-white text-xl font-bold group-hover:underline">
                  {dest.city}
                </h2>
                <p className="text-white/70 text-xs">{dest.country}</p>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                {dest.tagline}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {dest.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${tagColors[tag.toLowerCase()] || "bg-gray-100 text-gray-500"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {t("bestFor")}{" "}
                  <span className="text-[#092634] font-medium">
                    {dest.bestFor}
                  </span>
                </span>
                <span className="text-xs text-[#FF6E42] font-medium group-hover:underline">
                  {t("planTrip")}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
