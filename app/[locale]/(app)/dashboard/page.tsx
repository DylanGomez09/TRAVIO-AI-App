import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCachedUserTrips } from "@/lib/cache";
import { Link } from "@/i18n/navigation";
import TripCard from "@/app/components/TripCard";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import {
  WelcomeSkeleton,
  TripsGridSkeleton,
} from "@/app/components/DashboardSkeleton";

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const t = await getTranslations("dashboard");
  const firstName = (session.user?.name ?? "").split(" ")[0] || "Traveler";

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-20 pb-32">
      <div className="max-w-5xl mx-auto px-8 py-8">
        <p className="text-sm text-gray-400 mb-1">
          {t("welcome", { name: firstName })}
        </p>
        <h1 className="text-4xl font-bold text-[#092634] mb-8">
          {t("heading")}
        </h1>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#092634]">
            {t("savedTrips")}
          </h2>
          <Link
            href="/saved"
            className="text-sm text-[#FF6E42] hover:underline"
          >
            {t("viewAll")}
          </Link>
        </div>

        <Suspense fallback={<TripsGridSkeleton />}>
          <TripsSection userId={session.user.id} />
        </Suspense>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {t("aiTitle")}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {t("aiDesc")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/new-trip"
                className="bg-white text-[#092634] rounded-xl px-5 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                {t("aiCta")}
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-[#092634] mb-4">
              Concierge Pulse
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { title: t("pulse1Title"), desc: t("pulse1Desc") },
                { title: t("pulse2Title"), desc: t("pulse2Desc") },
                { title: t("pulse3Title"), desc: t("pulse3Desc") },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FF6E42] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#092634]">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function TripsSection({ userId }: { userId: string }) {
  const t = await getTranslations("dashboard");
  const trips = await getCachedUserTrips(userId);

  if (trips.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center mb-8">
        <p className="text-gray-400 text-sm mb-4">{t("emptyTitle")}</p>
        <Link
          href="/new-trip"
          className="text-sm text-[#FF6E42] font-medium hover:underline"
        >
          {t("emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {trips.map((trip) => (
        <TripCard key={trip.id} {...trip} />
      ))}
    </div>
  );
}
