import type { Metadata } from "next";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import type React from "react";
import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Providers } from "@/providers/Providers";
import { InitTheme } from "@/providers/Theme/ThemeProvider";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import "./assets/css/style.css";
import { getServerSideURL } from "@/utilities/getURL";

const Roboto = localFont({
  src: [
    {
      path: "./assets/fonts/roboto-v30-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/roboto-v30-latin-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./assets/fonts/roboto-v30-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-sans",
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en" className={Roboto.variable} suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="font-sans">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
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
