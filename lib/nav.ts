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
  { href: "/faq", label: "FAQ" },
  {
    label: "Where To Buy",
    children: [
      { href: "/find-a-dealer", label: "Find a Dealer" },
      { href: "/dealers", label: "Become a Dealer" },
    ],
  },
];

export const SITE_URL = "https://torvaultsafe.com";
