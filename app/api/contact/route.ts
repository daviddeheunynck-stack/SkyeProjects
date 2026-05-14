import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, projectType, scope, deadline, budget, message } = await req.json();

  if (!name || !email || !projectType || !scope) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0A0A0F;color:#E8E8F0;padding:40px;border-radius:12px;">
      <h2 style="color:#7F77DD;margin-top:0;">Nouvelle demande de devis</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${[
          ["Nom", name],
          ["Email", `<a href="mailto:${email}" style="color:#7F77DD">${email}</a>`],
          ["Type de projet", projectType],
          ["Périmètre", scope],
          ["Deadline", deadline || "Non précisée"],
          ["Budget", budget || "Non défini"],
          ...(message ? [["Message", message]] : []),
        ]
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1E1E2A;color:#6B6B80;font-size:12px;text-transform:uppercase;letter-spacing:.1em;width:35%;vertical-align:top">${label}</td>
            <td style="padding:12px 0;border-bottom:1px solid #1E1E2A;white-space:pre-line">${value}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[Devis] ${projectType} — ${name}`,
      html,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
  }
}
