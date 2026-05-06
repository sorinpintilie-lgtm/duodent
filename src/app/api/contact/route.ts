import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

function escapeHtml(value: unknown) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.website && body.website.trim()) {
      return NextResponse.json({
        success: true,
        message: "Mesajul a fost trimis cu succes.",
      });
    }

    const name = escapeHtml(body.name);
    const phone = escapeHtml(body.phone);
    const email = escapeHtml(body.email);
    const location = escapeHtml(body.location);
    const message = escapeHtml(body.message);

    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Numele și telefonul sunt obligatorii.",
        },
        { status: 400 }
      );
    }

    if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL || !process.env.SENDGRID_TO_EMAIL) {
      return NextResponse.json(
        {
          success: false,
          message: "Configurarea formularului nu este completă.",
        },
        { status: 500 }
      );
    }

    await sgMail.send({
      to: process.env.SENDGRID_TO_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      replyTo: email || process.env.SENDGRID_FROM_EMAIL,
      subject: `Programare nouă - Duo Dent${location ? ` ${location}` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
          <h2>Programare nouă de pe site-ul Duo Dent</h2>

          <p><strong>Nume:</strong> ${name}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || "Nu a fost completat"}</p>
          <p><strong>Locație:</strong> ${location || "Nu a fost selectată"}</p>

          <p><strong>Mesaj:</strong></p>
          <p>${message || "Nu a fost completat"}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Mesajul a fost trimis cu succes.",
    });
  } catch (error) {
    console.error("SendGrid error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "A apărut o eroare. Te rugăm să încerci din nou.",
      },
      { status: 500 }
    );
  }
}