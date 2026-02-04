import type React from "react";
import { HighImpactHero } from "@/components/Blocks/Heros/HighImpactHero";
import { LowImpactHero } from "@/components/Blocks/Heros/LowImpactHeroType";
import { MediumImpactHero } from "@/components/Blocks/Heros/MediumImpactHero";
import type { Page } from "@/payload-types";

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
};

export const RenderHero: React.FC<Page["hero"]> = (props) => {
  const { type } = props || {};

  if (!type || type === "none") return null;

  const HeroToRender = heroes[type];

  if (!HeroToRender) return null;

  return <HeroToRender {...props} />;
};
