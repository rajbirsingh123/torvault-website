export type SafeSeries = "fire-burglary" | "tl15" | "tl30";

export type SafeModel = {
  model: string;
  series: SafeSeries;
  outsideH: number;
  outsideW: number;
  outsideD: number;
  insideH: number;
  insideW: number;
  insideD: number;
  weight: number;
  capacity: number;
};

export const SERIES_LABELS: Record<SafeSeries, string> = {
  "fire-burglary": "Fire & Burglary",
  tl15: "TL‑15 High Security",
  tl30: "TL‑30 High Security",
};

export const SAFE_MODELS: SafeModel[] = [
  { model: "BF-914", series: "fire-burglary", outsideH: 14, outsideW: 19, outsideD: 18, insideH: 9.75, insideW: 14.75, insideD: 11.5, weight: 230, capacity: 0.96 },
  { model: "BF-1313", series: "fire-burglary", outsideH: 17.5, outsideW: 17.5, outsideD: 17.75, insideH: 13.25, insideW: 13.25, insideD: 11.5, weight: 250, capacity: 1.17 },
  { model: "BF-1515", series: "fire-burglary", outsideH: 19.75, outsideW: 19.75, outsideD: 17.75, insideH: 15.75, insideW: 15.75, insideD: 11.5, weight: 300, capacity: 1.65 },
  { model: "BF-2115", series: "fire-burglary", outsideH: 25.75, outsideW: 19.75, outsideD: 17.75, insideH: 21.5, insideW: 15.75, insideD: 11.5, weight: 350, capacity: 2.25 },
  { model: "BF-2119", series: "fire-burglary", outsideH: 25.75, outsideW: 23.75, outsideD: 21, insideH: 21.5, insideW: 19.5, insideD: 14.75, weight: 450, capacity: 3.58 },
  { model: "BF-2715", series: "fire-burglary", outsideH: 31.5, outsideW: 19.75, outsideD: 17.75, insideH: 27.5, insideW: 15.75, insideD: 11.5, weight: 420, capacity: 2.88 },
  { model: "BF-3518", series: "fire-burglary", outsideH: 39.5, outsideW: 22.25, outsideD: 21.75, insideH: 35.25, insideW: 18, insideD: 15.5, weight: 590, capacity: 5.69 },
  { model: "BF-4318", series: "fire-burglary", outsideH: 47.25, outsideW: 22.25, outsideD: 21.75, insideH: 43.25, insideW: 18, insideD: 15.5, weight: 690, capacity: 6.98 },
  { model: "BF-5118", series: "fire-burglary", outsideH: 55.25, outsideW: 22.25, outsideD: 21.75, insideH: 51, insideW: 18, insideD: 15.5, weight: 770, capacity: 8.23 },
  { model: "BF-6322", series: "fire-burglary", outsideH: 67, outsideW: 26.5, outsideD: 23.75, insideH: 63, insideW: 22.25, insideD: 17.5, weight: 1100, capacity: 14.2 },
  { model: "BF-6831", series: "fire-burglary", outsideH: 71, outsideW: 35.5, outsideD: 23.75, insideH: 68.75, insideW: 31.5, insideD: 17.5, weight: 1450, capacity: 21.93 },
  { model: "15-1114", series: "tl15", outsideH: 16.75, outsideW: 19.75, outsideD: 19.75, insideH: 11, insideW: 14, insideD: 11.75, weight: 463, capacity: 1.05 },
  { model: "15-2016", series: "tl15", outsideH: 25.75, outsideW: 22.5, outsideD: 21.75, insideH: 20, insideW: 16.75, insideD: 12.5, weight: 750, capacity: 2.42 },
  { model: "15-2618", series: "tl15", outsideH: 31.5, outsideW: 23.75, outsideD: 21.75, insideH: 25.75, insideW: 18, insideD: 12, weight: 926, capacity: 3.22 },
  { model: "15-3318", series: "tl15", outsideH: 39.5, outsideW: 23.75, outsideD: 21.75, insideH: 33.75, insideW: 18, insideD: 12, weight: 1144, capacity: 4.22 },
  { model: "15-3720", series: "tl15", outsideH: 43.5, outsideW: 25.75, outsideD: 23.75, insideH: 37.75, insideW: 20, insideD: 13.75, weight: 1433, capacity: 6.01 },
  { model: "15-4520", series: "tl15", outsideH: 51.25, outsideW: 26, outsideD: 24.5, insideH: 45.5, insideW: 20.25, insideD: 14.75, weight: 1620, capacity: 7.86 },
  { model: "15-5724", series: "tl15", outsideH: 63, outsideW: 29.75, outsideD: 25.75, insideH: 57.25, insideW: 24, insideD: 15.75, weight: 2376, capacity: 12.52 },
  { model: "15-5736", series: "tl15", outsideH: 63, outsideW: 42, outsideD: 29, insideH: 57.5, insideW: 36.5, insideD: 19.25, weight: 2750, capacity: 23.38 },
  { model: "15-6629", series: "tl15", outsideH: 72.5, outsideW: 34.75, outsideD: 29.25, insideH: 66.75, insideW: 29, insideD: 19.25, weight: 2937, capacity: 21.56 },
  { model: "15-7337", series: "tl15", outsideH: 79.25, outsideW: 43.5, outsideD: 33.25, insideH: 73.5, insideW: 37.75, insideD: 23.25, weight: 2355, capacity: 37.33 },
  { model: "30-1114", series: "tl30", outsideH: 16.75, outsideW: 19.75, outsideD: 19.75, insideH: 11, insideW: 14, insideD: 11.75, weight: 480, capacity: 1.05 },
  { model: "30-2016", series: "tl30", outsideH: 25.75, outsideW: 22.5, outsideD: 21.75, insideH: 20, insideW: 16.75, insideD: 12.5, weight: 836, capacity: 2.42 },
  { model: "30-2618", series: "tl30", outsideH: 31.5, outsideW: 23.75, outsideD: 21.75, insideH: 25.75, insideW: 18, insideD: 12, weight: 1005, capacity: 3.22 },
  { model: "30-3318", series: "tl30", outsideH: 39.5, outsideW: 23.75, outsideD: 21.75, insideH: 33.75, insideW: 18, insideD: 12, weight: 1364, capacity: 4.22 },
  { model: "30-3720", series: "tl30", outsideH: 43.5, outsideW: 25.75, outsideD: 23.75, insideH: 37.75, insideW: 20, insideD: 14, weight: 1463, capacity: 6.12 },
  { model: "30-4520", series: "tl30", outsideH: 51.25, outsideW: 26, outsideD: 24.5, insideH: 45.5, insideW: 20.25, insideD: 14.75, weight: 1742, capacity: 7.86 },
  { model: "30-5724", series: "tl30", outsideH: 63, outsideW: 29.75, outsideD: 25.75, insideH: 57.25, insideW: 24, insideD: 15.75, weight: 2450, capacity: 12.52 },
  { model: "30-5735", series: "tl30", outsideH: 63, outsideW: 41.5, outsideD: 29.25, insideH: 57.25, insideW: 35.75, insideD: 19.25, weight: 3080, capacity: 22.8 },
  { model: "30-6629", series: "tl30", outsideH: 72.5, outsideW: 34.75, outsideD: 29.25, insideH: 66.75, insideW: 29, insideD: 19.25, weight: 3050, capacity: 21.56 },
  { model: "30-7337", series: "tl30", outsideH: 79.25, outsideW: 43.5, outsideD: 33.25, insideH: 73.5, insideW: 37.75, insideD: 23.25, weight: 4130, capacity: 37.33 },
];

