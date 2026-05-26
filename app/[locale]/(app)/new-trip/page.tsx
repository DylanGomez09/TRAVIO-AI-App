import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import NewTripForm from "./new-trip-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })
  return {
    title: t("newTrip.title"),
    description: t("newTrip.description"),
  }
}

export default function NewTripPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9F9F9] pt-20 pb-32" />}>
      <NewTripForm />
    </Suspense>
  )
}
