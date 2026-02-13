import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { draftMode } from "next/headers";
import type React from "react";
import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Providers } from "@/providers/Providers";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import "@/assets/css/style.css";
import { getServerSideURL } from "@/utilities/getURL";

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

  return (
    <html lang="en" className={PrimaryFont.variable} suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="bg-body font-sans text-primary">
        <Providers>
          <AdminBar
            className="right-0 bottom-0 z-50 fixed px-4"
            adminBarProps={{
              preview: isEnabled,
              className: "gap-2",
            }}
          />
          <div className="page-margin">
            <Header />
            {children}
            {/* <Footer /> */}
          </div>
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
    creator: "@payloadcms",
  },
};
