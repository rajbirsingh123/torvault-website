export type PhotoFinish = "graphite" | "black";
export type Finish = PhotoFinish;

export type GalleryImage = { src: string; alt: string };

export type FinishDef = {
  id: Finish;
  label: string;
  swatch: string;
};

export const FINISHES: FinishDef[] = [
  { id: "graphite", label: "Graphite", swatch: "#5b6472" },
  { id: "black", label: "Black", swatch: "#17181c" },
];

/** Finishes with real photography — what the homepage quick-view can safely show. */
export const PHOTO_FINISHES: FinishDef[] = FINISHES;

const PHOTO_GALLERY: Record<PhotoFinish, GalleryImage[]> = {
  graphite: [
    { src: "/products/graphite/01-torvault-front-closed.jpg", alt: "Torvault safe, graphite finish, door closed" },
    { src: "/products/graphite/02-torvault-front-open.jpg", alt: "Torvault safe, graphite finish, door open showing interior shelf" },
    { src: "/products/graphite/03-torvault-angled-view.jpg", alt: "Torvault safe, graphite finish, angled three-quarter view" },
  ],
  black: [
    { src: "/products/black/01-torvault-black-front-closed.jpg", alt: "Torvault safe, black finish, door closed" },
    { src: "/products/black/02-torvault-black-front-open.jpg", alt: "Torvault safe, black finish, door open showing interior shelf" },
    { src: "/products/black/03-torvault-black-angled-view.jpg", alt: "Torvault safe, black finish, angled three-quarter view" },
  ],
};

export function getFinishDef(id: Finish): FinishDef {
  return FINISHES.find((f) => f.id === id) ?? FINISHES[0];
}

export function getFinishImages(id: Finish): GalleryImage[] {
  return PHOTO_GALLERY[id];
}
