import configPromise from "@payload-config";
import type { Metadata } from "next";
import { draftMode, headers } from "next/headers";
import { getPayload, type RequiredDataFromCollectionSlug } from "payload";
import { cache } from "react";
import { Hero } from "@/components/Blocks/Hero";
import { RenderBlocks } from "@/components/Blocks/RenderBlocks";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import type {
  Footer as FooterType,
  Header as HeaderType,
} from "@/payload-types";
import { generateMeta } from "@/utilities/generateMeta";
import { getCachedGlobal, getGlobal } from "@/utilities/getGlobals";
import { cn } from "@/utilities/ui";

export async function generateStaticParams() {
  const footerData: FooterType = await getCachedGlobal("footer", 1)();
  const pages = footerData?.items || [];

  const params = pages
    .map(({ link }) => {
      if (
        link &&
        link.type === "reference" &&
        link.reference &&
        typeof link.reference.value === "object"
      ) {
        const page = link.reference
          .value as RequiredDataFromCollectionSlug<"pages">;
        return { slug: page.slug };
      }
      return null;
    })
    .filter((param): param is { slug: string } => param !== null);
  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const headerList = await headers();
  const isLivePreview = headerList.get("x-live-preview") === "1";
  const { slug = "home" } = await paramsPromise;
  if (slug === "home" && !isLivePreview) {
    const headerData: HeaderType = await getCachedPages();
    const navItems = headerData?.navItems || [];
    return navItems?.map((item) => {
      const { link } = item;
      if (
        link &&
        link.type === "reference" &&
        link.reference &&
        typeof link.reference.value === "object"
      ) {
        const page = link.reference
          .value as RequiredDataFromCollectionSlug<"pages">;
        const url = `/${page.slug}`;
        return (
          <PageContent
            key={page.id}
            page={page}
            url={url}
            slug={slug}
            isLivePreview={false}
          />
        );
      }
      return null;
    });
  } else {
    // Decode to support slugs with special characters
    const decodedSlug = decodeURIComponent(slug);
    const url = `/${decodedSlug}`;
    const page: RequiredDataFromCollectionSlug<"pages"> | null =
      await queryPageBySlug({
        slug: decodedSlug,
      });

    return (
      <PageContent
        page={page}
        url={url}
        isLivePreview={isLivePreview}
        slug={slug}
      />
    );
  }
}

function PageContent({
  page,
  url,
  isLivePreview,
  slug,
}: {
  page: RequiredDataFromCollectionSlug<"pages">;
  url: string;
  isLivePreview: boolean;
  slug?: string;
}) {
  if (!page) {
    return <PayloadRedirects url={url} />;
  }
  const { hero, layout } = page;

  return (
    <section
      className={cn(
        "in-[.live-preview]:section-pb",
        page.slug !== "home" && "in-[.live-preview]:clamp-[pt,28,40]",
        slug !== "home" && "section-pt sub-page min-h-svh",
      )}
      id={page.slug}
    >
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {isLivePreview && <LivePreviewListener />}

      {page.slug === "home" && <Hero {...hero} />}
      <div className="section-wrapper page-margin section-px">
        <div>
          <RenderBlocks blocks={layout ? layout : []} slug={page.slug} />
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "home" } = await paramsPromise;
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug);
  const page = await queryPageBySlug({
    slug: decodedSlug,
  });

  return generateMeta({ doc: page });
}

const getCachedPages = cache(async () => await getGlobal("header", 3));

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
