export function SavedSkeleton() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-20 pb-32">
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <div className="h-9 w-40 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 w-32 bg-gray-200 rounded mb-8 animate-pulse" />
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-40 bg-gray-200" />
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-12 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
