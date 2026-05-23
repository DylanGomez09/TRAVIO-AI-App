import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const { email, password, name } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email y password son requeridos" },
      { status: 400 }
    )
  }

  const existing = await prisma.user.findUnique({ where: { email } })

  if (existing) {
    return NextResponse.json(
      { error: "El email ya está registrado" },
      { status: 400 }
    )
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, name, passwordHash },
  })

  return NextResponse.json({ id: user.id, email: user.email })
}