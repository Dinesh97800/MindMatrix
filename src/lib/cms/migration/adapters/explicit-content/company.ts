import { companyContact, formatCompanyAddress } from "@/config/company";
import { siteContent } from "@/config/site-content";
import { entry, type ExplicitContentMap } from "./types";

const adapter = "src/lib/cms/migration/adapters/explicit-content/company.ts";
const action = (label: string, href: string) => ({ label, href });

export const companyExplicitContent: ExplicitContentMap = {
  "about.production-transition": entry(adapter, "Block2006Section JSX plus siteContent", {
    heading: "Production Transition Support",
    body: siteContent.manufacturingSupport,
    supportingText: siteContent.confidentialityShort,
    cards: siteContent.coreServices.slice(0, 4).map((title) => ({ title })),
    actions: [action("Discuss Your Requirement", "/contact-us-and-engineering-consultation")],
  }),
  "about.core-principles": entry(adapter, "About Block2Section JSX literals", {
    eyebrow: "Our Core Principles", heading: "Led by Industrial Logic.",
    cards: [
      { title: "Uptime Obsession", body: "Every design choice is evaluated against the risk of disruption. We engineer for 99.999% human operational efficiency.", label: "01" },
      { title: "Material Truth", body: "We use high-grade alloys, tempered glass, and sustainable polymers. No veneers, no substitutes—only technical grade materials.", label: "02" },
      { title: "Digital First", body: "Infrastructure is never an afterthought. We wire the skeleton before we skin the surface, ensuring permanent connectivity.", label: "03" },
      { title: "Quiet Precision", body: "Design should never shout. Our aesthetic is silent, enabling deep focus and high-density technical work.", label: "04" },
    ],
  }),
  "about.partner": entry(adapter, "About Block3Section JSX literals", {
    title: "Partner with Global Authority.", body: "Ready to audit your current environment or plan a new technical frontier? Our consulting engineers are standing by.",
    actions: [action("Contact Engineering Dept", "/contact-us"), action("Download Capabilities PDF", "/technical-downloads-and-sdks")],
  }),
  "careers.culture": entry(adapter, "Careers Section JSX literals", {
    heading: "Engineering Culture", introduction: "Built on a foundation of clean-room mentalities and technical rigor. We value code that is as elegant as a high-precision machine.", label: "EST. 2024 / MM_ENG_PROTO",
    cards: [
      { title: "Precision Over Speed", body: "We prioritize architectural integrity. Every line of code is peer-reviewed against strict industrial standards to ensure absolute reliability.", icon: "architecture" },
      { title: "Open-Source DNA", body: "Contributing to the ecosystem that built us. 20% of our cycles are dedicated to upstream improvements.", icon: "terminal", badge: "STABLE_V2.0" },
      { title: "Hardware-Native", body: "Bridge the gap between silicon and software. We write for performance at the metal layer.", icon: "memory" },
      { title: "World-Class R&D Labs", body: "Our workspace is designed for deep work, featuring specialized clean rooms and prototyping zones.", media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFFfRAA0v7zJ38IIhPN3rw7CHkUJs2ohM0OdQc133Fk6qpVuas2f1MgTauwnARkr8tU5HqPzhyLG4oC05a-10YpO0MjouBdpK5acY3boXN6T9jzGYMxBFpV-2VqtJ7AZJwNBFA5cqH7Q6NL15PgpMSNuN69e7oCQUXUkmCn_SwkSAABbbGS6eYThtfGJaaREUfqEBrFLDyxcewSRI6-aTZKkLhpquroPhrKDpKrnwwmjTnuCPuIYvRKgudSCCxxt3f--3Miw3LAys" }, mediaAlt: "High-tech research and development laboratory with engineers and advanced robotic equipment." },
    ],
  }),
  "careers.employee-success": entry(adapter, "Careers Block2Section JSX literals", {
    title: "Engineering Your Success",
    items: [
      { title: "Top-Tier Remuneration", body: "Highly competitive salaries with performance multipliers and equity grants for key milestones.", icon: "payments" },
      { title: "Holistic Care", body: "Global healthcare coverage, dedicated mental health resources, and quarterly wellness stipends.", icon: "health_and_safety" },
      { title: "Work/Life Equilibrium", body: "Flexible remote options, unlimited PTO policy, and sabbatical programs after 4 years of tenure.", icon: "flight_takeoff" },
    ],
    featured: {
      title: "Voted Top Engineering Employer",
      body: "Recognized for industrial culture and innovation leadership by TechReview 2023.",
      icon: "workspace_premium",
    },
  }),
  "careers.jobs": entry(adapter, "Careers FiltersSection JSX literals", {
    heading: "Current Openings",
    introduction: "Find your next technical challenge. Filter by domain to narrow your search.",
    filters: [
      { label: "All Disciplines", value: "all" },
      { label: "Firmware", value: "Firmware" },
      { label: "Hardware", value: "Hardware" },
      { label: "AI & ML", value: "AI" },
    ],
    jobs: [
      {
        category: "AI",
        categoryLabel: "AI & Machine Learning",
        type: "Full-Time",
        title: "Senior Neural Architecture Engineer",
        body: "Design and optimize custom silicon neural engines for edge processing.",
        location: "Berlin, DE / Remote",
      },
      {
        category: "Firmware",
        categoryLabel: "Firmware",
        type: "Contract",
        title: "Low-Level Kernel Developer",
        body: "Optimizing RTOS kernels for industrial automation controllers.",
        location: "London, UK / Hybrid",
      },
      {
        category: "Hardware",
        categoryLabel: "Hardware",
        type: "Full-Time",
        title: "Lead PCB Design Specialist",
        body: "Leading high-frequency PCB layouts for next-gen communication modules.",
        location: "Austin, TX",
      },
      {
        category: "AI",
        categoryLabel: "AI & Machine Learning",
        type: "Full-Time",
        title: "Computer Vision Researcher",
        body: "Advancing industrial spatial awareness via multimodal transformer models.",
        location: "Remote / Tokyo, JP",
      },
    ],
    entityType: "job",
    references: [],
  }),
  "careers.general-application": entry(adapter, "Careers Block3Section JSX literals", {
    title: "Don't see a perfect match?", body: "We are always looking for exceptional engineers who obsess over precision. Send us your portfolio for a general application.",
    actions: [{ label: "Submit General Inquiry", action: "open-general-application" }],
  }),
  "consultation.office-map": entry(adapter, "InteractiveMapPlaceholderSection plus companyContact", {
    heading: "Our Office", locations: [{ label: companyContact.legalName, formatted: formatCompanyAddress(false), ...companyContact.address }],
    description: `${companyContact.legalName} is based in Gurugram, Haryana — serving engineering and industrial clients across India and internationally.`,
  }),
  "consultation.technical-faq": entry(adapter, "FaqItem1Section plus siteContent.consultationFaq", {
    heading: "Technical FAQ", introduction: "Common questions about how we scope and deliver engineering work.", items: siteContent.consultationFaq,
  }),
  "consultation.supporting-links": entry(adapter, "Consultation Section JSX plus companyContact", {
    heading: "Supporting Links", cards: [
      { title: "Technical Support", body: "Existing customer? Contact us for engineering support, issue diagnosis, or follow-up on an active project.", icon: "support_agent", link: action("Contact Support", "/contact-us") },
      { title: "About Our Team", body: `Learn more about ${companyContact.legalName}, our engineering approach, and the types of embedded product work we support.`, icon: "engineering", link: action("About Us", "/about-us") },
    ],
  }),
  "request-consultation.trust-copy": entry(adapter, "LeftColumnHighTrustContentSection JSX plus siteContent", {
    eyebrow: "Engineering Consultation", title: "Discuss Your Embedded Product Requirement", body: siteContent.contactCta,
    items: [
      { title: "Firmware & Hardware Support", body: "Bare-metal/RTOS firmware, integration, bring-up, debugging, and redesign.", icon: "developer_board" },
      { title: "Industrial Communication", body: "CAN, Modbus, RS-485, UART, SPI, I²C, Ethernet, MQTT and SNMP where applicable.", icon: "router" },
      { title: "Confidential Engagement", body: siteContent.confidentialityShort, icon: "verified_user" },
    ],
  }),
  "request-consultation.responsibility": entry(adapter, "Request consultation Section JSX plus siteContent", {
    eyebrow: "Confidentiality", title: "Project Information Handled Responsibly", body: siteContent.confidentialityStatement,
  }),
  "services.core-services": entry(adapter, "Card1Section plus siteContent.serviceGroups", {
    heading: "Core Services", introduction: siteContent.tagline,
    cards: siteContent.serviceGroups.map((service, index) => ({ ...service, icon: ["analytics", "architecture", "memory", "settings_input_component", "science", "bug_report", "upgrade", "router", "straighten", "factory", "support_agent"][index] ?? "engineering", link: action("View service", service.href) })),
  }),
  "services.engineering-approach": entry(adapter, "Services Section plus siteContent", {
    heading: "Our Engineering Approach",
    body: siteContent.intro,
    media: { source: "/Engineering-Approach.png" },
    mediaAlt: "Engineering workspace with a detailed circuit board during prototype bring-up and validation.",
    cards: siteContent.whyChooseUs.slice(0, 3).map(({ title, description, icon }) => ({
      title,
      body: description,
      icon,
    })),
  }),
  "services.requirement": entry(adapter, "Services Block2Section plus siteContent", {
    title: "Discuss Your Requirement", body: siteContent.contactCta,
    actions: [action("Engineering Consultation", "/contact-us-and-engineering-consultation"), action("View Project Experience", "/case-studies")],
  }),
  "resources.featured-article": entry(adapter, "FeaturedArticleCardAsymmetricLayoutSection JSX literals", {
    eyebrow: "Featured Perspective", heading: "Engineering Intelligence for the Modern Industrial Frontier.",
    body: "Discover how the latest advancements in LLMs are reshaping predictive maintenance and factory throughput efficiency.",
    media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuAng57jZNZ-zxut1Z0yDpgv4zIIvqouzS4ZEUHuCER8PI8zbwVKSQXB-MW_QIaeQULBH4MAtLvfAuZWiFd62dwXHtRWHDkFRgGUvFrqcNV8Y_QfHmxzNf7CiBhMQ2RKo0r_kyYrZ8L0bFZ6ld-cQp_cBZu5IJ6_BUT3fXHK61CgtZwN9hHVxisuQRNmuAp94fLeUJCH6lWr5EfuRu2lJlUuz2c_xkuZ4Dw7Nu6S29QWH_ZMqQQhZnDNmj9VDxOUMHlWvqixS210sp8" },
    mediaAlt: "High-tech clean-room facility with precision server racks and robotic arms.",
    callouts: [
      { title: "The Convergence of Generative AI and Industrial Automation: A 2024 Blueprint.", badges: ["Whitepaper", "AI Engineering"], link: action("Read Full Whitepaper", "/industrial-automation") },
      { title: "Technical Digest", body: "Semi-monthly deep dives into embedded systems and edge intelligence architectures.", action: "Subscribe for Updates", privacyCopy: "By subscribing, you agree to our Privacy Policy and technical disclosure terms." },
      { title: "Quick Categories", links: [action("Embedded Systems", "/embedded-firmware-development"), action("Industrial IoT", "/iot"), action("Edge AI", "/ai-enabled-engineering"), action("Control Theory", "/engineering-process"), action("Firmware Security", "/embedded-firmware-development")] },
    ],
  }),
  "resources.custom-brief": entry(adapter, "Resources Block3Section JSX literals", {
    title: "Need a custom technical deep-dive for your team?", body: "Our engineering leads provide bespoke workshops and technical consultancy for Fortune 500 manufacturing partners.",
    media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUiI-cDf4Ppp2gZXHP1RMAhVRmvpWjQlJUyyMNzUUvv913u8c8vZHWjj_zwbpihHxA-Lm0eB5A5AkqLE5bWy4w1NZulcsVHtYod8SIZgC0DGoKWonBhEcQ3WD2O_iH28DC91cmldocxUMKA687x62ySJP6SXtaItV1g2DyCU6PgRetx1Y0n0LXyvaJPqtBA0unIm8mSAa1xgZ5IU2kthvQPrn5pMxwYxeKdEtXNamU8Iju9TPEuFVOQB9KmFvkndCj66poHVR92Zw" },
    actions: [action("Inquire About Workshops", "/industrial-automation"), action("View All Services", "/services")],
  }),
  "knowledge.featured": entry(adapter, "MainFeaturedSection JSX literals", {
    eyebrow: "Deep Dive | Architecture", heading: "Advancing Silicon Efficiency through Sub-Nanosecond Gating", body: "Exploring the frontier of energy-proportional computing. This whitepaper details our recent success in reducing parasitic capacitance at the interconnect level, resulting in a 14% performance boost in neural mesh processing.",
    media: { source: null, status: "not-present-in-source" }, mediaAlt: "", label: "Protocol Stack Optimization v2.0", actions: [action("Read Full Article", "/technical-knowledge-base")], readTime: "18 min read",
    callouts: [{ badge: "NEW RELEASE", title: "SiC Thermal Management", body: "Passive cooling strategies for high-density server environments.", link: action("View Report", "/technical-knowledge-base") }, { badge: "STABLE", title: "Quantum-Resistant PKI", body: "Hardening the root of trust against tomorrow's threats.", link: action("Explore Specs", "/technical-knowledge-base") }],
  }),
  "blog-index.hero": entry(adapter, "Blog HeroSection sidebar content represented explicitly per audit", {
    title: "Technical Index", summary: "Weekly deep-dives into precision engineering and industrial AI.",
    actions: [action("Articles", "/mqtt"), action("Engineering Specs", "/mqtt"), action("Whitepapers", "/engineering-whitepapers"), action("API Reference", "/mqtt"), action("Archives", "/mqtt")],
    topics: [{ title: "Low-Latency Signal Processing", metric: "424 Reads" }, { title: "Next-Gen CMOS Architectures", metric: "311 Reads" }, { title: "Quantum Encryption Firmware", metric: "289 Reads" }],
  }),
  "deterministic-edge.article": entry(adapter, "LeftSidebarAuthorInfoSection article literals", {
    title: "The Future of Deterministic Edge Computing",
    author: { name: "Dr. Elena Voss", role: "Chief Architect, MEC", bio: "Pioneer in ultra-low latency frameworks and deterministic network protocols for industrial automation.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd7xfSEzu5v0N3Fzt88vGBJSgC5OjbRYvO4qta1yTH8FVDa564l18X0v-qZhJMzex1u2SuhHjwbnTTFaZkIPn3HwVdD8fCC__WGVUBwpQGQCiQ3IAAwEgvUnAc62lHFampCv68JH5nqjk4OoVTDP1ygRG_yoTDRR78RBfR75-O7Vt5mYEl2oFV-iGec-YmQeWC2PBqpxOJIpyB0-STdjNHsxT1eDSSyaz1xSaxq02Cds6KqrOKWbwI48pwSeYcLSK96c1pNEcTKxM" },
    sections: [
      { id: "intro", title: "Introduction", body: "The paradigm shift toward Deterministic Edge Computing represents the most significant architectural evolution since the advent of cloud virtualization. As industrial processes move toward 10ms control loops, the traditional non-deterministic nature of best-effort networking is no longer acceptable." },
      { id: "latency", title: "The Latency Bottleneck", body: "In legacy systems, packet jitter and variable queuing delays in the backhaul network introduced unpredictable variances. For a collaborative robotic arm or a high-speed CNC machine, a 50ms spike in latency is the difference between operational precision and mechanical failure." },
      { id: "architectures", title: "Asymmetric Distribution Models", body: "The solution lies in localized compute cells. Instead of centralized data centers, micro-fabrics integrated directly into the factory floor use specialized hardware accelerators—TPUs and FPGAs—to handle inference and control logic locally.", quote: "Reliability at the edge is not an optimization; it is the fundamental requirement for the next industrial revolution.", media: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHnAfRnAA-YKqFn5IEXHitak6K7x79XLNRw3WzCpI8krH8-qjlmwwce4-jIq5faJjmQYXjj2GIBS_VMHNvy117J6jgKiPrBTEvwQOUwusEP2dBCH03gv-fMrmWy5JCsa7omv0UvPCmVf0dMYkPBoTceL-fowhr-cjE14uO7WIPsUK1eLnJDXJKl4AQBhUjeVYMrLwak3I7MbgxayL-lDOCXg7cAXZlbQTByqJy8TRd1GWpJjz0RIUsfJ-TmWUEGK9GZT9WtFyizts" },
      { id: "conclusion", title: "Localized Safety", body: "By offloading the critical decision-making path to deterministic nodes, we reduce the blast radius of network failures and ensure physical safety protocols execute within nanoseconds of anomaly detection." },
    ],
    tags: ["Edge Computing", "Industry 4.0"],
  }),
};
