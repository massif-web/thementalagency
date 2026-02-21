import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { draftMode, headers } from "next/headers";
import type React from "react";
import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Providers } from "@/providers/Providers";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import "@/assets/css/style.css";
import { getServerSideURL } from "@/utilities/getURL";
import { cn } from "@/utilities/ui";

const PrimaryFont = Rubik({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  const headerList = await headers();
  const isLivePreview = headerList.get("x-live-preview") === "1";

  return (
    <html
      lang="en"
      className={cn(PrimaryFont.variable, isLivePreview && "live-preview")}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="The Mental Agency" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-body font-sans text-primary">
        <Providers>
          <AdminBar
            className="right-0 bottom-0 z-50 fixed px-4"
            adminBarProps={{
              preview: isEnabled || isLivePreview,
              className: "gap-2",
            }}
          />
          <Header isLivePreview={isLivePreview} />
          {children}
          <Footer isLivePreview={isLivePreview} />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@massifweb",
  },
};
