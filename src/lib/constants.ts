// Site constants and configuration

export const SITE_CONFIG = {
  name: "Quickfire Firewood",
  tagline: "Premium Western Ironbark Firewood",
  description:
    "Family-owned supplier of premium Western Ironbark firewood in Brisbane and Gold Coast. Properly seasoned hardwood for fireplaces, pizza ovens, BBQs and fire pits.",
  url: "https://quickfirewood.com.au",
  phone: "1300 965 529",
  phoneLink: "tel:1300965529",
  email: "orders@quickfirewood.com.au",
  emailLink: "mailto:orders@quickfirewood.com.au",
  owners: "Jane and John",
};

export interface NavLink {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

export const NAV_LINKS: { left: NavLink[]; right: NavLink[] } = {
  left: [
    { label: "Home", href: "/" },
    {
      label: "Products",
      href: "#",
      dropdown: [
        { label: "Pizza Ovens", href: "/firewood/pizza-ovens" },
        { label: "Fireplaces", href: "/firewood/fireplaces" },
        { label: "BBQ", href: "/firewood/bbq" },
        { label: "Fire Pits", href: "/firewood/fire-pits" },
      ],
    },
    { label: "Commercial", href: "/commercial" },
  ],
  right: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export const SERVICE_AREAS = [
  "Brisbane CBD",
  "Brisbane North",
  "Brisbane South",
  "Brisbane East",
  "Brisbane West",
  "Gold Coast",
  "Logan",
  "Ipswich",
  "Redland Bay",
  "Moreton Bay",
];

export interface Testimonial {
  quote: string;
  author: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Very friendly and efficient people from ordering to delivery. Great firewood and they split it to the size you want. A pleasure to deal with.",
    author: "Ruth McDiarmid",
  },
  {
    quote:
      "Family operated and owned. Excellent and friendly service. Will come again. Thank you Jane and John.",
    author: "James Tong",
  },
  {
    quote: "Excellent customer service!",
    author: "Karin Hampson",
  },
];

export interface Category {
  title: string;
  description: string;
  href: string;
  image: string;
}

export const PRODUCT_CATEGORIES: Category[] = [
  {
    title: "Pizza Ovens",
    description: "High heat, clean burn, perfect for authentic wood-fired cooking",
    href: "/firewood/pizza-ovens",
    image: "/images/ironbark-logs-closeup.jpg",
  },
  {
    title: "Fireplaces",
    description: "Long-lasting warmth and ambiance for your home",
    href: "/firewood/fireplaces",
    image: "/images/split-firewood-pile.jpg",
  },
  {
    title: "BBQ",
    description: "Exceptional flavour for smoking and grilling",
    href: "/firewood/bbq",
    image: "/images/firewood-pile-ironbark-logs.jpg",
  },
  {
    title: "Fire Pits",
    description: "Perfect for outdoor entertaining and gatherings",
    href: "/firewood/fire-pits",
    image: "/images/fire-pit-evening-burning.jpg",
  },
];

export const SOCIAL_LINKS = {
  facebook: "", // Add when available
  instagram: "", // Add when available
};
