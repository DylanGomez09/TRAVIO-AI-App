import { MetadataRoute } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

const locales = ["en", "es"] as const

const routes = [
  "",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/explore",
  "/dashboard",
  "/saved",
  "/concierge",
  "/new-trip",
  "/profile",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    const url = (locale: string) =>
      `${siteUrl}/${locale}${route}`.replace(/\/$/, "")

    entries.push({
      url: url("en"),
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, url(l)]),
        ),
      },
    })
  }

  return entries
}
