import { getTranslations } from "next-intl/server"
import LoginForm from "./login-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })
  return {
    title: t("login.title"),
    description: t("login.description"),
  }
}

export default function LoginPage() {
  return <LoginForm />
}
