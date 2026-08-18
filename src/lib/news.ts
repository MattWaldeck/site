export type NewsArticle = {
  slug: string;
  title: string;
  dateLabel: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  coverImageIsIllustrative?: boolean;
  body: string[];
  quote?: { text: string; attribution: string };
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "parcels-for-those-in-need-covid-19-level-5",
    title: "Parcels for those in need – COVID-19 Level 5",
    dateLabel: "June 2020",
    excerpt:
      "During South Africa's COVID-19 Level 5 lockdown, RB & Son helped deliver parcels to underprivileged communities.",
    coverImage: "/assets/news/news-parcels-1.jpg",
    coverImageAlt: "RB & Son team loading aid parcels during COVID-19 Level 5 lockdown",
    body: [
      "South Africa entered COVID-19 Level 5 lockdown in 2020, and RB & Son Transport (Cape) assisted in delivering parcels to various centres to help the underprivileged and poor.",
    ],
  },
  {
    slug: "helping-farmers-in-the-karoo",
    title: "Helping farmers in the Karoo",
    dateLabel: "June 2020",
    excerpt:
      "RB & Son transported donated animal feed to farmers in the Carnarvon area during a difficult drought period.",
    coverImage: "/assets/gallery/gallery-aerial-moody-fields.jpg",
    coverImageAlt: "RB & Son truck en route through farmland (illustrative photo)",
    coverImageIsIllustrative: true,
    body: [
      "RB & Son transported feed to the Carnarvon area for farmers in need during a period of severe drought in the Karoo.",
    ],
    quote: {
      text: "I have no words… this delivery was made to our farm. A surprise from old hunting friends. That's my mom sobbing as the truck drives into our yard. They hoped for 8 tons of donations, they ended up filling a 14 ton truck.",
      attribution: "Grethe Vos",
    },
  },
  {
    slug: "giving-back",
    title: "Giving Back",
    dateLabel: "June 2020",
    excerpt:
      "RB & Son donated transport services to the farming sector in the drought-hit Klawer district.",
    coverImage: "/assets/gallery/gallery-rear-canola-field.jpg",
    coverImageAlt: "RB & Son truck on a rural route (illustrative photo)",
    coverImageIsIllustrative: true,
    body: [
      "RB & Son Transport (Cape) gives back to socioeconomic development. We donated our transport services to the farming sector in the Klawer district's drought-affected areas.",
    ],
  },
  {
    slug: "exclusive-cargo-dangerous-goods-delivery-service",
    title: "Exclusive cargo / dangerous goods delivery service",
    dateLabel: "June 2020",
    excerpt:
      "A look at RB & Son's dangerous goods and exclusive cargo capability, running nationwide from Cape Town and Port Elizabeth.",
    coverImage: "/assets/news/news-dangerous-goods-1.jpg",
    coverImageAlt: "RB & Son truck handling exclusive cargo",
    body: [
      "We at RB & Son pride ourselves on our exclusive cargo and dangerous goods delivery service, nationwide. With branches in Cape Town and Port Elizabeth, we strive to give the best service possible.",
      "For warehousing, distribution, containerisation, or any kind of transportation — give us a call.",
    ],
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((a) => a.slug === slug);
}
