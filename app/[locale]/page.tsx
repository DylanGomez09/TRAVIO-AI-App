import { getTranslations } from "next-intl/server"
import LandingContent from "./landing-content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })
  return {
    title: t("home.title"),
    description: t("home.description"),
  }
}

export default function LandingPage() {
  return <LandingContent />
}
