import { SAFE_MODELS, SERIES_CONTENT, SERIES_LIST } from "@/lib/safes";

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  keywords: string;
};

const PAGES: SearchItem[] = [
  {
    title: "Products",
    description: "Fire & Burglary, TL-15, and TL-30 High Security safe lines.",
    href: "/products",
    keywords: "products safes catalog lines series",
  },
  {
    title: "Certified Standard",
    description: "UL & ULC fire and burglary ratings explained.",
    href: "/certified-standard",
    keywords: "certified standard ul ulc rating fire burglary certification tested",
  },
  {
    title: "About",
    description: "Torvault's story, backed by 39 years of security experience.",
    href: "/about",
    keywords: "about story company history",
  },
  {
    title: "Manufacturing",
    description: "How Torvault safes are built.",
    href: "/manufacturing",
    keywords: "manufacturing build factory construction steel",
  },
  {
    title: "FAQ",
    description: "Answers on UL ratings, the dealer-only model, and lead times.",
    href: "/faq",
    keywords: "faq questions answers help",
  },
  {
    title: "Find a Dealer",
    description: "Locate an authorized Torvault dealer near you.",
    href: "/find-a-dealer",
    keywords: "find dealer locate buy where to buy",
  },
  {
    title: "Become a Dealer",
    description: "Apply to carry Torvault safes at wholesale.",
    href: "/dealers",
    keywords: "become dealer wholesale apply dealer program",
  },
];

type ModelSearchItem = SearchItem & { seriesLabel: string; seriesHref: string };

const SERIES_ITEMS: SearchItem[] = SERIES_LIST.map((series) => {
  const content = SERIES_CONTENT[series];
  return {
    title: content.label,
    description: content.bestFor,
    href: `/products/${content.slug}`,
    keywords: `${content.label} ${content.badge} ${content.chips.join(" ")} ${series}`,
  };
});

const MODEL_ITEMS: ModelSearchItem[] = SAFE_MODELS.map((model) => {
  const content = SERIES_CONTENT[model.series];
  return {
    title: model.model,
    description: `${content.label} · ${model.weight.toLocaleString()} lb · ${model.capacity} cu ft`,
    href: `/products/${content.slug}`,
    keywords: `${model.model} ${content.label} model safe`,
    seriesLabel: content.label,
    seriesHref: `/products/${content.slug}`,
  };
});

export const SEARCH_INDEX: SearchItem[] = [...PAGES, ...SERIES_ITEMS, ...MODEL_ITEMS];

function matchItems<T extends SearchItem>(items: T[], query: string, limit: number): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  return items
    .filter((item) => {
      const haystack = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    })
    .slice(0, limit);
}

export function searchSite(query: string, limit = 8): SearchItem[] {
  return matchItems(SEARCH_INDEX, query, limit);
}

export type GroupedProductResults = {
  lines: SearchItem[];
  modelGroups: {
    seriesLabel: string;
    seriesHref: string;
    models: SearchItem[];
    totalCount: number;
  }[];
  total: number;
};

export function searchProductsGrouped(query: string, maxPerSeries = 6): GroupedProductResults {
  const lines = matchItems(SERIES_ITEMS, query, SERIES_ITEMS.length);
  const matchedModels = matchItems(MODEL_ITEMS, query, MODEL_ITEMS.length);

  const bySeries = new Map<string, ModelSearchItem[]>();
  for (const model of matchedModels) {
    const list = bySeries.get(model.seriesLabel) ?? [];
    list.push(model);
    bySeries.set(model.seriesLabel, list);
  }

  const modelGroups = [...bySeries.entries()].map(([seriesLabel, models]) => ({
    seriesLabel,
    seriesHref: models[0].seriesHref,
    models: models.slice(0, maxPerSeries),
    totalCount: models.length,
  }));

  return {
    lines,
    modelGroups,
    total: lines.length + matchedModels.length,
  };
}
