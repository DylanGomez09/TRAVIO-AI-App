import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null

          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          })

          if (!user) {
            console.error("[auth] Usuario no encontrado:", credentials.email)
            return null
          }

          if (!user.passwordHash) {
            console.error("[auth] Usuario sin passwordHash:", user.email)
            return null
          }

          const valid = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          )

          if (!valid) {
            console.error("[auth] Contraseña incorrecta para:", user.email)
            return null
          }

          return { id: user.id, email: user.email, name: user.name }
        } catch (error) {
          console.error("[auth] Error en authorize:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      return session
    },
  },
})