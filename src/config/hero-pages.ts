import type { BackgroundImageHeroOverlay } from "@/components/sections/hero";
import type { HeroTone } from "@/components/sections/hero/hero-foundation";
import {
  DEFAULT_HERO_IMAGE,
  DEFAULT_HERO_IMAGE_ALT,
  HERO_IMAGES,
} from "@/config/hero-content";

export type HeroVariant = "split" | "background";

export interface HeroCta {
  label: string;
  href: string;
  variant?: "primary" | "secondary-dark" | "outline";
  icon?: string;
}

export interface HeroPageConfig {
  variant: HeroVariant;
  eyebrow?: string;
  title: string;
  titleLines?: string[];
  titleAccent?: string;
  titleAccentClassName?: string;
  description?: string;
  supportingText?: string;
  image: string;
  imageAlt: string;
  overlay?: BackgroundImageHeroOverlay;
  tone?: HeroTone;
  ctas?: HeroCta[];
  imagePosition?: "left" | "right";
}

const PCB = DEFAULT_HERO_IMAGE;
const PCB_ALT = DEFAULT_HERO_IMAGE_ALT;

function bg(
  title: string,
  config: Omit<Partial<HeroPageConfig>, "title" | "variant"> & {
    description?: string;
  } = {}
): HeroPageConfig {
  return {
    variant: "background",
    title,
    image: PCB,
    imageAlt: PCB_ALT,
    overlay: "gradient-left-light",
    tone: "light",
    ...config,
  };
}

function split(
  title: string,
  config: Omit<Partial<HeroPageConfig>, "title" | "variant"> & {
    description?: string;
  } = {}
): HeroPageConfig {
  return {
    variant: "split",
    title,
    image: PCB,
    imageAlt: PCB_ALT,
    tone: "dark",
    ...config,
  };
}

