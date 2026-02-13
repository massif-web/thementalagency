import configPromise from "@payload-config";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { getPayload, type RequiredDataFromCollectionSlug } from "payload";
import { cache } from "react";
import { Hero } from "@/components/Blocks/Hero";
import { RenderBlocks } from "@/components/Blocks/RenderBlocks";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import { generateMeta } from "@/utilities/generateMeta";

export async function generateStaticParams() {
  const pages = await getPages();

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== "home";
    })
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug = "home" } = await paramsPromise;
  if (slug === "home") {
    const items = await getMainPages();
    const { navItems } = items || {};
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
          <PageContent key={page.id} page={page} url={url} draft={draft} />
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

    return <PageContent page={page} url={url} draft={draft} />;
  }
}

function PageContent({
  page,
  url,
  draft,
}: {
  page: RequiredDataFromCollectionSlug<"pages">;
  url: string;
  draft: boolean;
}) {
  if (!page) {
    return <PayloadRedirects url={url} />;
  }
  const { hero, layout } = page;

  return (
    <section className="min-h-svh" id={page.slug}>
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {page.slug === "home" && <Hero {...hero} />}
      <RenderBlocks blocks={layout ? layout : []} slug={page.slug} />
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

const getPages = cache(async () => {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
  });
  return pages;
});

const getMainPages = cache(async () => {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.findGlobal({
    slug: "header",
    depth: 3,
    draft: false,
  });
  return pages;
});

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
