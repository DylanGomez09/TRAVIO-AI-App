const WIKIPEDIA_API = "https://en.wikipedia.org/api/rest_v1"

export async function getWikipediaCityImage(
  destination: string
): Promise<string | null> {
  const title = encodeURIComponent(destination)

  try {
    const res = await fetch(
      `${WIKIPEDIA_API}/page/summary/${title}`,
      { headers: { "Accept": "application/json" } }
    )

    if (!res.ok) return null

    const data = await res.json()
    return data?.thumbnail?.source ?? null
  } catch {
    return null
  }
}
