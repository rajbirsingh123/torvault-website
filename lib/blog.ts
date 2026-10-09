export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  thumbnail: string;
  thumbnailAlt: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-ul-security-ratings",
    title: "Understanding UL Security Ratings: What TL-15 and TL-30 Actually Mean",
    category: "Security Ratings",
    excerpt:
      "TL-15 and TL-30 aren't marketing tiers — they're independently tested minutes of resistance against real tools. Here's what the numbers actually measure.",
    date: "2026-01-12",
    readTime: "4 min read",
    thumbnail: "/blog/ul-security-ratings.jpg",
    thumbnailAlt: "Torvault-style safe, three-quarter angled product photo on white background",
    body: [
      "A \"TL-15\" or \"TL-30\" label gets thrown around a lot in the safe industry, but the number itself is the entire specification — it's a net working time, the number of minutes UL verified the door withstands a professional attack using a defined list of tools before it's considered breached.",
      "Net working time only counts the minutes a tool is actually cutting, drilling, or prying — not the total time an attacker spends on site repositioning, swapping tools, or taking breaks. A TL-15 rating means 15 real minutes of tool-on-metal contact; TL-30 means 30. That distinction matters, because it's a much harder bar to clear than it sounds.",
      "The rating also specifies the tool list. TL-15 testing uses common hand and power tools — drills, punches, hammers, pressure-applying devices. TL-30 adds abrasive cutting wheels and power saws to that list, which is why stepping up a tier requires a meaningfully thicker steel body, not just a thicker door.",
      "One detail that trips people up: unless a line is explicitly rated for six sides, the UL rating applies to the door only. Torvault's Fire & Burglary and TL-15 lines rate the door; TL-30 is tested and rated across all six sides of the body, which is the standard cash-in-transit depots and high-volume jewelers typically require.",
      "None of this is self-certified. UL is an independent third party, and it's the same standard insurers reference when setting coverage limits — which is exactly why the rating on the spec sheet matters more than the finish on the door.",
    ],
  },
  {
    slug: "fire-rated-vs-fireproof",
    title: "Fire-Rated vs. \"Fireproof\": What Your Safe's Rating Really Protects",
    category: "Fire Protection",
    excerpt:
      "No safe is truly fireproof. Here's what a UL Class 350 rating actually guarantees — and how to match it to your real fire-department response time.",
    date: "2026-01-26",
    readTime: "3 min read",
    thumbnail: "/blog/fire-rated-vs-fireproof.jpg",
    thumbnailAlt: "Torvault-style safe, straight-on product photo, door closed, on white background",
    body: [
      "\"Fireproof\" isn't a real engineering term, and no reputable manufacturer should use it without a footnote. The correct term is fire-resistant or fire-rated, and the difference isn't semantic — it describes exactly what the rating promises and what it doesn't.",
      "A UL Class 350 rating means the interior of the safe stayed below 350°F — the temperature at which paper begins to char — for a documented period, typically one hour, while the surrounding fire reached temperatures up to 1,700°F. It's a thermal insulation guarantee for a fixed duration, not an indefinite one.",
      "That duration is the number that actually matters when you're choosing a safe. If your building is in an area with a 10-minute average fire-department response time, a 1-hour rating gives you enormous margin. If you're protecting server backups, film, or anything with a lower char/damage threshold than paper, you need to check the specific interior temperature the manufacturer tested to, not just assume \"fireproof\" covers it.",
      "It's also worth knowing that fire ratings and burglary ratings are tested completely independently. A safe with an excellent forced-entry rating says nothing about its fire performance, and vice versa — confirm both are documented if you need both, rather than assuming one implies the other.",
    ],
  },
  {
    slug: "choosing-the-right-safe-size",
    title: "How to Choose the Right Safe Size for Your Business",
    category: "Buying Guide",
    excerpt:
      "Buying too small means outgrowing it in a year; too large wastes floor space and budget. Here's how to size a safe against what you actually need to store.",
    date: "2026-02-09",
    readTime: "4 min read",
    thumbnail: "/blog/choosing-safe-size.jpg",
    thumbnailAlt: "Three Torvault-style safes of increasing size lined up on a white background",
    body: [
      "Sizing a safe by outside dimensions is the most common mistake we see — a model's outside footprint tells you whether it fits in your space, but it's the inside dimensions that determine whether your actual contents fit, and the two numbers can differ by several inches on every axis once you account for wall and door thickness.",
      "Start from what you're storing, not from a size you've seen before. Measure the tallest document box, the widest ledger, the longest firearm case — whatever the largest single item is — and add a margin for the fact that a shelf, a cash tray, or a second item will usually share the space.",
      "Then work backward from your floor. Check the per-square-foot load rating of the level the safe sits on, especially above ground floor, since a loaded TL-30 unit can weigh well over a thousand pounds. A safe that's structurally wrong for the floor it sits on is a problem no rating solves.",
      "It's also worth sizing one tier up from your current needs rather than an exact fit, since cash, inventory, or documents tend to grow and a safe is not a purchase most businesses repeat every year. That said, there's a real cost to over-buying — a six-figure vault for a petty-cash drawer just moves the inefficiency from your shelf to your floor plan.",
      "If you're working through this for a specific Torvault line, the size finder on each product page lets you enter what needs to fit and how much room you have, and it'll filter the lineup down to the models that actually work — and recommend the smallest one that does.",
    ],
  },
  {
    slug: "anchoring-and-installation-basics",
    title: "Where to Install Your Safe: Anchoring, Placement, and Floor Load",
    category: "Installation",
    excerpt:
      "A safe that isn't anchored can be removed and attacked somewhere else entirely. Here's what dealers check before a unit ever gets bolted down.",
    date: "2026-02-23",
    readTime: "3 min read",
    thumbnail: "/products/black/04-torvault-black-rear-side.jpg",
    thumbnailAlt: "Torvault safe, black finish, rear and side panel view",
    body: [
      "A UL rating describes how a safe resists attack while it stays in place. It says nothing about what happens if an attacker simply removes the whole unit and works on it somewhere quiet — which is why anchoring isn't an optional accessory, it's part of the security model.",
      "Most Torvault lines ship with pre-drilled anchoring holes specifically for this reason, meant to be bolted into a concrete floor rather than wood subfloor or a mounting pad. Concrete is the baseline most insurers and dealers check for, because it resists the safe being pried free along with the anchors.",
      "Placement matters almost as much as anchoring. A safe visible from a storefront window advertises what's behind the door; one blocked by inventory or positioned away from a rear exit removes both the temptation and the easy extraction route. Weight is a factor here too — know your floor's load rating before deciding where a safe this heavy sits, particularly on any level above grade.",
      "Finally, think about access during installation, not just after. A safe that clears the doorway but not the hallway turn is a surprisingly common and expensive mistake — confirm clearances for the full delivery path, not just the final resting spot, before a unit ships.",
    ],
  },
  {
    slug: "why-torvault-sells-through-dealers",
    title: "Why Torvault Sells Through Dealers Only — And Why That's Better for You",
    category: "Our Approach",
    excerpt:
      "No direct-to-consumer listings, no competing with the people who install and service your safe. Here's the thinking behind Torvault's dealer-first model.",
    date: "2026-03-09",
    readTime: "3 min read",
    thumbnail: "/products/tl-black-hero-v2.jpg",
    thumbnailAlt: "Torvault TL-30 safe, black finish, angled view of the steel body and locking wheel",
    body: [
      "Torvault doesn't sell direct to consumers, and that's a deliberate choice rather than a limitation of a smaller brand. Every unit moves through an authorized Canadian dealer — the same people who will deliver, install, anchor, and service it for the life of the safe.",
      "The alternative is common in this industry: a manufacturer sells online at retail pricing while also supplying the same dealers who are expected to compete with that listing. It undercuts the independent dealer network on price while leaving them responsible for the service relationship, which is a bad deal for everyone except the manufacturer.",
      "Selling wholesale-only with territory protection means a dealer who takes on Torvault isn't competing against their own supplier. It also means the person selling you a Torvault safe has actually handled one, can speak to installation and anchoring specifics for your space, and has a direct line back to the manufacturer if something needs attention after the sale.",
      "This model is backed by Security Lock & Safe Inc.'s nearly four decades running Toronto Safes — so the dealer program isn't a new idea being tested for the first time, it's the same service relationship the team has run in the GTA since 1987, extended to independent dealers across the rest of Canada.",
    ],
  },
  {
    slug: "what-to-expect-at-delivery",
    title: "What to Expect When Your Torvault Safe Is Delivered",
    category: "Shipping & Installation",
    excerpt:
      "Delivery day for a several-hundred-pound safe looks different from a standard parcel drop. Here's what your dealer handles, and what to confirm before the truck arrives.",
    date: "2026-03-23",
    readTime: "3 min read",
    thumbnail: "/products/black/03-torvault-black-angled-view.jpg",
    thumbnailAlt: "Torvault safe, black finish, angled three-quarter view",
    body: [
      "A Torvault safe doesn't arrive the way a parcel does. Every unit ships to your authorized dealer first, not directly to your door — the dealer coordinates delivery, confirms the final placement with you, and handles the install, so the first time you see the safe it's already positioned and ready to anchor.",
      "Before a delivery date is scheduled, your dealer will walk through the access path with you: doorway widths, hallway turns, stairs, and elevator dimensions if applicable. This matters more than it sounds — a safe that clears the front door but not a tight hallway turn is one of the most common and expensive delivery surprises, and it's entirely avoidable by confirming clearances against the model's outside dimensions ahead of time.",
      "Larger units — particularly TL-30 models and anything in the 1,000+ lb range — often require professional riggers or specialized equipment to move safely. Your dealer arranges this as part of the delivery, so you're not left managing equipment rental or liability on your own.",
      "Once the safe is in its final position, installation includes anchoring it to the floor through the pre-drilled mounting holes built into the body — not an optional add-on, but part of a correctly completed install. Your dealer will confirm the floor can support the unit's weight before anchoring, especially on any level above grade.",
      "Because Torvault sells wholesale through dealers rather than listing shipping costs online, delivery and installation pricing is quoted alongside the unit itself — ask your dealer to include it up front so there are no surprises between quote and delivery day.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatBlogDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
