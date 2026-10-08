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
};

export const SERIES_CONTENT: Record<SafeSeries, SeriesContent> = {
  "fire-burglary": {
    series: "fire-burglary",
    slug: "fire-burglary",
    label: "Fire & Burglary",
    badge: "Entry Line",
    image: "/safe-fire-burglary.jpg",
    imageAlt: "Torvault Fire & Burglary safe, navy blue steel body with digital keypad",
    chips: ["Factory Fire Tested", "Reinforced Steel Body"],
    metaDescription:
      "Torvault Fire & Burglary safes: factory fire-tested, reinforced burglary-resistant body, 11 sizes built to order. Spec sheets and dealer quotes available.",
    intro: [
      "Torvault's entry line pairs a factory fire-tested body with a reinforced burglary-resistant construction, tested against common mechanical tools across a net working time of five minutes on every side. It's built for operations where document and cash protection matter more than resisting a determined, tooled attack.",
      "A single-wall 12-gauge steel body wraps a UL Class 350 fire chamber, holding internal temperature below 350°F — the threshold at which paper begins to char — for a full hour inside a fire that can reach 1,700°F outside the safe.",
    ],
    specCells: [
      { v: "1–Hr / 350°F", k: "Fire Rating" },
      { v: "12 ga steel", k: "Body Construction" },
      { v: "Single-wall", k: "Door Type" },
      { v: "Dial or keypad", k: "Locking" },
      { v: "Forced-Entry Tested", k: "Burglary Rating" },
      { v: "5 min, all sides", k: "Net Working Time" },
    ],
    bestFor:
      "home offices, retail back-rooms, and small-business petty cash or document storage where fire protection is the priority and forced-entry risk is limited.",
    features: [
      "Euro Grade I security, certified to EN 1143-1 European standards for maximum burglary resistance.",
      "Manufactured under the ISO 9001:2015 quality management system.",
      "Built for burglary resistance with advanced security features to safeguard your valuables.",
      "60-minute fire protection for added safety.",
      "Advanced four-directional live bolt-works.",
      "Precision-engineered European locking system secures the door in all directions — up, down, left, and right — for maximum protection.",
      "25mm heavy-duty stainless steel bolts designed to withstand direct cutting attempts, reinforcing resistance against forced entry.",
      "Multi-layered construction: advanced composite barrier materials enhance burglary resistance and structural durability.",
      "European RAL standard paint with a 5-layer coating for enhanced durability and a professional finish.",
      "Key lock, combination lock, and electronic lock options available to meet your specific security needs.",
    ],
  },
  tl15: {
    series: "tl15",
    slug: "tl15",
    label: "TL-15 High Security",
    badge: "Most Requested",
    image: "/safe-tl15.jpg",
    imageAlt: "Torvault TL-15 High Security safe, navy blue steel body with dial lock and white trim",
    chips: ["UL TL-15", "Composite Hardplate"],
    metaDescription:
      "Torvault TL-15 High Security safes: 15-minute UL-rated door, composite hardplate, 10 sizes built to order. Spec sheets and dealer quotes available.",
    intro: [
      "The TL-15 rating means the door has withstood a 15-minute net working time attack by a professional safe technician using common hand tools, power drills, punches, hammers, and pressure-applying devices — the clock only runs while a tool is actually working the safe. It's the rating most Canadian bank branches, pharmacies, and jewelry counters are built to.",
      "A 1-inch solid steel body is backed by a composite hardplate over the lock and boltwork, with two-way spring-loaded relocking bolts that jam the mechanism if the primary lock is attacked directly.",
    ],
    specCells: [
      { v: "15 min, door", k: "Net Working Time" },
      { v: "1″ solid", k: "Steel Body" },
      { v: "Composite", k: "Hardplate" },
      { v: "2-way", k: "Relocking Bolts" },
      { v: "UL Type 1", k: "Electronic Lock" },
      { v: "Optional", k: "Fire Add-On" },
    ],
    bestFor:
      "bank branches, pharmacies holding controlled substances, and jewelry counters that need a documented forced-entry standard for daytime, high-access storage.",
    features: [
      "Built to the highest security standards under the ISO 9001:2015 quality management system.",
      "Designed for maximum burglary resistance in commercial and high-risk environments.",
      "2-hour fire protection for added safety.",
      "Advanced four-directional live bolt-works.",
      "Precision-engineered European locking system secures the door in all directions — up, down, left, and right — for maximum protection.",
      "30mm heavy-duty rotational stainless steel bolts designed to withstand direct cutting attempts, reinforcing resistance against forced entry.",
      "High-security composite construction ensures structural durability and burglary resistance.",
      "Tempered-glass relocking system triggers an automatic relocker if the safe is tampered with.",
      "Reinforced manganese steel plate protects the lock and bolt-works against drilling and forced access.",
      "Pre-drilled anchoring holes allow secure installation to concrete floors, preventing unauthorized removal.",
      "European RAL standard paint with a 5-layer coating for enhanced durability and an elegant finish.",
      "Key lock, combination lock, and electronic lock options available to meet your specific security requirements.",
    ],
  },
  tl30: {
    series: "tl30",
    slug: "tl30",
    label: "TL-30 High Security",
    badge: "Flagship",
    image: "/safe-tl30.jpg",
    imageAlt: "Torvault TL-30 High Security flagship vault safe, navy blue steel body with chrome locking wheel",
    chips: ["UL TL-30", "Six-Side Resistance"],
    metaDescription:
      "Torvault TL-30 High Security safes: 30-minute six-side UL rating, 1.5-inch solid steel body, 10 sizes built to order. Spec sheets and dealer quotes available.",
    intro: [
      "TL-30 raises the net working time to 30 minutes and adds abrasive cutting wheels and power saws to the tool list — and unlike the Fire & Burglary or TL-15 lines, the rating applies to every side of the body, not just the door. It's Torvault's flagship line, built for operations where a breach anywhere on the box is an unacceptable outcome.",
      "A 1.5-inch solid steel body carries a composite hardplate across all six sides, a 3.25-inch door, and four-way spring-loaded relocking bolts. The combination is the standard specification for cash-in-transit depots, large jewelers, and high-volume cash rooms.",
    ],
    specCells: [
      { v: "30 min, 6 sides", k: "Net Working Time" },
      { v: "1.5″ solid", k: "Steel Body" },
      { v: "3.25″", k: "Door Thickness" },
      { v: "4-way", k: "Relocking Bolts" },
      { v: "UL Type 1", k: "Electronic Lock" },
      { v: "Included", k: "Torch Resistance" },
    ],
    bestFor:
      "cash-in-transit depots, high-volume jewelers, and evidence or valuables rooms that require a six-side rating rather than a reinforced door on an otherwise standard body.",
    features: [
      "Built to the highest security standards under the ISO 9001:2015 quality management system.",
      "Designed for maximum burglary resistance in commercial and high-risk environments.",
      "2-hour fire protection for added safety.",
      "Advanced four-directional live bolt-works extended across all six sides of the body.",
      "Precision-engineered European locking system secures the door in all directions — up, down, left, and right — for maximum protection.",
      "30mm heavy-duty rotational stainless steel bolts designed to withstand direct cutting attempts, reinforcing resistance against forced entry.",
      "High-security composite construction spans all six sides for structural durability and burglary resistance.",
      "Tempered-glass relocking system triggers an automatic relocker if the safe is tampered with.",
      "Reinforced manganese steel plate protects the lock and bolt-works against drilling and forced access.",
      "Pre-drilled anchoring holes allow secure installation to concrete floors, preventing unauthorized removal.",
      "European RAL standard paint with a 5-layer coating for enhanced durability and an elegant finish.",
      "Key lock, combination lock, and electronic lock options available to meet your specific security requirements.",
    ],
  },
};

export const SERIES_LIST: SafeSeries[] = ["fire-burglary", "tl15", "tl30"];

export function modelsBySeries(series: SafeSeries): SafeModel[] {
  return SAFE_MODELS.filter((m) => m.series === series);
}

function fmtIn(n: number): string {
  return `${Number.isInteger(n) ? n : n.toFixed(2).replace(/0$/, "")}″`;
}

export function dims(h: number, w: number, d: number): string {
  return `${fmtIn(h)} H × ${fmtIn(w)} W × ${fmtIn(d)} D`;
}

export function seriesSizeRange(series: SafeSeries): { min: number; max: number } {
  const weights = modelsBySeries(series).map((m) => m.weight);
  return { min: Math.min(...weights), max: Math.max(...weights) };
}
