import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE_CONFIG } from "@/lib/constants";

export async function GET(context: APIContext) {
  return rss({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    site: context.site || "https://quickfirewood.com.au",
    items: [
      // Static pages as items for now - blog posts will be added when content is created
      {
        title: "Premium Ironbark Firewood Brisbane and Gold Coast",
        pubDate: new Date("2026-02-01"),
        description:
          "Family-owned supplier of premium Western Ironbark firewood in Brisbane and Gold Coast.",
        link: "/",
      },
      {
        title: "Firewood for Pizza Ovens",
        pubDate: new Date("2026-02-01"),
        description:
          "Premium Western Ironbark firewood for pizza ovens. High heat output, clean burn, perfect splits for wood-fired pizza.",
        link: "/firewood/pizza-ovens",
      },
      {
        title: "Firewood for Fireplaces",
        pubDate: new Date("2026-02-01"),
        description:
          "Premium Western Ironbark firewood for fireplaces. Long-burning, clean hardwood for indoor heating.",
        link: "/firewood/fireplaces",
      },
      {
        title: "Firewood for BBQ and Smoking",
        pubDate: new Date("2026-02-01"),
        description:
          "Premium Western Ironbark firewood for BBQ, smoking and grilling. Perfect for offset smokers and chargrills.",
        link: "/firewood/bbq",
      },
      {
        title: "Firewood for Fire Pits",
        pubDate: new Date("2026-02-01"),
        description:
          "Premium Western Ironbark firewood for fire pits. Long-burning, low smoke hardwood for outdoor entertaining.",
        link: "/firewood/fire-pits",
      },
      {
        title: "Commercial Firewood Supply",
        pubDate: new Date("2026-02-01"),
        description:
          "Reliable commercial firewood supply for Brisbane and Gold Coast restaurants, pizzerias and BBQ venues.",
        link: "/commercial",
      },
    ],
    customData: `<language>en-AU</language>
<atom:link href="https://quickfirewood.com.au/rss.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom"/>
<link rel="hub" href="https://pubsubhubbub.appspot.com" xmlns="http://www.w3.org/2005/Atom"/>`,
  });
}
