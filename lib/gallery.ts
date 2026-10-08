export type PhotoFinish = "graphite" | "black";
export type Finish = PhotoFinish | "navy" | "burgundy" | "sandstone";

export type GalleryImage = { src: string; alt: string };

export type FinishDef = {
  id: Finish;
  label: string;
  swatch: string;
  /** "photo": real photography exists for this finish.
   *  "tint": simulated in CSS by recoloring the base photo set (no photography shot in this finish). */
  mode: "photo" | "tint";
  /** CSS color used to recolor the base photo via mix-blend-mode, "tint" finishes only. */
  tint?: string;
};

export const FINISHES: FinishDef[] = [
  { id: "graphite", label: "Graphite", swatch: "#5b6472", mode: "photo" },
  { id: "black", label: "Black", swatch: "#17181c", mode: "photo" },
  { id: "navy", label: "Navy Blue", swatch: "#1d3a63", mode: "tint", tint: "#2a4a78" },
  { id: "burgundy", label: "Burgundy", swatch: "#5c1824", mode: "tint", tint: "#691d29" },
  { id: "sandstone", label: "Sandstone", swatch: "#b9ac8e", mode: "tint", tint: "#c3b494" },
];

/** Finishes with real photography — what the homepage quick-view can safely show. */
export const PHOTO_FINISHES: FinishDef[] = FINISHES.filter((f) => f.mode === "photo");

const PHOTO_GALLERY: Record<PhotoFinish, GalleryImage[]> = {
  graphite: [
    { src: "/products/graphite/01-torvault-front-closed.jpg", alt: "Torvault safe, graphite finish, door closed" },
    { src: "/products/graphite/02-torvault-front-open.jpg", alt: "Torvault safe, graphite finish, door open showing interior shelf" },
    { src: "/products/graphite/03-torvault-angled-view.jpg", alt: "Torvault safe, graphite finish, angled three-quarter view" },
    { src: "/products/graphite/04-torvault-rear-side-view.jpg", alt: "Torvault safe, graphite finish, rear and side panel view" },
    { src: "/products/graphite/05-torvault-interior-detail.jpg", alt: "Torvault safe, graphite finish, interior boltwork detail" },
  ],
  black: [
    { src: "/products/black/01-torvault-black-front-closed.jpg", alt: "Torvault safe, black finish, door closed" },
    { src: "/products/black/02-torvault-black-front-open.jpg", alt: "Torvault safe, black finish, door open showing interior shelf" },
    { src: "/products/black/03-torvault-black-angled-view.jpg", alt: "Torvault safe, black finish, angled three-quarter view" },
    { src: "/products/black/04-torvault-black-rear-side.jpg", alt: "Torvault safe, black finish, rear and side panel view" },
    { src: "/products/black/05-torvault-black-interior-detail.jpg", alt: "Torvault safe, black finish, interior boltwork detail" },
  ],
};

/** Photo set recolored in CSS to stand in for finishes with no photography yet. */
const TINT_BASE: PhotoFinish = "graphite";

export function getFinishDef(id: Finish): FinishDef {
  return FINISHES.find((f) => f.id === id) ?? FINISHES[0];
}

export function getFinishImages(id: Finish): GalleryImage[] {
  const def = getFinishDef(id);
  return def.mode === "photo" ? PHOTO_GALLERY[id as PhotoFinish] : PHOTO_GALLERY[TINT_BASE];
}
