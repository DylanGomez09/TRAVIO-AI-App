import { getTranslations } from "next-intl/server"
import ProfileContent from "./profile-content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })
  return {
    title: t("profile.title"),
    description: t("profile.description"),
  }
}

export default function ProfilePage() {
  return <ProfileContent />
}
