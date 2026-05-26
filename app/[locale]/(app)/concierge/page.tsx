import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import ConciergeContent from "./concierge-content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })
  return {
    title: t("concierge.title"),
    description: t("concierge.description"),
  }
}

export default function ConciergePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9F9F9] pt-20" />}>
      <ConciergeContent />
    </Suspense>
  )
}
