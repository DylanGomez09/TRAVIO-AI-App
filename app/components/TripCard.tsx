import Link from "next/link";

interface TripCardProps {
  id: string;
  destination: string;
  days: number;
  budget: number;
  image?: string | null;
  variant?: "list" | "grid";
}

export default function TripCard({
  id,
  destination,
  days,
  budget,
  image,
  variant = "list",
}: TripCardProps) {
  const budgetLabel =
    budget === 500 ? "Budget" : budget === 2000 ? "Mid-Range" : "Luxury";

  if (variant === "grid") {
    return (
      <Link
        href={`/trip/${id}`}
        className="relative rounded-2xl overflow-hidden h-52 cursor-pointer block group"
      >
        {image ? (
          <img
            src={image}
            alt={destination}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#092634]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <p
            className="text-white font-semibold text-lg group-hover:underline"
            style={{ fontFamily: "var(--font-literata)" }}
          >
            {destination}
          </p>
          <p
            className="text-white/70 text-xs mt-1"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {days} days · {budgetLabel}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/trip/${id}`}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden block hover:shadow-sm transition-shadow group"
    >
      <div className="relative h-40">
        {image ? (
          <img
            src={image}
            alt={destination}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#092634]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <p
            className="text-white font-semibold text-lg group-hover:underline"
            style={{ fontFamily: "var(--font-literata)" }}
          >
            {destination}
          </p>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="text-xs text-gray-400"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            📅 {days} days
          </span>
          <span
            className="text-xs text-gray-400"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            💰 {budgetLabel}
          </span>
        </div>
        <span
          className="text-xs text-[#FF6E42] font-medium"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          View →
        </span>
      </div>
    </Link>
  );
}
