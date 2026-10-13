export type NavChild = {
  href: string;
  labelKey: string;
};

export type NavLink = {
  href?: string;
  labelKey: string;
  children?: NavChild[];
  /** Renders a multi-column product/size mega menu instead of the plain dropdown. */
  mega?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/products", labelKey: "products", mega: true },
  { href: "/certified-standard", labelKey: "certifiedStandard" },
  { href: "/about", labelKey: "about" },
  { href: "/manufacturing", labelKey: "manufacturing" },
  {
    labelKey: "support",
    children: [
      { href: "/blog", labelKey: "blog" },
      { href: "/faq", labelKey: "faq" },
      { href: "/support", labelKey: "helpCenter" },
      { href: "/contact", labelKey: "contactSupport" },
      { href: "/blog/choosing-the-right-safe-size", labelKey: "sizeGuides" },
      { href: "/blog/what-to-expect-at-delivery", labelKey: "shippingInstallation" },
    ],
  },
  {
    labelKey: "whereToBuy",
    children: [
      { href: "/find-a-dealer", labelKey: "findADealer" },
      { href: "/dealers", labelKey: "becomeADealer" },
    ],
  },
];

export const SITE_URL = "https://torvaultsafe.com";
