import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { destination, days, budget, interests } = await req.json()

  const prompt = `Eres un concierge de viajes experto. Crea un itinerario detallado para:
- Destino: ${destination}
- Duración: ${days} días
- Presupuesto: ${budget}
- Intereses: ${interests?.join(", ") || "general"}

Responde SOLO con un JSON válido con esta estructura exacta, sin texto adicional:
{
  "destination": "${destination}",
  "days": [
    {
      "day": 1,
      "title": "Título del día",
      "activities": [
        {
          "name": "Nombre de la actividad",
          "description": "Descripción breve",
          "duration_min": 90,
          "cost": 20,
          "category": "culture"
        }
      ]
    }
  ],
  "total_cost": 500
}`

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
  const result = await model.generateContent(prompt)
  const text = result.response.text()

  const clean = text.replace(/```json|```/g, "").trim()
  const itinerary = JSON.parse(clean)

  const trip = await prisma.trip.create({
    data: {
      userId: session.user.id,
      destination,
      days: parseInt(days),
      budget: budget === "budget" ? 500 : budget === "mid" ? 2000 : 5000,
      status: "draft",
      activities: {
        create: itinerary.days.flatMap((day: any) =>
          day.activities.map((act: any, idx: number) => ({
            dayNumber: day.day,
            order: idx,
            name: act.name,
            description: act.description,
            cost: act.cost || 0,
            durationMin: act.duration_min || 60,
            category: act.category || "culture",
          }))
        ),
      },
    },
  })

  return NextResponse.json({ tripId: trip.id, itinerary })
}