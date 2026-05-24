import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDestinationImage } from "@/lib/unsplash";
import Link from "next/link";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function getTrendingDestinations() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(`
    Give me 6 trending travel destinations for 2026. 
    Respond ONLY with a JSON array, no markdown, no extra text:
    [
      {
        "city": "City name",
        "country": "Country",
        "tagline": "One short inspiring sentence",
        "tags": ["tag1", "tag2"],
        "bestFor": "Type of traveler"
      }
    ]
  `);
  const text = result.response
    .text()
    .replace(/```json|```/g, "")
    .trim();
  return JSON.parse(text);
}

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

export default async function ExplorePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const destinations = await getTrendingDestinations();

  const destinationsWithImages = await Promise.all(
    destinations.map(async (dest: any) => ({
      ...dest,
      image: await getDestinationImage(dest.city + " " + dest.country),
    })),
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <div className="mb-8">
          <span
            className="text-xs text-[#FF6E42] font-medium tracking-widest uppercase"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            ✦ AI Curated
          </span>
          <h1
            className="text-4xl font-bold text-[#092634] mt-1"
            style={{ fontFamily: "var(--font-literata)" }}
          >
            Trending Destinations
          </h1>
          <p
            className="text-sm text-gray-400 mt-2"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Handpicked by your AI concierge for 2026
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinationsWithImages.map((dest: any, i: number) => (
            <Link
              key={dest.city}
              href={`/new-trip?destination=${encodeURIComponent(dest.city + ", " + dest.country)}`}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer block"
            >
              <div className="h-44 relative overflow-hidden">
                {dest.image ? (
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 ${
                      i % 3 === 0
                        ? "bg-[#092634]"
                        : i % 3 === 1
                          ? "bg-[#351E06]"
                          : "bg-[#1a3a4a]"
                    }`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h2
                    className="text-white text-xl font-bold group-hover:underline"
                    style={{ fontFamily: "var(--font-literata)" }}
                  >
                    {dest.city}
                  </h2>
                  <p
                    className="text-white/70 text-xs"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {dest.country}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <p
                  className="text-sm text-gray-500 mb-3 leading-relaxed"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {dest.tagline}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {dest.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${tagColors[tag.toLowerCase()] || "bg-gray-100 text-gray-500"}`}
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs text-gray-400"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    Best for:{" "}
                    <span className="text-[#092634] font-medium">
                      {dest.bestFor}
                    </span>
                  </span>
                  <span
                    className="text-xs text-[#FF6E42] font-medium group-hover:underline"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    Plan trip →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
