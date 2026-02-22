import { unstable_cache } from "next/cache";
import { getServerSideSitemap } from "next-sitemap";
import type { Footer as FooterType, Page } from "@/payload-types";
import { getCachedDocument } from "@/utilities/getDocument";
import { getCachedGlobal } from "@/utilities/getGlobals";

const getSubPagesSitemap = unstable_cache(
  async () => {
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      "https://example.com";

    const footerData: FooterType = await getCachedGlobal("footer", 1)();
    const footerLinks = footerData?.items || [];

    const dateFallback = new Date().toISOString();

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/`,
        lastmod: dateFallback,
      },
    ];

    const sitemap = footerLinks
      ? await Promise.all(
          footerLinks.map(async (item) => {
            const url =
              (item?.link?.type === "reference" ||
                item?.link?.type === "anchor") &&
              typeof item?.link?.reference?.value === "object" &&
              item?.link?.reference?.value.slug
                ? item?.link?.reference?.value.slug
                : item?.link?.url;

            const doc = (await getCachedDocument(
              "pages",
              url || "",
            )()) as Page | null;
            return {
              loc: url === "home" ? `${SITE_URL}/` : `${SITE_URL}/${url}`,
              lastmod: doc?.updatedAt || dateFallback,
            };
          }),
        )
      : [];

    return [...defaultSitemap, ...sitemap];
  },
  ["sub-pages-sitemap"],
  {
    tags: ["sub-pages-sitemap"],
  },
);

export async function GET() {
  const sitemap = await getSubPagesSitemap();

  return getServerSideSitemap(sitemap);
}
