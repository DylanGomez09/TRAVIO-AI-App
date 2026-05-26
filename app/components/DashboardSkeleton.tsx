export function WelcomeSkeleton() {
  return (
    <div className="mb-8">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-1 animate-pulse" />
      <div className="h-10 bg-gray-200 rounded w-1/2 mb-8 animate-pulse" />
      <div className="h-5 bg-gray-200 rounded w-1/4 mb-4 animate-pulse" />
    </div>
  );
}

export function TripsGridSkeleton() {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl h-52 bg-gray-200 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-20 pb-32">
      <div className="max-w-5xl mx-auto px-8 py-8">
        <WelcomeSkeleton />
        <TripsGridSkeleton />
      </div>
    </div>
  );
}
