"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ConfirmButton({ tripId }: { tripId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    setLoading(true)
    await fetch(`/api/trip/${tripId}/confirm`, { method: "PATCH" })
    router.push("/dashboard")
  }

  return (
    <button
      onClick={handleConfirm}
      disabled={loading}
      className="flex-1 bg-[#FF6E42] text-white rounded-full py-3 text-sm font-medium hover:bg-[#e85e35] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
      {loading ? "Saving..." : "Confirm & Save ✓"}
    </button>
  )
}
