import { aiExplicitContent } from "./ai";
import { cloudExplicitContent } from "./cloud";
import { caseStudyExplicitContent } from "./case-studies";
import { homeExplicitContent } from "./home";
import { energyExplicitContent } from "./energy";
import { companyExplicitContent } from "./company";
import { industrialExplicitContent } from "./industrial";
import { siliconExplicitContent } from "./silicon";
import type { ExplicitContentEntry, ExplicitContentMap } from "./types";

const explicitContent: ExplicitContentMap = {
  ...homeExplicitContent,
  ...energyExplicitContent,
  ...companyExplicitContent,
  ...industrialExplicitContent,
  ...siliconExplicitContent,
  ...aiExplicitContent,
  ...cloudExplicitContent,
  ...caseStudyExplicitContent,
};

export function getExplicitContent(stableKey: string): ExplicitContentEntry | null {
  return explicitContent[stableKey] ?? null;
}

export const explicitContentKeys = Object.freeze(Object.keys(explicitContent));
