import Link from "next/link";
import { ThemeSelector } from "@/components/Footer/ThemeSelector";
import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo";
import type { Footer as FooterType } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal("footer", 1)();

  const navItems = footerData?.navItems || [];

  return (
    <footer className="bg-black dark:bg-card mt-auto border-border border-t text-white">
      <div className="flex md:flex-row flex-col md:justify-between gap-8 py-8 container">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex md:flex-row flex-col-reverse items-start md:items-center gap-4">
          <ThemeSelector />
          <nav className="flex md:flex-row flex-col gap-4">
            {navItems.map(({ link }) => {
              return (
                <CMSLink
                  className="text-white"
                  key={`footer-nav-item-${link.url}`}
                  {...link}
                />
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}
