import { getTranslations } from "next-intl/server"
import ForgotPasswordForm from "./forgot-password-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })
  return {
    title: t("forgotPassword.title"),
    description: t("forgotPassword.description"),
  }
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