export const heroPageConfigs: Record<string, HeroPageConfig> = {
  "about-us": bg("Embedded Product Engineering Consultancy", {
    eyebrow: "About Mind Matrix Intelligent Solutions",
    description:
      "Mind Matrix Intelligent Solutions is an India-based engineering consultancy specializing in embedded electronics and industrial product development.",
    supportingText: "Nearly 18 years of industry experience.",
    image: HERO_IMAGES.aboutBench,
    imageAlt: "Engineering bench with embedded prototype hardware under test.",
  }),
  "services": split("Embedded Product Engineering for Industrial and Power-Electronics Applications", {
    eyebrow: "Expert Engineering Services",
    description:
      "Custom embedded hardware, firmware and communication-system development — from requirement analysis and architecture through prototype validation and production support.",
    tone: "light",
  }),
  "connectivity": split("The Precision of", {
    eyebrow: "ADVANCED WIRELESS SYSTEMS",
    titleAccent: "Total Connectivity.",
    titleAccentClassName: "text-primary/40",
    description:
      "Engineering resilient, long-range, and ultra-low-power wireless ecosystems for the industrial frontier. From LoRaWAN to LTE Cat-M, we architect the nervous system of modern infrastructure.",
    tone: "light",
  }),
  "case-studies": split("Selected Project Experience", {
    eyebrow: "Projects",
    description:
      "Experience across a broad range of embedded and industrial product-development assignments. Summaries below are anonymized and presented without customer-identifying information.",
    tone: "light",
  }),
  "contact-us-and-engineering-consultation": split("Discuss Your Embedded Product Requirement", {
    eyebrow: "Engineering Consultation",
    description:
      "Have an embedded product requirement, a difficult firmware issue, or an existing design that needs improvement? Share the requirement with Mind Matrix Intelligent Solutions for an initial engineering discussion.",
    tone: "light",
  }),
  "careers": split("Join the Architects of", {
    eyebrow: "Precision Talent Wanted",
    titleAccent: "Innovation.",
    titleAccentClassName: "text-secondary",
    description:
      "At Mind Matrix, we don't just build software. We engineer the digital infrastructure of tomorrow with industrial-grade precision and technical authority.",
    tone: "light",
    ctas: [
      { label: "Explore Roles", href: "#positions", variant: "primary" },
      { label: "Our Culture", href: "#culture", variant: "outline" },
    ],
  }),
  "application-notes-and-design-guides": split("Application Notes", {
    description:
      "Detailed engineering implementations, architecture best practices, and systematic how-to guides for scaling Mind Matrix engagements across high-stakes industrial ecosystems.",
    tone: "light",
  }),
  "engineering-whitepapers": split("Technical Whitepapers", {
    description:
      "In-depth engineering analysis and architectural blueprints for next-generation industrial systems and IoT integration.",
    tone: "light",
  }),
  "technical-knowledge-base": split("Articles & Systems Theory", {
    eyebrow: "TECHNICAL REPOSITORY",
    description:
      "A comprehensive index of engineering breakthroughs, technical retrospectives, and future protocol architectural frameworks managed by the Mind Matrix team.",
    tone: "light",
  }),
  "technical-downloads-and-sdks": split("Technical Assets", {
    eyebrow: "Mind Matrix Workspace",
    description:
      "Access the definitive library of engineering schematics, firmware SDKs, and CAD models for the Mind Matrix ecosystem. All files are versioned and SHA-256 verified.",
    tone: "light",
  }),
  "terms-and-conditions": split("Terms of Website Use", {
    eyebrow: "Legal",
    description: "Mind Matrix Intelligent Solutions",
    tone: "light",
  }),
  "microchip": split("Embedded Intelligence for Mission-Critical Engineering.", {
    eyebrow: "Architectural Foundation",
    description:
      "Precision-engineered Microchip solutions spanning PIC, AVR, and SAM architectures. We bridge the gap between legacy reliability and high-performance modern integration for global industrial leadership.",
    tone: "light",
    ctas: [
      { label: "EXPLORE ARCHITECTURES", href: "/connectivity", variant: "primary" },
      { label: "VIEW DATASHEETS", href: "/connectivity", variant: "outline" },
    ],
  }),
  "nordic": split("Ultra-Low Power Wireless Engineering", {
    eyebrow: "Nordic Semiconductor Ecosystem",
    description:
      "Pioneering the future of BLE and proprietary 2.4GHz wireless communication. We provide the technical authority required for complex mesh networks and high-stakes IoT deployment.",
    tone: "light",
    ctas: [
      { label: "Explore nRF53 Series", href: "/technical-downloads-and-sdks", variant: "primary" },
    ],
  }),
  "esp32": split("ESP32: The Apex of IoT Convergence", {
    eyebrow: "Technical Specification v3.0",
    description:
      "Engineered for the demands of industrial precision and mobile connectivity, the ESP32 platform integrates Wi-Fi, dual-mode Bluetooth, and dual-core processing into a single, power-efficient SoC.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAR98VuzWhYLoZtBd0AIX8OHGBA25T-F-nvNf0_EcoS9XWN2IH-bamXAg5loFJ4m9PnaUJrjUlxZAgHGwqZkgzR6x0-lbb-6m630NJvQJTK_f6tP2mfAL59qVrj0scNfwHTVh8bFiiamsmxMxJyX33Og-Dd9biD-UDxqexcBJs26AYmQN0CSnEC7IFP8WjrgHV7hW1Sw_uQghfhk9L36OkK5I_xx-6BH6BA8CrQ48LayDqWeylCX8VffVg0m4bBnFTPtiZI6KG_gHw",
    imageAlt: "ESP32 development board and wireless module hardware.",
    tone: "light",
    ctas: [{ label: "EXPLORE ARCHITECTURE", href: "/connectivity", variant: "primary" }],
  }),
  "texas-instruments": split("Texas Instruments: The Backbone of Global Electronics.", {
    eyebrow: "Strategic Integration",
    description:
      "Pioneering the future of analog and embedded processing. From power management to precision sensing, we provide the technical authority required for high-stakes industrial systems.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUSSZsF9FOnKiIjZS4kw9Bthi-EF96GUBnewRRuBmL7tPuCvhoahg_Awd9GLWISwlkP9QwLVSDon-webf7kSEFP9Hm2aNifeqUnoavaBblNWjtr3BerORIIpD8nkbhRDmBaokFbwW4WIlYC8NV3n1qIlkcSaKl2qIo9VzN3wfoyL-JULmitMS2P5hQTOQ7c5Tm--kJ_4VvBpBuaJYkBPUzQeDU8bxkmeWGd6wIWuS2yoBuuMDlKrexopUc7EhL4zt3Zjz0XDkOb8w",
    imageAlt: "Texas Instruments industrial electronics hardware.",
    tone: "light",
    ctas: [
      { label: "Explore Portfolio", href: "/texas-instruments", variant: "primary" },
      { label: "Technical Specs", href: "/texas-instruments", variant: "outline" },
    ],
  }),
  "energy-management": split("Total Energy Visibility for", {
    eyebrow: "Industrial IoT Solutions",
    titleAccent: "Enterprise Infrastructure",
    titleAccentClassName: "text-secondary",
    description:
      "Optimize consumption, mitigate peak loads, and automate compliance with our high-fidelity industrial energy management ecosystem.",
    tone: "light",
    ctas: [
      { label: "Analyze Your Energy", href: "/embedded-firmware-development", variant: "primary" },
      { label: "View Tech Stack", href: "/embedded-firmware-development", variant: "outline" },
    ],
  }),
  "battery-energy-storage": split("Mission-Critical", {
    eyebrow: "ACTIVE PROJECT SECTOR",
    titleAccent: "Battery Management Systems",
    titleAccentClassName: "text-outline",
    description:
      "Engineering reliable, high-density energy storage architectures that bridge the gap between volatile renewables and grid stability. Precision-tuned for thermal safety and peak efficiency.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6ERt8zhudaKwu--cBaOc8ibpF7AljR6ts8f7AX4IZxAYp0cJFaSGt2LiWPw6GHzxEaMHssSV0I9X7HR7pFsE6KeK_JxQespKyPYPrLdmmewemRqWlL2n_7ROGVWcAzjmrlGbGksdmkstDqcLg04W-juWj4fuZUBA2MIFFhh-RtGj3_qfxs2x5AmbyHQnj8uGHi5skj61X2oS0N0HXMHJ9nPfKkkhDVaouZinwEJW1HrYId2xkr_Ljd2NS6uKxtjP7V-MZtz9RLng",
    imageAlt: "Battery energy storage system hardware.",
    tone: "light",
    ctas: [{ label: "Engineer Your Storage Solution", href: "/battery-management-system", variant: "primary" }],
  }),
  "building-automation": split("Smart Building Ecosystems for Sustainable Spaces", {
    eyebrow: "Industry Focus: Building Automation",
    description:
      "Engineered precision for the modern skyscraper. We integrate disparate systems into a unified, high-performance nervous system for high-stakes urban environments.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFrAXEWabFAGWBZJAkd6CA6B08VscUyamxuhEETuJcj9MvlLv4qyYaqyKGQMu1UxG8sBuXjOS0kvfPlhfyXQ6Zh1R6FeuQD6S1n7c2Ql8POt64KFBbsicvPAAH-1Wd-Yp7y6UDxeRXnnL4n-hIiByi9OucvSGtJ5AKVDKKWX2Kg11h-pZhpPE1qnpkeujly119WMrt6D2XTCMCXXBzkQu1iq703kS329vw1aF89Yc3grPCfoGH2PK-wrbxturm5Bk99EUPxA1gjfg",
    imageAlt: "Smart building automation control systems.",
    tone: "light",
    ctas: [
      { label: "Build Smarter", href: "/cognitive-core-os", variant: "primary" },
      { label: "Explore Platform", href: "/cognitive-core-os", variant: "outline" },
    ],
  }),
  "earth-resistance-monitoring": split("Earth Resistance", {
    eyebrow: "Industrial Safety Suite",
    titleAccent: "Monitoring",
    titleAccentClassName: "text-on-primary-container",
    description:
      "Critical infrastructure protection through real-time telemetry. Our precision analog front-end systems provide continuous grounding verification for high-stakes electrical environments.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmkyrrs-op7kF7pc5WWqOZPKJfRSiKrDua580anhJoiPVnlHerMnnbQottQJSGZZIxTOJX-NXcY307oZEgE7erkcbUqmX42Fa7vDJORBju6e7oMJOyGWWsWgJovR472H6WK2sN1FnBOudFiHdadTnLbwtfqPVm0OjvtRgpOxKZeG1ZQEFuE9QX7IT-WSsMjhCI3Xk_M1Jv53i-yS6fURqt4jhyRIcYYgcdEiSpAQ8sMrI_Fj0JQEzCEBoFAJNs9ZaU9ZNY1Ho3xxk",
    imageAlt: "Earth resistance monitoring instrumentation.",
    tone: "dark",
    ctas: [
      { label: "Deploy Solution", href: "/renewable-energy", variant: "primary" },
      { label: "Download Technical Spec", href: "/renewable-energy", variant: "secondary-dark" },
    ],
  }),
  "metropolis-ev-transit": split("The Inefficiency Bottleneck", {
    description:
      "Legacy charging systems were unable to meet the high-throughput demands of 24/7 bus operations. Inefficient infrastructure was stalling fleet electrification initiatives globally.",
    supportingText:
      "Core challenges: high-power thermal management for sustained 350kW loads; dynamic multi-node load balancing across municipal grids.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDD9O-Ra3j5Ow0rmioQ52U-nnpXyLHlbkYmP_2hV7zVUMDw63wQwUYzAoDUyGIc1Ht798gj2W0w-9GFJw9EsOozn-s-LPaylOdFcSqdQnX2wi3olBUD1eGrdmzXAXLZIDjyEIqg8MIpIunqfu5x-ZfGQsPTACXu7pN8UYFnCLrmxwFliorHIZrjdTREZlB-j-kUejPPMpjdt8R_-vMYNSbSvNaxS98-sfR4--5SwYIA2NwhEc58qGYnMAtstEoyqOQC8zDGHZ6Xog",
    imageAlt: "EV transit charging infrastructure.",
    tone: "light",
  }),
  "cognitive-core-os": bg("Cognitive Core OS: Deterministic Intelligence", {
    eyebrow: "Embedded Systems Case Study",
    description:
      "Engineered for sub-microsecond precision in high-stakes human-robot collaboration environments.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2WxKvCB7SkA9AQmkcoNC-zy0prKB_DOA26SMrlyunKCyC3PVDUgDukv56dA7EIJVLg4QkVHh4Bzr3un8r0ZJYDePWacJF1mT6hWZbLhHoY_bBXItFFN5mUyltabWjqBz9vv_WCKb5j6JvKR6rTqMHZRpKyhGItcq9Dn0tadCn8nSKjMi0DDrqUBzANLl7HvRxWRBsmqXpiLprPnrzMYlhKHubtgtB4z-9O20wamtkJeAr3_td76b_VBg4mvFTqobR6CExVOdBxQk",
    imageAlt: "Cognitive Core OS embedded systems architecture.",
    overlay: "gradient-left-dark",
    tone: "dark",
  }),
  "quantum-ready-data-architecture": bg("Quantum-Ready Data: Securing the Digital Frontier", {
    eyebrow: "Industrial Cyber-Security",
    description:
      "Deploying post-quantum cryptographic standards to safeguard critical energy infrastructure from next-generation threats.",
    supportingText: "SECTOR: Energy & Infrastructure",
    image: HERO_IMAGES.offshoreOil,
    imageAlt: "Industrial infrastructure with secure data network overlay.",
    overlay: "gradient-left-dark",
    tone: "dark",
    ctas: [{ label: "EXPLORE SOLUTION", href: "/iot", variant: "primary" }],
  }),
  "environmental-monitoring": bg("Data-Driven Stewardship for the Planet", {
    eyebrow: "Industry Expertise",
    description:
      "Engineering precision for fragile ecosystems. We bridge the gap between heavy industry and ecological preservation through hardened, low-power monitoring architectures.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnXBqmhV6me6yh4EL45GjjxIhCKoIek5SLp7DzLQ2zegLxG6NBrQyzAZo95gZhJ7gb6qdiKRqgQXCRbZXDXGnk7HQSV2RgR6ePgLg3b3hhHlc9p5ny-OOy-lSqtefhb-Y5iSiic2RF6ksUrnNZCeMjENWurVBqC_r5nJFK9B1corxKwYloPtqjeAdOSTqIn4rrGq7m721xhft2WJ2CGe-E_xTf8fMmHX9painiWG9xqDYmXc6dOPB0qOEMKElWAE1H0NgvUp6cIxQ",
    imageAlt: "Environmental monitoring sensor deployment.",
    overlay: "gradient-left-dark",
    tone: "dark",
    ctas: [
      { label: "Download Specs", href: "/nanolithography-cluster-control", variant: "primary" },
      { label: "View Case Studies", href: "/case-studies", variant: "secondary-dark" },
    ],
  }),
  "hyperloop-beta": bg("Hyperloop Beta: Sub-Microsecond Validation", {
    eyebrow: "Project Case Study 041",
    description:
      "Engineered precision for the digital frontier. Validating high-speed transients where standard DAQ systems fail.",
    supportingText: "Tags: FPGA Architecture, Bare-Metal C++, LoRaWAN Integration",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDY2qw5uTkmlqis24_huntfvRrTBRH-tO-5pO599u0FjY0TyvoQMzDZdRCAvXucMC1qQ7VN2OnlnY4ZujsEz2CqoNY3LF0Pi4Suqu05eydyBV-EecrliS__n9db3pY1Hh6mvSZYiyuG6K07HESR6-5y-t2J_cTAwEd6FkelO2Z1jLiIpKw-cR-Px8KMUq4CgwvKpv0eGHPGgPPwC5QlkYsqZGyJ1lZABMoDib2pL6bprQNfPegM5ufVnhuZP8sbo0dBYiHHzyFddJA",
    imageAlt: "Hyperloop telemetry validation system.",
    overlay: "gradient-left-dark",
    tone: "dark",
  }),
  "atacama-solar-reserve": bg("Atacama Solar Reserve: Grid-Scale Energy Stability", {
    eyebrow: "Engineering Excellence",
    description:
      "Stabilizing high-yield solar output in the Earth's most demanding thermal environments through advanced BESS architectures and real-time deterministic control systems.",
    supportingText: "Stats: 4.2GW Capacity Managed | 99.9% System Uptime",
    image: HERO_IMAGES.solarFarm,
    imageAlt: "Large-scale solar array in the Atacama Desert.",
    overlay: "dark",
    tone: "dark",
    ctas: [{ label: "Download Technical Whitepaper", href: "/smart-grid", variant: "primary" }],
  }),
  "the-future-of-deterministic-edge-computing": bg("The Future of Deterministic Edge Computing", {
    eyebrow: "Engineering Report",
    description:
      "Examining the convergence of real-time operational technology and high-performance edge fabrics in next-generation industrial ecosystems.",
    supportingText: "May 24, 2024 • 12 Min Read",
    image: HERO_IMAGES.dataCenter,
    imageAlt: "Industrial data center infrastructure.",
    overlay: "gradient-left-dark",
    tone: "dark",
  }),
  "pipeline-monitoring": bg("Intelligent Leak Detection and Flow Analysis", {
    eyebrow: "Industrial Precision",
    description:
      "Securing critical energy infrastructure through high-fidelity acoustic monitoring and real-time pressure-wave telemetry.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDK5z1RiSrfIAbuoBsnpZoX1R2DcgTa6FN32oQEFU1oIK7aA-NuB9pldeABsnSLNZB3jy1mo21pSVMavrv4MmgLNFGQNfjaTxIOkEHQtLVY0oG_pBeq9oTht9dF-TuFKAj2K3T8cee2Th8X_H24jAB6v03Q1qHHl4Pc2IrUbL8Tj_NvtVYRcV1UVAHk0bClkUWmwbJpXnnDm8gENl17kk43BDFVf610c85agnIWi-c9l5MQklpkbWvSLVUh1FkxHpNhAjC9yxuNW00",
    imageAlt: "Pipeline monitoring sensor network.",
    overlay: "gradient-left-dark",
    tone: "dark",
    ctas: [{ label: "Monitor Your Infrastructure", href: "/wireless-sensor-network", variant: "primary" }],
  }),
  "smart-grid": bg("Intelligent Power Distribution for the", {
    eyebrow: "INDUSTRY: SMART GRID",
    titleAccent: "Modern Grid",
    titleAccentClassName: "text-primary-fixed",
    description:
      "Engineering resilient, adaptive, and high-performance energy networks through advanced industrial protocols and hardware-level cybersecurity.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-uQrNShtP8tweq3KNzr5SIXIH0KUNijbJqcnd3C1t5BZcaPovEak8ESBAORzqIgLaRV742fBHyDk-t2mTKfDLs1X1SPeys-Nvh0EnfVW6O01wU3xXfpmX_X3bWSfzl_WKNOWbF7L5-nq5Dx3AyeFxYuFBy9ue5XMz7xLh8TGLZ4Jp6btRSh9d4uP2UtSTuw9_weho89hjUIesZ-JElcxl1KWnfWEe5k_bUhzDqH--roD4LNMt6KgpgXKKx7v4XoBIGpHTuovKSgQ",
    imageAlt: "Smart grid power distribution infrastructure.",
    overlay: "gradient-left-dark",
    tone: "dark",
    ctas: [
      { label: "Optimize Your Grid", href: "/solutions", variant: "primary" },
      { label: "Technical Specs", href: "/solutions", variant: "secondary-dark" },
    ],
  }),
  "oil-and-gas": bg("Resilient Engineering for the Energy Sector", {
    eyebrow: "OIL & GAS SECTOR",
    description:
      "Pioneering ruggedized sensor networks and ultra-low-power telemetry systems designed for the world's most demanding extraction environments.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsCW_5UuXc5rk5mrNm_RdBLx5IFiZ_ABqGzJQxzBn1ETmOr4mgCWlB73YBpKVV2kHEFJs1HLfrM7zP4L3GMDd4z801ftH9Ze5A2-9GHJNhpEgw7IbsQmFp_WsFBdCg2zXZ_TTC9gn7wYSTJIPr4ldlMAfuP6hGUw6elx-TRlcJKpQSkf63eaHH7cqZYFUPFRmTDQxf5ZOQ1dYaESwl4yDDx9kQbs0Tt51J7DxCNSPDr5Va9v2Zrto6DOtW3XoqIHyqNuCgsA1nzDo",
    imageAlt: "Offshore oil and gas industrial infrastructure.",
    overlay: "gradient-left-dark",
    tone: "dark",
    ctas: [
      { label: "SECURE YOUR OPERATIONS", href: "/quantum-ready-data-architecture", variant: "primary" },
      { label: "REQUEST TECHNICAL REVIEW", href: "/quantum-ready-data-architecture", variant: "secondary-dark" },
    ],
  }),
  "renewable-energy": bg("Engineering the Future of", {
    eyebrow: "Sector: Renewable Infrastructure",
    titleAccent: "Renewable Energy",
    titleAccentClassName: "text-primary-fixed",
    description:
      "Advancing global decarbonization through high-precision power electronics, industrial-grade telemetry, and predictive maintenance frameworks designed for the harshest environments.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3VCfa-VTF27O1oNq5vOqfQoqsxc_m9D3fKOL2B80G6ws8t8AzEh-ZD_dFqOIsYsdrSV-6y0Og8wT3YihC7iJ2s4Er3xxn5TiRr271pgZe_HELUxFUnGk93lQqCz_aGqUG9xuBJf9F41MHktp8AQW49Zw6A0aDyF7VyzV6sr9Ub5iMtPLXP3gbzL-ldvcMSQHB0Zg55PKUF44WegXXxZG3HDs0SXLGxDAUADtn-2IswuIcjaLeFkU7c8eX_h4JpVfAmapvXz9KLQ4",
    imageAlt: "Renewable energy generation infrastructure.",
    overlay: "gradient-left-dark",
    tone: "dark",
    ctas: [
      { label: "Consult our Energy Experts", href: "/renewable-energy", variant: "primary" },
      { label: "View Technical Specs", href: "/renewable-energy", variant: "secondary-dark" },
    ],
  }),
  "remote-monitoring": split("Remote Asset Monitoring & Intelligence", {
    eyebrow: "Industry 4.0 Standard",
    description:
      "Real-time technical visibility across your global industrial footprint. Engineering precision for mission-critical asset tracking and predictive diagnostics.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBp4_0zoGwrt7h2qOM8Wz4eZ8-ex-cqe-uLeXinz3X01Z5sQsmX2hAxGhfi4pA0i5LzhZ2eQeyoDOe0Fc4vZM9qJSTGtOPuBFIba9IGR-Ty3QrjS58pmwTgnRa08FnUra7rExLFSunPP3vm8sIk-DkRme1UWgodAwKucrlgLA5ce9qi_arUSR7xpoLMjuP9vlRbdGqxiEdydBntBLbGTPJIoJv9rX9uFgLbUPm0oFbZArkTiAcaZNDUOQhhEMfEORNgkxgumStD4OI",
    imageAlt: "Remote industrial asset monitoring dashboard.",
    ctas: [
      { label: "Deploy Solutions", href: "/manufacturing", variant: "primary" },
      { label: "Technical Specs", href: "/manufacturing", variant: "outline" },
    ],
  }),
  "industrial-controller": split("Industrial Controller Matrix-X1", {
    eyebrow: "SIL3 CERTIFIED SYSTEM",
    description:
      "The ultimate edge-processing unit for ultra-low latency industrial automation. Engineered for high-stakes precision in robotics and assembly lines.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOif_bnp00aAPWQh3G-kpAWFzMXah_ryCXoBDC1x6nx1M5rN8oC4Csasx5L5_7s2NVRRemWzOKVPRIpdHZ6q5zmLx_qjdLtLFn0OzliJn-GAUMJ-d-veR9cr2sDhR8tun30gY3sac9vueSuyg1H6r-ArvYpLWAsl7xss_OReQQnc6mj-m3SMsnRPV_VSqfjBDpqfX4GVBMn9Ez5ouVSrbAmFtJoxN-cKJ6B6n_65t_-Paa07-Vxk-TyteIK2Y-Xz1ctKIQsHIP5iM",
    imageAlt: "Industrial controller hardware unit.",
    tone: "light",
    ctas: [
      { label: "Download Datasheet", href: "/industrial-controller", variant: "primary" },
      { label: "Explore Architecture", href: "/industrial-controller", variant: "outline" },
    ],
  }),
  "nxp": split("i.MX Application", {
    eyebrow: "Precision Engineering",
    titleAccent: "Processors",
    titleAccentClassName: "text-secondary-fixed",
    description:
      "Powering the next generation of edge intelligence with industrial-grade reliability. Mind Matrix delivers advanced MCU solutions for automotive safety and smart-city infrastructure.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgnhNFGa-Rt3ZuMGKEc-k7_jmRgieWiP0lkT0m9pMUI7LS_6Fa5LySFPwfodIRf_LgVQJDASMbefM94LCLFid_ouncEGiWM7wgu-OxnJjgBKOYGLsZUGy-jlAOblxjAAhumSWaT9lpAssnEKKQQFDSFCViQ5ZSN6vbQ968SCvQ-XWpJ3NJqWLfxFwBcs6Xo2PNtnFsFCJZR7GNIDoLdisQ0cLp_YP6og2xakTdDcz0nNM3TYbCGgP2JYkW1Glf90qFw7oud4k3TDA",
    imageAlt: "NXP i.MX application processor hardware.",
    tone: "light",
    ctas: [{ label: "DOWNLOAD WHITE PAPER", href: "/technical-downloads-and-sdks", variant: "primary" }],
  }),
  "embedded-measurement-system": split("Embedded Measurement Systems", {
    eyebrow: "Industrial Precision V.4.0",
    description:
      "High-fidelity data acquisition engineered for the rigorous demands of aerospace and automotive R&D. Sub-microsecond latency meets industrial-grade durability.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBCUF4lTvv5DC-s6vL__GGuMs-jZuiYeKMLgQBjHhkQx8lgI1Lj-z3amd7TmOllwlhUQTKzFrKSpTNlyiI2-vnmBxurPh4nHv1FR3I8TsYpJYAELs5gP9XaK23ezYCy_7pnKrMvhlHiOEbCA0t-z34CnhXyML-M5IDXUVglRYrMt16UZOULYf4O4ko7vpBl5gomoNR8322LzicSsRxhaWfoeRjkHRLdSXQXCXGENd3bCM_0bmX6RSG7Gp5qNEWs8CZmYD8uW0YJGeg",
    imageAlt: "Embedded measurement system hardware.",
    tone: "light",
    ctas: [
      { label: "Explore Architecture", href: "/embedded-measurement-system", variant: "primary" },
      { label: "Technical Specs", href: "/embedded-measurement-system", variant: "outline" },
    ],
  }),
  "hardware-development": split("Engineering Next-Gen", {
    eyebrow: "INDUSTRIAL PRECISION ENGINEERING",
    titleAccent: "Hardware Ecosystems",
    titleAccentClassName: "text-primary/60",
    description:
      "End-to-end hardware development for mission-critical applications. From complex multi-layer PCB design to FPGA acceleration, we build the technical foundation of your digital frontier.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgnhNFGa-Rt3ZuMGKEc-k7_jmRgieWiP0lkT0m9pMUI7LS_6Fa5LySFPwfodIRf_LgVQJDASMbefM94LCLFid_ouncEGiWM7wgu-OxnJjgBKOYGLsZUGy-jlAOblxjAAhumSWaT9lpAssnEKKQQFDSFCViQ5ZSN6vbQ968SCvQ-XWpJ3NJqWLfxFwBcs6Xo2PNtnFsFCJZR7GNIDoLdisQ0cLp_YP6og2xakTdDcz0nNM3TYbCGgP2JYkW1Glf90qFw7oud4k3TDA",
    imageAlt: "Hardware development PCB and chip layout.",
    tone: "light",
    ctas: [
      { label: "Start Your Project", href: "/manufacturing", variant: "primary" },
      { label: "Download Capabilities Deck", href: "/manufacturing", variant: "outline" },
    ],
  }),
  "industrial-iot-solutions": bg("Engineering Precision for the Digital Frontier.", {
    eyebrow: "Industrial Intelligence 4.0",
    description:
      "Seamlessly bridge the gap between physical assets and digital intelligence with our enterprise-grade Industrial IoT ecosystem. Architecture designed for absolute reliability.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEN0rKQVyVnnzz16nXGYXE179uMMFwZ9WRrU2LFjmMgn9DFosJ8AqOgD9fkTB6ykBZI5WDPiB-7OAE2YW3ZpNocsZ5mQWSV7_n_nxZYAau5EOdtPeTftQH697zhraTflIJeXiabBgj-mCp7sPPaAnhGFKKo1lu2eRp2BcEi4FSt4i4m1Of_KZ5xmHQ42UUhgQ-roxrkJghbN_ixLYCnnN2XP_oVTzC0n9PyjvN0PLl0h4QNBDKtEDmoHsQSUc8Jj6exDZN3xwVtYc",
    imageAlt: "Industrial IoT connected systems.",
    overlay: "gradient-left-dark",
    tone: "dark",
    ctas: [
      { label: "Deploy Solutions", href: "/manufacturing", variant: "primary" },
      { label: "View Architecture", href: "/manufacturing", variant: "secondary-dark" },
    ],
  }),
  "aws-iot": split("Engineering the Intelligent Edge with AWS IoT", {
    eyebrow: "Cloud-to-Edge Infrastructure",
    titleAccent: "Intelligent Edge",
    titleAccentClassName: "text-secondary",
    description:
      "Deploy industrial-grade IoT solutions that scale. We leverage AWS IoT Core and Greengrass to bridge the gap between physical assets and cloud intelligence.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeig83CFKEA4N8sDqTzO8iw1j3WO5dOoo7qsv453xxRDZvt_HIb8ULJ7VuIqr_6HOLXcR233jvHsQTCkac1Z6kfGPEEwgPhUf6afWnQj_bJAq_vQvq6k69CWBBn3UPhuHz_r61P8u3n17w2y3OpLZxUzkMizlDYflIxVgC5YpBU3P1URomVvGPqYePTPa1ybzmTTaIgFntsJn6V2KX96LhGwGkWM6quAavTL8BXrTL503PXlzSrg4iUKPTeR9v3zUfmiIZcmql0yc",
    imageAlt: "AWS IoT cloud-to-edge architecture.",
    tone: "light",
    ctas: [
      { label: "Explorer IoT Core", href: "/connectivity", variant: "primary" },
      { label: "View Technical Docs", href: "/connectivity", variant: "outline" },
    ],
  }),
  "azure-iot": split("Architecting the", {
    eyebrow: "Enterprise IoT Framework",
    titleAccent: "Industrial Metaverse.",
    titleAccentClassName: "text-secondary-fixed-dim",
    description:
      "Seamlessly bridge the physical and digital divide with Mind Matrix IoT Hub and Digital Twins. Engineering precision for global manufacturing, logistics, and cloud-native embedded systems.",
    tone: "light",
    ctas: [
      { label: "Explore Architecture", href: "/azure-iot", variant: "primary" },
      { label: "Download Technical Specs", href: "/azure-iot", variant: "outline" },
    ],
  }),
  "engineering-consulting": split("Engineering the", {
    eyebrow: "PRECISION ENGINEERING ADVISORY",
    titleAccent: "Digital Frontier",
    titleAccentClassName: "text-on-primary-container",
    description:
      "We provide technical authority and architectural precision for enterprise leaders. From feasibility to execution, we minimize technical debt through rigorous simulation and modeling.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHrTsmj25-tznNQdni1s4E40BXRY36mBfREwwiRKF2DyMS_nzqUcwwQ3yzyJiFTSU8QZ7UA4ZnSYv8e3giaOUjhM9XHECX0wOh8WAB-c-kqNsOBZ8iNxpn_9Gi1GamWi5Gc40h2_gcPcMI81mEaKHBxzL4b1fcf_SjvmLBrM8WBhOY6ekcnF4wO4VedQ-ZB-PQC_nqjLKKLMn9rDHbQMtSiQdvc2Wirkv9NLO85iPiei0SMCEokionXNU3RlGemDQRmHYHAUUwpPI",
    imageAlt: "Engineering consulting technical review.",
    ctas: [
      { label: "Explore Capabilities", href: "/services", variant: "primary" },
      { label: "View Technical Portfolio", href: "/case-studies", variant: "secondary-dark" },
    ],
  }),
  "engineering-process": bg("A Disciplined Approach to Engineering Excellence", {
    eyebrow: "Systemic Reliability",
    titleAccent: "Engineering Excellence",
    titleAccentClassName: "text-secondary-fixed",
    description:
      "We bridge the gap between visionary concepts and industrial-grade reality through a rigid framework of technical validation and systemic oversight.",
    image: PCB,
    imageAlt: PCB_ALT,
    ctas: [{ label: "Explore Methodology", href: "/hardware-development", variant: "primary" }],
  }),
  "product-development": bg("Engineering the Digital Frontier.", {
    eyebrow: "Enterprise Precision",
    description:
      "Accelerate innovation with Mind Matrix's end-to-end product development suite. From intricate mechanical engineering to mass-market production, we provide technical authority at every micron.",
    overlay: "gradient-left-light",
    ctas: [
      { label: "Start Your Project", href: "/manufacturing", variant: "primary" },
      { label: "View Case Studies", href: "/case-studies", variant: "outline" },
    ],
  }),
  "industrial-automation": bg("Precision Control for Autonomous Production", {
    eyebrow: "Industry 4.0 Standard",
    description:
      "Engineering deterministic ecosystems where hardware and real-time firmware converge to redefine industrial efficiency and functional safety.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGveAdbHI-vT-ftpwd9bgW1SC7Ybl8WwSdcS_lGuB80W-ZBxQpTjr9tn10-ZKWt7BF_6dVAVgEWxaXEQSFLT57rYEc1iCvGIb7S1HiS82b9ryBHbV6zluv8Klg8PRF4m5hmitCTdoK6hTDVc1dM8EYqJqVaMkt_IdJKNNo45LvHhlFupHv_p2Lgx5W77j0n9kFRHSaOyxJjnlA9B1bBwpRtM5IqgC2Xi8KM64rcj4C1yQPFI27p597kS0hKqaBOm8DrTrVkDHx6CY",
    imageAlt: "Industrial automation control systems.",
    overlay: "gradient-left-dark",
    tone: "dark",
    ctas: [
      { label: "Explore Solutions", href: "/solutions", variant: "primary" },
      { label: "Technical Whitepaper", href: "/engineering-whitepapers", variant: "secondary-dark" },
    ],
  }),
  "telecom": bg("High-Availability Infrastructure for the Digital Frontier", {
    eyebrow: "TELECOM INFRASTRUCTURE",
    description:
      "We engineer high-frequency communication systems that bridge the gap between global connectivity and environmental extremes.",
    image: HERO_IMAGES.telecomTower,
    imageAlt: "Telecom infrastructure tower at dusk.",
    overlay: "gradient-left-light",
    ctas: [
      { label: "STRENGTHEN YOUR NETWORK", href: "/telecom", variant: "primary" },
      { label: "VIEW CASE STUDIES", href: "/case-studies", variant: "outline" },
    ],
  }),
  "embedded-firmware-development": bg("Industrial-Grade Firmware for Mission-Critical Systems", {
    eyebrow: "Specialized Engineering",
    description:
      "Engineering deterministic, low-latency firmware solutions that power the next generation of industrial automation, medical devices, and aerospace infrastructure.",
    image: HERO_IMAGES.firmwarePcb,
    imageAlt: "High-performance PCB with embedded firmware traces.",
    overlay: "gradient-left-light",
    ctas: [
      { label: "Download Capability Statement", href: "/technical-downloads-and-sdks", variant: "primary" },
      { label: "View Case Studies", href: "/case-studies", variant: "outline" },
    ],
  }),
  "freertos": split("FreeRTOS: Real-Time Engineered Precision.", {
    eyebrow: "Deterministic Embedded OS",
    titleLines: ["FreeRTOS: Real-Time", "Engineered Precision."],
    description:
      "The market-leading real-time operating system for microcontrollers and small microprocessors. Reliability delivered with sub-microsecond latency.",
    tone: "light",
    ctas: [
      { label: "EXPLORE KERNEL DOCS", href: "/energy-management", variant: "primary" },
      { label: "COMMUNITY SUPPORT", href: "/energy-management", variant: "outline" },
    ],
  }),
  "mqtt": split("MQTT: Precision Data Orchestration", {
    eyebrow: "Protocol Engineering",
    description:
      "A lightweight messaging protocol engineered for the digital frontier. Designed for mission-critical industrial IoT where bandwidth is scarce and reliability is non-negotiable.",
    tone: "light",
    ctas: [
      { label: "Explore Specs", href: "/industrial-automation", variant: "primary" },
      { label: "Technical Docs", href: "/industrial-automation", variant: "outline" },
    ],
  }),
  "industrial-protocols": split("The Backbone of Deterministic Connectivity.", {
    eyebrow: "Industrial Precision",
    description:
      "High-performance implementation of Modbus, EtherCAT, PROFINET, and CANopen protocols. Engineered for microsecond-level synchronization in high-stakes industrial environments.",
    tone: "light",
    ctas: [
      { label: "View Stack Documentation", href: "/connectivity", variant: "primary" },
      { label: "Interoperability Lab", href: "/connectivity", variant: "outline" },
    ],
  }),
  "battery-management-system": split("Next-Gen Battery Management Systems", {
    eyebrow: "Hardware Engineering • BMS",
    description:
      "High-voltage precision control for industrial-scale energy storage and electric mobility. Our BMS solutions offer unparalleled State of Health (SoH) diagnostics and sub-millivolt balancing accuracy.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA69alF1IZuLREt0WNT_h5FzDy-sZE6BelZ0-LWL1ck0U-HZP1Cl0bAOBzI0UBAQaagjH9uIf_lasUjx5Un_G2EJNfguMKqcJlzNRhOGYxCLlwK-KIeZK9K91V5OwSTJ806tZnJTGIT76vvOJUL-Gu5sVkemE68kM7CERGURgXCDug5v_s5rLS3uLd8Fs-l54aSLX2X2xyj_K7BN5qHWiJeHrJeY5Q13jhyF5YjrX8gFiSf_0oPoSO3BynoL_Nh3yptHkv-5xJ5DFw",
    imageAlt: "Battery management system hardware.",
    tone: "light",
    ctas: [{ label: "TECHNICAL SPECIFICATIONS", href: "/battery-management-system", variant: "primary" }],
  }),
  "ev-infrastructure": bg("Next-Gen Electronics for EV Charging Ecosystems", {
    eyebrow: "TRANSFORMING MOBILITY",
    description:
      "Engineering ultra-reliable power electronics and secure cloud integration for the global electric vehicle infrastructure frontier.",
    image:
      "/industries/Futuristic-EV-Charging-Laboratory.webp",
    imageAlt: "EV charging infrastructure electronics.",
    overlay: "gradient-left-dark",
    tone: "dark",
    ctas: [
      { label: "Scale Your EV Network", href: "/metropolis-ev-transit", variant: "primary" },
      { label: "Technical Whitepapers", href: "/metropolis-ev-transit", variant: "secondary-dark" },
    ],
  }),
  "smart-infrastructure": bg("Engineering the Foundation of Future Cities.", {
    eyebrow: "Industry Sector: Smart Infrastructure",
    titleAccent: "Future Cities",
    titleAccentClassName: "text-innovation-cyan",
    description:
      "Deploying resilient, high-reliability edge computing and mesh connectivity to modernize urban grids, transit systems, and structural monitoring.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAuHATbC3eZb8WRIysroSecpr3-FHe7D5hQJ8rvpbeyCYgOt1Ug5Ib7UejTPnzKeRK0x8aAnr5MbgvfiL7q6bqOWxk0a0-y9R1EpGOA_egi0HDc66H2dctLPE7fh73TMapR4LVNmo716Dhc_pDE3C9Cs-m1Tqr5IAa5dNY6WNmnBbJBLc7-5ORPUrg_jBO4SlWBZ28Ske9F9ppHeNJLj_9dCYvlZBmnOWljj2nD-HMmHDGnPk7sIDndq2CAhGvfB7yO18Iy7xbfsO4",
    imageAlt: "Smart city infrastructure systems.",
    overlay: "gradient-left-dark",
    tone: "dark",
  }),
  "wireless-sensor-network": split("Wireless", {
    eyebrow: "Industrial Connectivity 4.0",
    titleAccent: "Sensor Networks",
    titleAccentClassName: "text-on-primary-container",
    description:
      "Next-generation mesh topology for high-stakes industrial monitoring. Deploy ultra-low power, self-healing networks that operate in the most challenging electromagnetic environments.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJSUH2kzSrO_2GeF05PCsM686SUrzvNp5YtuAWRJ59CAx105oqqZh0RJGowFHESdx0ZitZiJBVvg6ApbEAh8SSw-AtS1sputZ2DA06XcFuSe9BGbRztC31naRtiOzmLSARDCY1xCVYMInJ-pMb5ZaFXGwtAR5zS9RlE3Ja2ksibS2o_SD5VVAdYc57cfD0TNthY9KP9Lvl2M_Y93_IWyA2xLeBpMv6hYnqzNNAs-28YrpJWvnpF8LeZd5J20tlPmo-ehbz6urGRA0",
    imageAlt: "Wireless sensor network mesh topology.",
    tone: "dark",
    ctas: [
      { label: "Explore Architecture", href: "/environmental-monitoring", variant: "primary" },
      { label: "Download Specs", href: "/environmental-monitoring", variant: "secondary-dark" },
    ],
  }),
  "faq": split("Technical Inquiries & Ecosystem Logic", {
    eyebrow: "Knowledge Base",
    description:
      "Explore our comprehensive documentation regarding service protocols, operational workflows, and strategic partnership frameworks.",
    tone: "light",
  }),
};

const HERO_SLUG_ALIASES: Record<string, string> = {
  rtos: "freertos",
};

export function getHeroPageConfig(slug: string): HeroPageConfig | undefined {
  const key = HERO_SLUG_ALIASES[slug] ?? slug;
  return heroPageConfigs[key];
}
