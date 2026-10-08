export type Dealer = {
  id: string;
  name: string;
  dealerType: string;
  tags: string[];
  description?: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  phone: string;
  phoneHref: string;
  email?: string;
  website?: string;
  mapsQuery: string;
  lat: number;
  lon: number;
};

export const DEALER_TAGS = [
  "Showroom",
  "Locksmith Services",
  "Delivery & Installation",
] as const;

export const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  Showroom: { bg: "#f0b429", text: "#1a1206" },
  "Locksmith Services": { bg: "#2f7fe0", text: "#ffffff" },
  "Delivery & Installation": { bg: "#2fb8a0", text: "#062420" },
};

export const dealers: Dealer[] = [
  {
    id: "toronto-safes",
    name: "Toronto Safes",
    dealerType: "Authorized Dealer",
    tags: ["Showroom", "Locksmith Services", "Delivery & Installation"],
    description:
      "Operated by Security Lock & Safe Inc. — a trusted provider of safes and vault doors across the Greater Toronto Area since 1987.",
    address: "207 Edgeley Blvd, Concord, ON L4K 4B5",
    city: "Concord",
    province: "ON",
    postalCode: "L4K 4B5",
    phone: "905-760-5625",
    phoneHref: "tel:+19057605625",
    email: "sales@torontosafes.ca",
    website: "https://torontosafes.ca/",
    mapsQuery: "207 Edgeley Blvd, Concord, ON L4K 4B5, Canada",
    lat: 43.7978,
    lon: -79.5325,
  },
];
