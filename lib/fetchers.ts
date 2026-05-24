export async function fetchTrip(id: string) {
  const res = await fetch(`/api/trip/${id}`)
  if (!res.ok) throw new Error("Failed to fetch trip")
  return res.json()
}
