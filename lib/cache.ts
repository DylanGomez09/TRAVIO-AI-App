import { cache } from "react"
import { unstable_cache } from "next/cache"
import { prisma } from "./prisma"

const dbGetUserTrips = cache(async (userId: string) => {
  return prisma.trip.findMany({
    where: { userId, status: "saved" },
    orderBy: { createdAt: "desc" },
  })
})

const dbGetTrip = cache(async (id: string) => {
  return prisma.trip.findUnique({
    where: { id },
    include: {
      activities: { orderBy: [{ dayNumber: "asc" }, { order: "asc" }] },
    },
  })
})

export const getCachedUserTrips = unstable_cache(
  async (userId: string) => dbGetUserTrips(userId),
  ["user-trips-key"],
  { revalidate: 60, tags: ["user-trips"] }
)

export const getCachedTrip = unstable_cache(
  async (id: string) => dbGetTrip(id),
  ["single-trip-key"],
  { revalidate: 60, tags: ["single-trip"] }
)
