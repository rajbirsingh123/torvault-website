import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildQuoteRequestPdf } from "@/lib/pdf/quote-pdf";
import { generateRequestNumber, type QuoteRequestPayload } from "@/lib/quote-request";

export const runtime = "nodejs";

const TO_EMAIL = process.env.QUOTE_TO_EMAIL || "Sales@TorontoSafes.ca";

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function validate(payload: Partial<QuoteRequestPayload>): string | null {
  const c = payload.contact;
  const p = payload.product;
  if (!c || !isNonEmptyString(c.name)) return "Name is required.";
  if (!c.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) return "A valid email is required.";
  if (!isNonEmptyString(c.phone)) return "Phone is required.";
  if (!p || !isNonEmptyString(p.model) || !isNonEmptyString(p.label)) return "Missing product information.";
  return null;
}

export async function POST(req: Request) {
  let payload: Partial<QuoteRequestPayload>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const contact = {
    name: payload.contact!.name.trim(),
    email: payload.contact!.email.trim(),
    phone: payload.contact!.phone.trim(),
    businessName: payload.contact!.businessName?.trim() || "",
    region: payload.contact!.region?.trim() || "",
    message: payload.contact!.message?.trim() || "",
  };
  const product = payload.product!;

  const requestNumber = generateRequestNumber();
  const submittedAt = new Date();

  let pdfBytes: Uint8Array;
  try {
    pdfBytes = await buildQuoteRequestPdf({ requestNumber, submittedAt, product, contact });
  } catch (err) {
    console.error("[quote-request] PDF generation failed:", err);
    return NextResponse.json({ error: "Could not generate your quote request. Please try again." }, { status: 500 });
  }

  const pdfBase64 = Buffer.from(pdfBytes).toString("base64");
  const fileName = `Torvault-Quote-${requestNumber}.pdf`;

  let emailSent = false;
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.QUOTE_FROM_EMAIL || "Torvault Quotes <onboarding@resend.dev>",
        to: TO_EMAIL,
        replyTo: contact.email,
        subject: `Torvault Quote Request — ${product.model} (${requestNumber})`,
        text: [
          `New quote request from the Torvault website — reference ${requestNumber}.`,
          "",
          `Product: ${product.label}`,
          `Model: ${product.model}`,
          `Outside Dimensions: ${product.outsideDims}`,
          `Inside Dimensions: ${product.insideDims}`,
          `Weight: ${product.weightLbs} lbs`,
          `Capacity: ${product.capacityCuFt.toFixed(2)} cu ft`,
          "",
          `Name: ${contact.name}`,
          `Business Name: ${contact.businessName || "—"}`,
          `Email: ${contact.email}`,
          `Phone: ${contact.phone}`,
          `Region: ${contact.region || "—"}`,
          "",
          "Message:",
          contact.message || "—",
        ].join("\n"),
        attachments: [{ filename: fileName, content: pdfBase64 }],
      });
      emailSent = true;
    } catch (err) {
      console.error("[quote-request] Email send failed:", err);
    }
  } else {
    console.warn(
      "[quote-request] RESEND_API_KEY is not set — skipping email send. Request",
      requestNumber,
      "was not emailed to",
      TO_EMAIL
    );
  }

  return NextResponse.json({
    requestNumber,
    pdfBase64,
    fileName,
    emailSent,
  });
}
