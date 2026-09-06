import { createAPIFileRoute } from "@tanstack/react-start/api";
import nodemailer from "nodemailer";

// ─── Types ─────────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  surface?: string;
  message: string;
  rgpd: boolean;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, 2000);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildHtmlEmail(data: ContactPayload): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:8px 12px;color:#6d756f;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
           <td style="padding:8px 12px;color:#17221c;font-size:13px;">${value}</td>
         </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>Nouveau lead — ENERVIA RENOV</title></head>
<body style="margin:0;padding:0;background:#f2efe7;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2efe7;padding:32px 16px;">
    <tr><td>
      <table width="600" cellpadding="0" cellspacing="0" style="margin:0 auto;background:#fff;border-top:4px solid #b9783e;box-shadow:0 8px 32px rgba(23,34,28,.1);">

        <!-- Header -->
        <tr>
          <td style="padding:28px 32px;background:#111814;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#d9a66e;">ENERVIA RENOV</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:#fff;">Nouveau lead reçu</h1>
          </td>
        </tr>

        <!-- Fields -->
        <tr>
          <td style="padding:24px 32px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #ede9e0;border-radius:4px;overflow:hidden;">
              ${row("Nom", data.name)}
              ${row("Email", `<a href="mailto:${data.email}" style="color:#9a6034;">${data.email}</a>`)}
              ${row("Téléphone", data.phone ? `<a href="tel:${data.phone}" style="color:#9a6034;">${data.phone}</a>` : "")}
              ${row("Type de projet", data.projectType)}
              ${row("Surface estimée", data.surface ? `${data.surface} m²` : "")}
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:16px 32px 28px;">
            <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8a9490;">Message</p>
            <div style="background:#f8f5ef;border-left:3px solid #b9783e;padding:16px 20px;font-size:14px;line-height:1.7;color:#35443c;white-space:pre-wrap;">${data.message}</div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;background:#f8f5ef;border-top:1px solid #e8e3d8;">
            <p style="margin:0;font-size:11px;color:#8a9490;">Message reçu via le formulaire de contact de <a href="https://www.enervia.fr" style="color:#9a6034;">enervia.fr</a> — répondre directement à cet email contacte le demandeur.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Route ──────────────────────────────────────────────────────────────────

export const APIRoute = createAPIFileRoute("/api/contact")({
  POST: async ({ request }) => {
    // ── Parse body ──────────────────────────────────────────────────────────
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Requête invalide." }, { status: 400 });
    }

    const data: ContactPayload = {
      name: sanitize(body.name),
      email: sanitize(body.email),
      phone: sanitize(body.phone) || undefined,
      projectType: sanitize(body.projectType),
      surface: sanitize(body.surface) || undefined,
      message: sanitize(body.message),
      rgpd: body.rgpd === true,
    };

    // ── Validation ──────────────────────────────────────────────────────────
    if (!data.name || data.name.length < 2)
      return Response.json({ error: "Nom invalide." }, { status: 422 });
    if (!isValidEmail(data.email))
      return Response.json({ error: "Adresse e-mail invalide." }, { status: 422 });
    if (!data.projectType)
      return Response.json({ error: "Type de projet manquant." }, { status: 422 });
    if (!data.message || data.message.length < 10)
      return Response.json({ error: "Message trop court." }, { status: 422 });
    if (!data.rgpd)
      return Response.json({ error: "Consentement RGPD requis." }, { status: 422 });

    // ── Gmail via Nodemailer ────────────────────────────────────────────────
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const recipientEmail = process.env.LEAD_RECIPIENT_EMAIL ?? "contact@enerviaa.com";

    if (!gmailUser || !gmailAppPassword) {
      console.error("[contact] Variables d'environnement Gmail manquantes.");
      return Response.json(
        { error: "Service temporairement indisponible. Réessayez plus tard." },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailAppPassword },
    });

    try {
      await transporter.sendMail({
        from: `"ENERVIA RENOV — Site" <${gmailUser}>`,
        to: recipientEmail,
        replyTo: `"${data.name}" <${data.email}>`,
        subject: `🏠 Nouveau lead — ${data.projectType} — ${data.name}`,
        html: buildHtmlEmail(data),
        text: [
          `Nom : ${data.name}`,
          `Email : ${data.email}`,
          data.phone ? `Téléphone : ${data.phone}` : "",
          `Projet : ${data.projectType}`,
          data.surface ? `Surface : ${data.surface} m²` : "",
          `\nMessage :\n${data.message}`,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } catch (err) {
      console.error("[contact] Erreur envoi Gmail :", err);
      return Response.json(
        { error: "Impossible d'envoyer le message. Réessayez dans quelques instants." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  },
});
