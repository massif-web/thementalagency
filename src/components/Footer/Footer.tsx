import Logo from "@/assets/img/tma-logo.svg";
import { defaultSiteName } from "@/config";
import type {
  Footer as FooterType,
  Header as HeaderType,
} from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { LogoLink } from "../ui/LogoLink";
import { Copyright } from "./Copyright";
import { FooterContact } from "./FooterContact";
import { FooterNav } from "./FooterNavs";

export async function Footer({ isLivePreview }: { isLivePreview: boolean }) {
  const headerData: HeaderType = await getCachedGlobal("header", 1)();
  const footerData: FooterType = await getCachedGlobal("footer", 1)();

  const navItems = headerData?.navItems || [];
  const socialLinks = footerData?.socialLinks || [];
  const footerLinks = footerData?.items || [];

  return (
    <footer>
      <div className="border-accent/50 border-t">
        <div className="section-px">
          <div className="grid grid-cols-12">
            <div className="flex items-center col-span-8 clamp-[py,6,12]">
              <LogoLink draft={isLivePreview}>
                <Logo className="clamp-[w,90,101.25]" />
              </LogoLink>
            </div>
            <div className="flex justify-center items-center col-span-4 border-accent/50 border-l">
              <FooterContact />
            </div>
          </div>
        </div>
      </div>

      <div className="border-accent/50 border-t text-base">
        <div className="section-px">
          <div className="grid grid-cols-12">
            <div className="col-span-4 uppercase tracking-wide clamp-[py,4,8]">
              <FooterNav
                items={navItems}
                isAnchor={true}
                prefetch={false}
                isLivePreview={isLivePreview}
              />
            </div>
            <div className="col-span-4 border-accent/50 border-l uppercase tracking-wide clamp-[p,4,8]">
              <FooterNav
                items={socialLinks}
                newTab={true}
                className="justify-center"
                isLivePreview={isLivePreview}
              />
            </div>
            <div className="col-span-4 border-accent/50 border-l clamp-[p,4,8]">
              <a
                href="mailto:echo@mentalagency.ch"
                className="text-accent hover:text-primary custom-underline"
              >
                echo@mentalagency.ch
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-accent/50 border-t text-xs tracking-wide">
        <div className="section-px">
          <div className="grid grid-cols-12">
            <div className="col-span-8 clamp-[py,2,4]">
              <FooterNav
                items={footerLinks}
                gap={"sm"}
                isLivePreview={isLivePreview}
              />
            </div>
            <div className="col-span-4 text-right clamp-[p,2,4]">
              <Copyright siteName={defaultSiteName} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex md:flex-row flex-col md:justify-between gap-8 py-8 container">
        <Link className="flex items-center" href="/"></Link>

        <div className="flex md:flex-row flex-col-reverse items-start md:items-center gap-4">
          <nav className="flex md:flex-row flex-col gap-4">
            {navItems.map(({ link }) => {
              return (
                <CMSLink
                  className="text-white"
                  key={`footer-nav-item-${link?.url}`}
                  {...link}
                />
              );
            })}
          </nav>
        </div>
      </div> */}
    </footer>
  );
}
