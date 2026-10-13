import { BLOG_POSTS_STRUCTURAL, type BlogPost, type BlogPostStructural } from "./blog";

/** Minimal shape both useTranslations("blog") and getTranslations("blog") satisfy. */
type BlogT = {
  (key: string): string;
  raw: (key: string) => unknown;
};

function mergePost(t: BlogT, structural: BlogPostStructural): BlogPost {
  const key = `posts.${structural.slug}`;
  return {
    slug: structural.slug,
    date: structural.date,
    readTime: `${structural.readTimeMinutes} ${t("readTimeSuffix")}`,
    thumbnail: structural.thumbnail,
    thumbnailAlt: structural.thumbnailAlt,
    video: structural.video,
    title: t(`${key}.title`),
    category: t(`${key}.category`),
    excerpt: t(`${key}.excerpt`),
    body: t.raw(`${key}.body`) as string[],
  };
}

export function getBlogPost(t: BlogT, slug: string): BlogPost | undefined {
  const structural = BLOG_POSTS_STRUCTURAL.find((p) => p.slug === slug);
  if (!structural) return undefined;
  return mergePost(t, structural);
}

export function getAllBlogPosts(t: BlogT): BlogPost[] {
  return BLOG_POSTS_STRUCTURAL.map((structural) => mergePost(t, structural));
}
