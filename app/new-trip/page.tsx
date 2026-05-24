"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const interests = ["Culture", "Culinary", "Wellness & Spa", "Adventure", "Architecture", "Seclusion"]

const budgetTiers = [
  { value: "budget", label: "Budget" },
  { value: "mid", label: "Mid-Range" },
  { value: "luxury", label: "Luxury" },
]

export default function NewTripPage() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [days, setDays] = useState("")
  const [budget, setBudget] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  function toggleInterest(interest: string) {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  async function handleGenerate() {
    if (!destination || !days || !budget) return
    setLoading(true)
    router.push(`/trip/loading?destination=${destination}&days=${days}&budget=${budget}&interests=${selectedInterests.join(",")}`)
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <button className="text-[#092634]">☰</button>
        <span className="text-[#092634] text-sm tracking-widest uppercase"
          style={{ fontFamily: "var(--font-literata)" }}>
          Voyager AI
        </span>
        <div className="w-8 h-8 rounded-full bg-[#092634]" />
      </header>

      <div className="px-6 mt-4">
        {/* Title */}
        <h1 className="text-4xl font-bold text-[#092634] text-center mb-2"
          style={{ fontFamily: "var(--font-literata)" }}>
          Curate Your Journey
        </h1>
        <p className="text-sm text-gray-400 text-center mb-10 max-w-sm mx-auto"
          style={{ fontFamily: "var(--font-manrope)" }}>
          Provide a few details, and our AI concierge will craft a deeply personalized itinerary tailored to your unique tastes.
        </p>

        {/* Form card */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm max-w-xl mx-auto">

          {/* Logistics */}
          <h2 className="text-base font-semibold text-[#092634] mb-5"
            style={{ fontFamily: "var(--font-manrope)" }}>
            Logistics
          </h2>

          {/* Destination */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 mb-1 block"
              style={{ fontFamily: "var(--font-manrope)" }}>
              Primary Destination
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-2">
              <span className="text-gray-300">⊕</span>
              <input
                type="text"
                placeholder="e.g. Kyoto, Japan or Amalfi Coast"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="flex-1 outline-none text-sm bg-transparent text-[#092634] placeholder:text-gray-300"
                style={{ fontFamily: "var(--font-manrope)" }}
              />
            </div>
          </div>

          {/* Days + Budget */}
          <div className="flex gap-3 mb-8">
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block"
                style={{ fontFamily: "var(--font-manrope)" }}>
                Duration (Days)
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-2">
                <span className="text-gray-300">📅</span>
                <input
                  type="number"
                  placeholder="7"
                  min={1}
                  max={30}
                  value={days}
                  onChange={e => setDays(e.target.value)}
                  className="flex-1 outline-none text-sm bg-transparent text-[#092634] placeholder:text-gray-300"
                  style={{ fontFamily: "var(--font-manrope)" }}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block"
                style={{ fontFamily: "var(--font-manrope)" }}>
                Budget Level
              </label>
              <select
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent text-[#092634] outline-none"
                style={{ fontFamily: "var(--font-manrope)" }}>
                <option value="">Select Tier</option>
                {budgetTiers.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Interests */}
          <h2 className="text-base font-semibold text-[#092634] mb-2"
            style={{ fontFamily: "var(--font-manrope)" }}>
            Interests & Vibe
          </h2>
          <p className="text-xs text-gray-400 mb-4"
            style={{ fontFamily: "var(--font-manrope)" }}>
            Select the elements that define your ideal getaway.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {interests.map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  selectedInterests.includes(interest)
                    ? "bg-[#FF6E42] text-white"
                    : "border border-gray-200 text-[#092634] hover:border-[#FF6E42]"
                }`}
                style={{ fontFamily: "var(--font-manrope)" }}>
                {interest}
              </button>
            ))}
            <button className="border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-400 hover:border-[#FF6E42]"
              style={{ fontFamily: "var(--font-manrope)" }}>
              + Custom
            </button>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!destination || !days || !budget || loading}
            className="w-full bg-[#FF6E42] text-white rounded-full py-4 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#e85e35] transition-colors disabled:opacity-50"
            style={{ fontFamily: "var(--font-manrope)" }}>
            ✦ Generate Itinerary
          </button>
          <p className="text-center text-xs text-gray-400 mt-3"
            style={{ fontFamily: "var(--font-manrope)" }}>
            Our AI takes roughly 15 seconds to curate your bespoke journey.
          </p>
        </div>
      </div>

      {/* Floating Navbar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-8 shadow-lg border border-gray-100">
        {[
          { icon: "⊕", label: "Explore", href: "/" },
          { icon: "✈", label: "Trips", href: "/dashboard" },
          { icon: "♡", label: "Saved", href: "/saved" },
          { icon: "◎", label: "Profile", href: "/profile" },
        ].map((item) => (
          <a key={item.label} href={item.href}
            className="flex flex-col items-center gap-1">
            <span className="text-lg text-gray-400">{item.icon}</span>
            <span className="text-[10px] text-gray-400"
              style={{ fontFamily: "var(--font-manrope)" }}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  )
}