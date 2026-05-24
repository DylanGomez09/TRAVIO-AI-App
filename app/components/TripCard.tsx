import Link from "next/link"

export default function TripCard({ id, destination, days, budget }: { id: string; destination: string; days: number; budget: number }) {
  const budgetLabel = budget === 500 ? "Budget" : budget === 2000 ? "Mid-Range" : "Luxury"
  return (
    <Link href={`/trip/${id}`}
      className="relative rounded-2xl overflow-hidden h-36 cursor-pointer block">
      <div className="w-full h-full bg-[#092634]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-3 left-4">
        <p className="text-white font-semibold text-base">
          {destination}
        </p>
        <p className="text-white/70 text-xs">
          {days} days · {budgetLabel}
        </p>
      </div>
    </Link>
  )
}
