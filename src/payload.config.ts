import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { buildConfig, type PayloadRequest } from "payload";
import sharp from "sharp";
import { plugins } from "@/Plugins";
import {
  AboutBlock,
  // ArchiveBlock,
  // BannerBlock,
  // CallToActionBlock,
  CardsBlock,
  ContactBlock,
  // ContentBlock,
  FaqBlock,
  // FormBlock,
  HrBlock,
  MediaBlock,
  TitleBlock,
} from "@/payload/blocks";
import { Media } from "@/payload/collections/Media";
import { Pages } from "@/payload/collections/Pages";
import { Users } from "@/payload/collections/Users";
import { defaultLexical } from "@/payload/fields/defaultLexical";
import { Footer } from "@/payload/globals/Footer";
import { Header } from "@/payload/globals/Header";
import { getServerSideURL } from "@/utilities/getURL";
import { customTranslations } from "./translations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  i18n: {
    translations: customTranslations,
    supportedLanguages: customTranslations,
    fallbackLanguage: "en", // default language
  },
  admin: {
    dateFormat: "d. MMM yyyy, h:mm a",
    // components: {
    //   // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
    //   // Feel free to delete this at any time. Simply remove the line below.
    //   beforeLogin: ["@/payload/components/BeforeLogin"],
    //   // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
    //   // Feel free to delete this at any time. Simply remove the line below.
    //   // beforeDashboard: ["@/payload/components/BeforeDashboard/BeforeDashboard"],
    // },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL}${data.slug ?? ""}?live-preview`,
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  collections: [Pages, Media, Users],
  blocks: [
    ContactBlock,
    TitleBlock,
    CardsBlock,
    // CallToActionBlock,
    // ContentBlock,
    MediaBlock,
    // BannerBlock,
    AboutBlock,
    // ArchiveBlock,
    //FormBlock,
    HrBlock,
    FaqBlock,
  ],

  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: "echo@mentalagency.ch",
    defaultFromName: "The Mental Agency®",
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true;

        const secret = process.env.CRON_SECRET;
        if (!secret) return false;

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get("authorization");
        return authHeader === `Bearer ${secret}`;
      },
    },
    tasks: [],
  },
});
