export type QuoteProductInfo = {
  label: string;
  model: string;
  seriesLabel: string;
  outsideDims: string;
  insideDims: string;
  weightLbs: number;
  capacityCuFt: number;
};

export type QuoteContactInfo = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  region: string;
  message: string;
};

export type QuoteRequestPayload = {
  product: QuoteProductInfo;
  contact: QuoteContactInfo;
};

/** TRQ-YYYYMMDD-XXXX — chronologically sortable, short enough to read over the phone. */
export function generateRequestNumber(date: Date = new Date()): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TRQ-${y}${m}${d}-${rand}`;
}
