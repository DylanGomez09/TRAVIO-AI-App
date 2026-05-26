import { getTranslations } from "next-intl/server"
import ResetPasswordForm from "./reset-password-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })
  return {
    title: t("resetPassword.title"),
    description: t("resetPassword.description"),
  }
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
