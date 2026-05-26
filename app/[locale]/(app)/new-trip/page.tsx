"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

export default function NewTripPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9F9F9] pt-20 pb-32" />}>
      <NewTripForm />
    </Suspense>
  )
}

function NewTripForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations("newTrip")
  const editId = searchParams.get("edit")

  const interests = [t("interestCulture"), t("interestCulinary"), t("interestWellness"), t("interestAdventure"), t("interestArchitecture"), t("interestSeclusion")]

  const budgetTiers = [
    { value: "budget", label: t("budgetBudget") },
    { value: "mid", label: t("budgetMid") },
    { value: "luxury", label: t("budgetLuxury") },
  ]
  const [destination, setDestination] = useState("")
  const [days, setDays] = useState("")
  const [budget, setBudget] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editId) {
      fetch("/api/trip/" + editId)
        .then(res => res.json())
        .then(data => {
          setDestination(data.destination || "")
          setDays(String(data.days || ""))
          setBudget(data.budget === 500 ? "budget" : data.budget === 2000 ? "mid" : "luxury")
        })
        .catch(() => {})
    }
  }, [editId])

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
    router.push("/trip/loading?destination=" + destination + "&days=" + days + "&budget=" + budget + "&interests=" + selectedInterests.join(","))
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-20 pb-32">
      <div className="max-w-lg mx-auto">

      <div className="px-6 mt-4">
        <h1 className="text-4xl font-bold text-[#092634] text-center mb-2">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-400 text-center mb-10 max-w-sm mx-auto">
          {t("subtitle")}
        </p>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-base font-semibold text-[#092634] mb-5">
            {t("logisticsTitle")}
          </h2>

          <div className="mb-4">
            <label className="text-xs text-gray-400 mb-1 block">
              {t("destinationLabel")}
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-2">
              <span className="text-gray-300">âŠ•</span>
              <input
                type="text"
                placeholder={t("destinationPlaceholder")}
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="flex-1 outline-none text-sm bg-transparent text-[#092634] placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">
                {t("durationLabel")}
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-2">
                <span className="text-gray-300">ðŸ“…</span>
                <input
                  type="number"
                  placeholder={t("durationPlaceholder")}
                  min={1}
                  max={30}
                  value={days}
                  onChange={e => setDays(e.target.value)}
                  className="flex-1 outline-none text-sm bg-transparent text-[#092634] placeholder:text-gray-300"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">
                {t("budgetLabel")}
              </label>
              <select
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent text-[#092634] outline-none">
                <option value="">{t("budgetPlaceholder")}</option>
                {budgetTiers.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="text-base font-semibold text-[#092634] mb-2">
            {t("interestsTitle")}
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            {t("interestsDesc")}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {interests.map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={selectedInterests.includes(interest) ? "bg-[#FF6E42] text-white rounded-full px-4 py-2 text-sm transition-colors" : "border border-gray-200 text-[#092634] hover:border-[#FF6E42] rounded-full px-4 py-2 text-sm transition-colors"}>
                {interest}
              </button>
            ))}
            <button className="border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-400 hover:border-[#FF6E42]">
              {t("interestCustom")}
            </button>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!destination || !days || !budget || loading}
            className="w-full bg-[#FF6E42] text-white rounded-full py-4 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#e85e35] transition-colors disabled:opacity-50">
            {t("submit")}
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            {t("submitNote")}
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}



