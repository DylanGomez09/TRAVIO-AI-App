import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { id } = await params

  const trip = await prisma.trip.findUnique({
    where: { id, userId: session.user.id },
  })

  if (!trip) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(trip)
}