export type SpecCell = { v: string; k: string };

export type FaqItem = { question: string; answer: string };

export type SeriesContent = {
  series: SafeSeries;
  slug: string;
  label: string;
  badge: string;
  image: string;
  imageAlt: string;
  chips: [string, string];
  metaDescription: string;
  intro: string[];
  specCells: SpecCell[];
  bestFor: string;
  features: string[];
  faqs: FaqItem[];
};

/** Structural, non-translatable fields only — text content lives in messages/*.json under "products.<messageKey>" and is merged in via getSeriesContent(). */
export type SeriesStructural = {
  series: SafeSeries;
  slug: string;
  image: string;
  imageAlt: string;
  messageKey: "fireBurglary" | "tl15" | "tl30";
};

export const SERIES_STRUCTURAL: Record<SafeSeries, SeriesStructural> = {
  "fire-burglary": {
    series: "fire-burglary",
    slug: "fire-burglary",
    image: "/products/graphite/01-torvault-front-closed.jpg",
    imageAlt: "Torvault Fire & Burglary safe, graphite finish, door closed",
    messageKey: "fireBurglary",
  },
  tl15: {
    series: "tl15",
    slug: "tl15",
    image: "/products/tl-black-hero-v2.jpg",
    imageAlt: "Torvault TL-15 High Security safe, black finish, angled view of the steel body and locking wheel",
    messageKey: "tl15",
  },
  tl30: {
    series: "tl30",
    slug: "tl30",
    image: "/products/tl-black-hero-v2.jpg",
    imageAlt: "Torvault TL-30 High Security flagship vault safe, black finish, angled view of the steel body and locking wheel",
    messageKey: "tl30",
  },
};

export const SERIES_LIST: SafeSeries[] = ["fire-burglary", "tl15", "tl30"];

export function modelsBySeries(series: SafeSeries): SafeModel[] {
  return SAFE_MODELS.filter((m) => m.series === series);
}

export function fmtIn(n: number): string {
  return `${Number.isInteger(n) ? n : n.toFixed(2).replace(/0$/, "")}″`;
}

export function dims(h: number, w: number, d: number): string {
  return `${fmtIn(h)} H × ${fmtIn(w)} W × ${fmtIn(d)} D`;
}

export function seriesSizeRange(series: SafeSeries): { min: number; max: number } {
  const weights = modelsBySeries(series).map((m) => m.weight);
  return { min: Math.min(...weights), max: Math.max(...weights) };
}

export function quoteHref(model: string, seriesLabel: string): string {
  const subject = encodeURIComponent(`Torvault ${model} — Spec Sheet & Quote Request`);
  const body = encodeURIComponent(
    `Hi Torvault team,\n\nPlease send pricing and availability for the ${model} (${seriesLabel} series).\n\nBusiness name:\nRegion:\n`
  );
  return `mailto:Sales@TorontoSafes.ca?subject=${subject}&body=${body}`;
}
