import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { QuoteContactInfo, QuoteProductInfo } from "@/lib/quote-request";

const NAVY = rgb(11 / 255, 29 / 255, 58 / 255);
const BLUE = rgb(47 / 255, 127 / 255, 224 / 255);
const MUTED = rgb(0.42, 0.45, 0.52);
const BORDER = rgb(0.88, 0.89, 0.92);

export async function buildQuoteRequestPdf(params: {
  requestNumber: string;
  submittedAt: Date;
  product: QuoteProductInfo;
  contact: QuoteContactInfo;
}): Promise<Uint8Array> {
  const { requestNumber, submittedAt, product, contact } = params;

  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]); // US Letter, points
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const margin = 56;
  const width = page.getWidth();
  let y = page.getHeight() - margin;

  // ---- logo
  try {
    const logoBytes = await readFile(path.join(process.cwd(), "public", "logo-horizontal-blue.png"));
    const logo = await doc.embedPng(logoBytes);
    const logoW = 150;
    const logoH = (logo.height / logo.width) * logoW;
    page.drawImage(logo, { x: margin, y: y - logoH, width: logoW, height: logoH });
  } catch {
    page.drawText("TORVAULT", { x: margin, y: y - 20, size: 20, font: bold, color: NAVY });
  }

  // ---- title + request number, right-aligned
  const title = "Quote Request";
  const titleSize = 20;
  const titleWidth = bold.widthOfTextAtSize(title, titleSize);
  page.drawText(title, { x: width - margin - titleWidth, y: y - 18, size: titleSize, font: bold, color: NAVY });
  const refLine = `Reference: ${requestNumber}`;
  const refSize = 11;
  const refWidth = font.widthOfTextAtSize(refLine, refSize);
  page.drawText(refLine, { x: width - margin - refWidth, y: y - 36, size: refSize, font, color: BLUE });
  const dateLine = submittedAt.toLocaleString("en-CA", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Toronto",
  });
  const dateWidth = font.widthOfTextAtSize(dateLine, 10);
  page.drawText(dateLine, { x: width - margin - dateWidth, y: y - 52, size: 10, font, color: MUTED });

  y -= 78;
  page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 1, color: BORDER });
  y -= 30;

  function sectionHeading(label: string) {
    page.drawText(label.toUpperCase(), { x: margin, y, size: 10.5, font: bold, color: BLUE });
    y -= 20;
  }

  function fieldRow(rows: { label: string; value: string }[], colWidth: number) {
    const startY = y;
    let maxDrop = 0;
    rows.forEach((row, i) => {
      const x = margin + i * colWidth;
      page.drawText(row.label.toUpperCase(), { x, y: startY, size: 8.5, font, color: MUTED });
      const lines = wrapText(row.value || "—", font, 11, colWidth - 14);
      lines.forEach((line, li) => {
        page.drawText(line, { x, y: startY - 16 - li * 14, size: 11, font: bold, color: NAVY });
      });
      maxDrop = Math.max(maxDrop, 16 + lines.length * 14);
    });
    y = startY - maxDrop - 14;
  }

  function wrapText(text: string, f: PDFFont, size: number, maxWidth: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (f.widthOfTextAtSize(candidate, size) > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
    return lines.slice(0, 3);
  }

  // ---- product requested
  sectionHeading("Product Requested");
  const colW = (width - margin * 2) / 2;
  fieldRow(
    [
      { label: "Product", value: product.label },
      { label: "Model", value: product.model },
    ],
    colW
  );
  fieldRow(
    [
      { label: "Outside Dimensions", value: product.outsideDims },
      { label: "Inside Dimensions", value: product.insideDims },
    ],
    colW
  );
  fieldRow(
    [
      { label: "Weight", value: `${product.weightLbs.toLocaleString()} lbs` },
      { label: "Capacity", value: `${product.capacityCuFt.toFixed(2)} cu ft` },
    ],
    colW
  );

  y -= 10;
  page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 1, color: BORDER });
  y -= 30;

  // ---- submitted by
  sectionHeading("Submitted By");
  fieldRow(
    [
      { label: "Name", value: contact.name },
      { label: "Business Name", value: contact.businessName },
    ],
    colW
  );
  fieldRow(
    [
      { label: "Email", value: contact.email },
      { label: "Phone", value: contact.phone },
    ],
    colW
  );
  fieldRow([{ label: "Region", value: contact.region }], colW);

  if (contact.message.trim()) {
    y -= 6;
    page.drawText("MESSAGE", { x: margin, y, size: 8.5, font, color: MUTED });
    y -= 16;
    const lines = wrapText(contact.message, font, 10.5, width - margin * 2);
    lines.forEach((line) => {
      page.drawText(line, { x: margin, y, size: 10.5, font, color: NAVY });
      y -= 14;
    });
  }

  // ---- footer
  const footerY = 64;
  page.drawLine({ start: { x: margin, y: footerY + 24 }, end: { x: width - margin, y: footerY + 24 }, thickness: 1, color: BORDER });
  drawFooter(page, font, margin, footerY, requestNumber);

  return doc.save();
}

function drawFooter(page: PDFPage, font: PDFFont, margin: number, footerY: number, requestNumber: string) {
  page.drawText(
    `Torvault is sold exclusively through authorized dealers. This request was routed to the dealer fulfilling Torvault inquiries.`,
    { x: margin, y: footerY, size: 8.5, font, color: MUTED }
  );
  page.drawText(`Quote your reference number ${requestNumber} in any follow-up.`, {
    x: margin,
    y: footerY - 13,
    size: 8.5,
    font,
    color: MUTED,
  });
}
