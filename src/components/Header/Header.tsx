import Link from "next/link";
import Logo from "@/assets/img/tma-logo.svg";
import type { Header as HeaderType } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { MouseGradientBg } from "../Effects/MouseGradientBg";
import { HeaderNav } from "./HeaderNav";

export async function Header() {
  const headerData: HeaderType = await getCachedGlobal("header", 1)();

  return (
    <header className="top-0 z-20 fixed fl-py-2/6 w-full page-margin">
      <div className="section-px">
        <div className="relative bg-header fl-px-4/8 fl-py-2/4">
          <div className="z-5 relative flex justify-between">
            <Link href="/">
              <Logo className="fl-w-[63/75]" />
            </Link>
            <HeaderNav data={headerData} />
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
