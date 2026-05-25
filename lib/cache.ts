import { cacheLife, cacheTag } from "next/cache"
import { prisma } from "./prisma"

export async function getCachedUserTrips(userId: string) {
  'use cache'
  cacheLife({ stale: 300, revalidate: 60, expire: 3600 })
  cacheTag("user-trips")

  return prisma.trip.findMany({
    where: { userId, status: "saved" },
    orderBy: { createdAt: "desc" },
  })
}

export async function getCachedTrip(id: string) {
  'use cache'
  cacheLife({ stale: 300, revalidate: 60, expire: 3600 })
  cacheTag("single-trip")

  return prisma.trip.findUnique({
    where: { id },
    include: {
      activities: { orderBy: [{ dayNumber: "asc" }, { order: "asc" }] },
    },
  })
}
