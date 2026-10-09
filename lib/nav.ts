export type NavChild = {
  href: string;
  label: string;
};

export type NavLink = {
  href?: string;
  label: string;
  children?: NavChild[];
  /** Renders a multi-column product/size mega menu instead of the plain dropdown. */
  mega?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/products", label: "Products", mega: true },
  { href: "/certified-standard", label: "Certified Standard" },
  { href: "/about", label: "About" },
  { href: "/manufacturing", label: "Manufacturing" },
  {
    label: "Support",
    children: [
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
      { href: "/support", label: "Help Center" },
      { href: "/contact", label: "Contact Support" },
      { href: "/blog/choosing-the-right-safe-size", label: "Size & Capacity Guides" },
      { href: "/blog/what-to-expect-at-delivery", label: "Shipping & Installation" },
    ],
  },
  {
    label: "Where To Buy",
    children: [
      { href: "/find-a-dealer", label: "Find a Dealer" },
      { href: "/dealers", label: "Become a Dealer" },
    ],
  },
];

export const SITE_URL = "https://torvaultsafe.com";
