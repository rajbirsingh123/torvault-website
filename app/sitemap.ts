import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedAlternates, canonicalFor } from "@/lib/seo";
import { SERIES_LIST } from "@/lib/safes";
import { BLOG_POSTS_STRUCTURAL } from "@/lib/blog";

type Priority = MetadataRoute.Sitemap[number]["priority"];
type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

const STATIC_ROUTES: { path: string; priority: Priority; changeFrequency: ChangeFreq }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  { path: "/certified-standard", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/manufacturing", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/support", priority: 0.5, changeFrequency: "monthly" },
  { path: "/dealers", priority: 0.6, changeFrequency: "monthly" },
  { path: "/find-a-dealer", priority: 0.7, changeFrequency: "monthly" },
  // Not included: /terms — marked noindex in its own metadata.
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_ROUTES,
    ...SERIES_LIST.map((series) => ({
      path: `/products/${series}`,
      priority: 0.9 as Priority,
      changeFrequency: "weekly" as ChangeFreq,
    })),
    ...BLOG_POSTS_STRUCTURAL.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: 0.6 as Priority,
      changeFrequency: "monthly" as ChangeFreq,
    })),
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const { path, priority, changeFrequency } of paths) {
    const alternates = localizedAlternates(path);
    for (const locale of routing.locales) {
      entries.push({
        url: canonicalFor(locale, path),
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: { languages: alternates },
      });
    }
  }
  return entries;
}
