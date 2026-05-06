import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

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

    if (body.website && String(body.website).trim()) {
      return NextResponse.json({
        success: true,
        message: "Mesajul a fost trimis cu succes.",
      });
    }

    const missingEnv = [
      !process.env.SENDGRID_API_KEY ? "SENDGRID_API_KEY" : null,
      !process.env.SENDGRID_FROM_EMAIL ? "SENDGRID_FROM_EMAIL" : null,
      !process.env.SENDGRID_TO_EMAIL ? "SENDGRID_TO_EMAIL" : null,
    ].filter(Boolean);

    if (missingEnv.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Configurarea formularului nu este completă.",
          missingEnv,
        },
        { status: 500 }
      );
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const name = escapeHtml(body.name);
    const phone = escapeHtml(body.phone);
    const email = escapeHtml(body.email);
    const location = escapeHtml(body.location);
    const message = escapeHtml(body.message);

    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Completează numele și numărul de telefon.",
        },
        { status: 400 }
      );
    }

    await sgMail.send({
      to: process.env.SENDGRID_TO_EMAIL as string,
      from: process.env.SENDGRID_FROM_EMAIL as string,
      replyTo: email || (process.env.SENDGRID_FROM_EMAIL as string),
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
      message:
        "Cererea a fost trimisă cu succes. Te vom contacta în cel mai scurt timp.",
    });
  } catch (error: any) {
    console.error("SendGrid contact form error:", {
      message: error?.message,
      code: error?.code,
      response: error?.response?.body,
    });

    return NextResponse.json(
      {
        success: false,
        message:
          "Mesajul nu a putut fi trimis. Te rugăm să încerci din nou sau să ne contactezi telefonic.",
      },
      { status: 500 }
    );
  }
}