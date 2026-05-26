import { getTranslations } from "next-intl/server"
import RegisterForm from "./register-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })
  return {
    title: t("register.title"),
    description: t("register.description"),
  }
}

export default function RegisterPage() {
  return <RegisterForm />
}
