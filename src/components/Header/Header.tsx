import Logo from "@/assets/img/tma-logo.svg";
import type { Header as HeaderType } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { MouseGradientBg } from "../Effects/MouseGradientBg";
import { LogoLink } from "../ui/LogoLink";
import { HeaderNav } from "./HeaderNav";

export async function Header({ isLivePreview }: { isLivePreview: boolean }) {
  const headerData: HeaderType = await getCachedGlobal("header", 1)();

  return (
    <header className="top-0 before:bottom-1/2 left-0 z-20 before:-z-10 fixed before:absolute before:-inset-5 before:bg-linear-to-b before:from-body before:via-50% before:via-body/80 before:to-body/0 w-full clamp-[py,2,6]">
      <div className="page-margin section-px">
        <div className="relative bg-header clamp-[px,4,8] clamp-[py,2,4]">
          <div className="z-5 relative flex justify-between">
            <LogoLink draft={isLivePreview}>
              <Logo className="clamp-[w,63,75]" />
            </LogoLink>
            <HeaderNav data={headerData} isLivePreview={isLivePreview} />
          </div>
          <MouseGradientBg
            id="header"
            size="25vmax"
            opacity={0.1}
            className="absolute inset-0"
          />
        </div>
      </div>
    </header>
  );
}
