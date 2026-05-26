export function ExploreHeaderSkeleton() {
  return (
    <div className="mb-8 animate-pulse">
      <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
      <div className="h-10 w-72 bg-gray-200 rounded mt-1 mb-2" />
      <div className="h-4 w-96 bg-gray-200 rounded mt-2" />
    </div>
  );
}

export function ExplorePageSkeleton() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-20 pb-32">
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <ExploreHeaderSkeleton />
        <DestinationsGridSkeleton />
      </div>
    </div>
  );
}

export function DestinationsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="h-44 bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
            <div className="flex gap-2">
              <div className="h-5 w-14 bg-gray-200 rounded-full" />
              <div className="h-5 w-16 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
