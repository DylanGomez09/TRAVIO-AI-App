import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { message, history } = await req.json();

  const trips = await prisma.trip.findMany({
    where: { userId: session.user.id },
    include: { activities: true },
    take: 5,
  });

  const tripsContext = trips
    .map(
      (t) =>
        `- ${t.destination} (${t.days} days, ${t.status}): ${t.activities.map((a) => a.name).join(", ")}`,
    )
    .join("\n");

  const systemPrompt = `You are Travio's AI travel concierge — an expert, warm, and knowledgeable travel advisor.

The user's saved trips:
${tripsContext || "No trips yet."}

Your role:
- Answer travel questions with expertise
- Give personalized recommendations based on their trips
- Help adjust or improve existing itineraries
- Suggest destinations, activities, restaurants, hotels
- Be concise but insightful — max 3-4 sentences per response unless asked for more

Always respond in the same language the user writes in.`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const chat = model.startChat({
    history: [
      { role: "user", parts: [{ text: systemPrompt }] },
      {
        role: "model",
        parts: [
          {
            text: "Understood. I'm ready to help as Travio's travel concierge.",
          },
        ],
      },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
    ],
  });

  const result = await chat.sendMessage(message);
  const response = result.response.text();

  return NextResponse.json({ response });
}
