import { SERIES_STRUCTURAL, type SafeSeries, type SeriesContent, type SpecCell, type FaqItem } from "./safes";

/** Minimal shape both useTranslations("products") and getTranslations("products") satisfy. */
type ProductsT = {
  (key: string): string;
  raw: (key: string) => unknown;
};

/** Merges the structural fields in lib/safes.ts with the translated text in messages/*.json under "products". */
export function getSeriesContent(t: ProductsT, series: SafeSeries): SeriesContent {
  const structural = SERIES_STRUCTURAL[series];
  const key = structural.messageKey;
  return {
    series: structural.series,
    slug: structural.slug,
    image: structural.image,
    imageAlt: structural.imageAlt,
    label: t(`${key}.label`),
    badge: t(`${key}.badge`),
    chips: t.raw(`${key}.chips`) as [string, string],
    metaDescription: t(`${key}.metaDescription`),
    intro: t.raw(`${key}.intro`) as string[],
    specCells: t.raw(`${key}.specCells`) as SpecCell[],
    bestFor: t(`${key}.bestFor`),
    features: t.raw(`${key}.features`) as string[],
    faqs: t.raw(`${key}.faqs`) as FaqItem[],
  };
}
