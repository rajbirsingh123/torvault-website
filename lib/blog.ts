export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  thumbnail: string;
  thumbnailAlt: string;
  video?: { src: string; poster: string };
  body: string[];
};

/** Structural, non-translatable fields only — title/category/excerpt/body live in messages/*.json under "blog.posts.<slug>" and are merged in via getBlogPost()/getAllBlogPosts(). */
export type BlogPostStructural = {
  slug: string;
  date: string;
  readTimeMinutes: number;
  thumbnail: string;
  thumbnailAlt: string;
  video?: { src: string; poster: string };
};

export const BLOG_POSTS_STRUCTURAL: BlogPostStructural[] = [
  {
    slug: "understanding-ul-security-ratings",
    date: "2026-01-12",
    readTimeMinutes: 4,
    thumbnail: "/blog/ul-security-ratings.jpg",
    thumbnailAlt: "Torvault-style safe, three-quarter angled product photo on white background",
  },
  {
    slug: "fire-rated-vs-fireproof",
    date: "2026-01-26",
    readTimeMinutes: 3,
    thumbnail: "/blog/fire-rated-vs-fireproof.jpg",
    thumbnailAlt: "Torvault-style safe, straight-on product photo, door closed, on white background",
  },
  {
    slug: "choosing-the-right-safe-size",
    date: "2026-02-09",
    readTimeMinutes: 4,
    thumbnail: "/blog/choosing-safe-size.jpg",
    thumbnailAlt: "Three Torvault-style safes of increasing size lined up on a white background",
  },
  {
    slug: "anchoring-and-installation-basics",
    date: "2026-02-23",
    readTimeMinutes: 3,
    thumbnail: "/products/black/05-torvault-black-interior-detail.jpg",
    thumbnailAlt: "Torvault safe, black finish, close-up of the boltwork and locking hardware that anchors the door",
  },
  {
    slug: "why-torvault-sells-through-dealers",
    date: "2026-03-09",
    readTimeMinutes: 3,
    thumbnail: "/products/tl-black-hero-v2.jpg",
    thumbnailAlt: "Torvault TL-30 safe, black finish, angled view of the steel body and locking wheel",
  },
  {
    slug: "what-to-expect-at-delivery",
    date: "2026-03-23",
    readTimeMinutes: 3,
    thumbnail: "/products/black/03-torvault-black-angled-view.jpg",
    thumbnailAlt: "Torvault safe, black finish, angled three-quarter view",
    video: {
      src: "/blog/videos/what-to-expect-at-delivery.mp4",
      poster: "/blog/videos/what-to-expect-at-delivery-poster.png",
    },
  },
];

export function getBlogPostStructural(slug: string): BlogPostStructural | undefined {
  return BLOG_POSTS_STRUCTURAL.find((p) => p.slug === slug);
}

export function formatBlogDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
