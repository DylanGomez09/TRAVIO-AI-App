import { cacheLife, cacheTag } from "next/cache"
import { prisma } from "./prisma"
import { GoogleGenerativeAI } from "@google/generative-ai"
import type { Trip, Prisma } from "@prisma/client"

export type TripWithActivities = Prisma.TripGetPayload<{
  include: { activities: true }
}>

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function getCachedUserTrips(userId: string): Promise<Trip[]> {
  'use cache'
  cacheLife({ stale: 300, revalidate: 60, expire: 3600 })
  cacheTag("user-trips")

  return prisma.trip.findMany({
    where: { userId, status: "saved" },
    orderBy: { createdAt: "desc" },
  })
}

export async function getCachedTrip(id: string): Promise<TripWithActivities | null> {
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

const fallbackDestinations = [
  { city: "Tokyo", country: "Japan", tagline: "Where ancient temples meet neon-lit futurism", tags: ["culture", "food", "architecture"], bestFor: "Culture lovers" },
  { city: "Barcelona", country: "Spain", tagline: "Mediterranean charm with Gaudí's masterpieces", tags: ["architecture", "food", "beaches"], bestFor: "Architecture fans" },
  { city: "Bali", country: "Indonesia", tagline: "Tropical paradise of rice terraces and spirituality", tags: ["nature", "wellness", "beaches"], bestFor: "Wellness seekers" },
  { city: "Reykjavik", country: "Iceland", tagline: "Chase the Northern Lights and volcanic landscapes", tags: ["nature", "adventure"], bestFor: "Adventure travelers" },
  { city: "Kyoto", country: "Japan", tagline: "Cherry blossoms, geishas, and thousand-year-old temples", tags: ["culture", "history", "nature"], bestFor: "History buffs" },
  { city: "Tulum", country: "Mexico", tagline: "Mayan ruins overlooking turquoise Caribbean waters", tags: ["beaches", "history", "adventure"], bestFor: "Beach explorers" },
]

export async function getTrendingDestinations() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
    const result = await Promise.race([
      model.generateContent(`
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
      `),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Gemini API timeout")), 10000)
      ),
    ]) as any
    const text = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim()
    return JSON.parse(text)
  } catch (err) {
    console.error("[getTrendingDestinations]", err)
    return fallbackDestinations
  }
}
