import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email requerido" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({
      message: "Si el email existe, recibirás un enlace.",
    });
  }

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60);

  await prisma.passwordResetToken.create({
    data: { email, token, expires },
  });

  try {
    const result = await resend.emails.send({
      from: "Travio <onboarding@resend.dev>",
      to: "gomezdylan354@gmail.com",
      subject: "Reset your Travio password",
      html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #092634;">Reset your password</h2>
        <p style="color: #666;">Click the button below to reset your Travio password. This link expires in 1 hour.</p>
        <a href="${process.env.NEXTAUTH_URL}/reset-password?token=${token}"
          style="display: inline-block; background: #FF6E42; color: white; padding: 12px 24px; border-radius: 24px; text-decoration: none; font-weight: 500; margin: 16px 0;">
          Reset Password
        </a>
        <p style="color: #999; font-size: 12px;">If you didn't request this, ignore this email.</p>
      </div>
    `,
    });
    console.log("Resend result:", JSON.stringify(result));
  } catch (err) {
    console.error("Resend error:", err);
  }
  return NextResponse.json({
    message: "Si el email existe, recibirás un enlace.",
  });
}
