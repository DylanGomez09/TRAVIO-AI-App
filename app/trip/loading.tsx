"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const messages = [
  "Analyzing your travel preferences...",
  "Curating local experiences...",
  "Optimizing your itinerary...",
  "Almost ready...",
]

export default function TripLoadingPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const destination = params.get("destination")
    const days = params.get("days")
    const budget = params.get("budget")
    const interests = params.get("interests")?.split(",") || []

    async function generate() {
      const res = await fetch("/api/trip/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days, budget, interests }),
      })

      const data = await res.json()
      if (data.tripId) {
        router.push(`/trip/${data.tripId}`)
      }
    }

    generate()
  }, [])

  return (
    <div className="min-h-screen bg-[#092634] flex flex-col items-center justify-center">
      {/* Animated orb */}
      <div className="relative mb-12">
        <div className="w-32 h-32 rounded-full bg-[#FF6E42]/20 animate-ping absolute inset-0" />
        <div className="w-32 h-32 rounded-full bg-[#FF6E42]/30 animate-pulse absolute inset-0" />
        <div className="w-32 h-32 rounded-full bg-[#FF6E42]/10 flex items-center justify-center relative">
          <span className="text-4xl">✦</span>
        </div>
      </div>

      <h2 className="text-white text-2xl font-semibold mb-3"
        style={{ fontFamily: "var(--font-literata)" }}>
        Crafting your journey
      </h2>

      <p className="text-white/50 text-sm transition-all duration-500"
        style={{ fontFamily: "var(--font-manrope)" }}>
        {messages[messageIndex]}
      </p>
    </div>
  )
}