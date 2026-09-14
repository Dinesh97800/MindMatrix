/**
 * Legacy blog content extracted from public JSX (not wired to CMS on the public site).
 * Source components:
 * - BentoGridOfPostsSection
 * - ResourceCard1BlogSection (blog post card only)
 */
export type LegacyBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  categoryName: string;
  tags: string[];
  author: string;
  authorTitle?: string;
  publishedAt: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  source: string;
  sourceKey: string;
  contentParagraphs: string[];
};

export const LEGACY_BLOG_POSTS: LegacyBlogPost[] = [
  {
    slug: "neural-processing-units-industrial-edge",
    title: "Neural Processing Units: The Future of Industrial Edge Compute",
    excerpt:
      "Analyzing the shift from cloud-dependent automation to local, high-precision inference engines within hardened industrial environments.",
    categorySlug: "ai-hardware",
    categoryName: "AI & Hardware",
    tags: ["AI", "Hardware", "Edge Compute"],
    author: "Dr. Elena Volkov",
    authorTitle: "Chief Hardware Architect",
    publishedAt: "2024-03-14T00:00:00.000Z",
    featuredImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBe39FRYx3py9hfdM7c_dt7USRZ0TtR9xChoHY2t3-aFGcEdaJn-A0gBB5e_ub_mE941i05gtIazyJBjU5fDxJCmaX_zw3mtOc0Q4IFmABudH1MDVkGAENRgXWsSAOrmhKuYmR_WMrIVpU_Z4hDVM0LEj9QcXJ5GxMPhBqbVutwKX83INxAcJEQvmc-YXn_Up3VFAgTptmy4Tx0Pb8n7xmDqILeUr0yX34OM3aIm8S5IvKwdaF024cItDA8amgHnYosxYcFIHCsjV8",
    featuredImageAlt:
      "Macro photograph of a sophisticated silicon microprocessor with neon cyan light trails.",
    source: "BentoGridOfPostsSection.tsx",
    sourceKey: "insights-and-engineering-blog:neural-processing-units",
    contentParagraphs: [
      "Analyzing the shift from cloud-dependent automation to local, high-precision inference engines within hardened industrial environments.",
    ],
  },
  {
    slug: "optimizing-mqtt-high-density-sensor-arrays",
    title: "Optimizing MQTT for High-Density Sensor Arrays",
    excerpt:
      "Strategies for reducing packet overhead in manufacturing plants with 10k+ concurrent nodes.",
    categorySlug: "iot",
    categoryName: "IoT",
    tags: ["MQTT", "IoT", "Industrial"],
    author: "MMIS Engineering",
    publishedAt: "2024-03-12T00:00:00.000Z",
    featuredImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBbijK_JXlJj_waLCopG_xyvWQJAqv2Oj5XaujGiEF9saws58jktNavLGuRqirVB4nQJgJXb63lOaweiDTk0fQ_3hr5sFTQLG9I3afHAIbHOt-I5gnVeKcCIBvLn8MZVGZHYcoBFRLzb-gYK8XgTq39fSLyEB4boeim65HcKEFKWdmlEIdVvUbuLjcIKmtceuwHQY-EIS09elgiii50SmG10xQjfXvqU-ff_J8B9xUxMd0llUx0as59H8Apgf9410rj-vS7YB_HEkI",
    featuredImageAlt: "Interconnected industrial IoT sensors in a factory setting.",
    source: "BentoGridOfPostsSection.tsx",
    sourceKey: "insights-and-engineering-blog:optimizing-mqtt",
    contentParagraphs: [
      "Strategies for reducing packet overhead in manufacturing plants with 10k+ concurrent nodes.",
    ],
  },
  {
    slug: "rust-vs-cpp-safety-critical-systems",
    title: "Rust vs. C++ in Safety-Critical Systems",
    excerpt:
      "A memory safety benchmark within the context of automated assembly line control systems.",
    categorySlug: "firmware",
    categoryName: "Firmware",
    tags: ["Rust", "C++", "Safety"],
    author: "MMIS Engineering",
    publishedAt: "2024-03-08T00:00:00.000Z",
    featuredImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrFsc4FmUD-PvzIvTNNXsj8idhL85pAAu6OiHmw7pMRh352_V7Y2ggLTGXXAGiyDE4HTJWk-2M-zzRMH-BZE8EehQWwWU1SERdPBrIuCC7Kni76mmgzmkqog-4wfKp_I2--Ug56MlBg8EPuhArQbojmbT2eenM3kRuIhAALLyNbT_KrpBByDZxSwz7yefriSEBpzQTID2qTTel-cR1_1yI_3Ww7gHYQtqmlsTrOPkKNJ32_vsRDU2dNz30OZ3XR-kTj0NRzJ7lq90",
    featuredImageAlt: "Abstract visualization of digital firmware architecture.",
    source: "BentoGridOfPostsSection.tsx",
    sourceKey: "insights-and-engineering-blog:rust-vs-cpp",
    contentParagraphs: [
      "A memory safety benchmark within the context of automated assembly line control systems.",
    ],
  },
  {
    slug: "thermal-throttling-microcontrollers",
    title: "The Physics of Thermal Throttling in Micro-Controllers",
    excerpt:
      "Passive cooling innovations for high-performance chips in compact industrial enclosures.",
    categorySlug: "hardware",
    categoryName: "Hardware",
    tags: ["Hardware", "Thermal", "Microcontrollers"],
    author: "MMIS Engineering",
    publishedAt: "2024-03-05T00:00:00.000Z",
    featuredImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD41eta2dmSuFPhTOW0wGa1KZgo69Ivc_3RnQfqlD5940aUXePmCsrY7i_9o8IuH_Iibv2OUz59KlDP2D07M5DGxL9r4LgaUPLtQGL7O_QVX_cuQ_MBkTH_Rkib8o1W_JK4Wo4XDPKpdUIF70UunWaWETGibvKjPrCHB4FbO9hlfmXtxRJtIffEh3yUpbdQjFhihl-7kx73l1VwnukJZKY4pm5_UWbcUSfacKuReRWv00k25qn5OuRXHV7zyt29-cxQabNDMjFrtIQ",
    featuredImageAlt: "Clean-room environment for manufacturing microchips.",
    source: "BentoGridOfPostsSection.tsx",
    sourceKey: "insights-and-engineering-blog:thermal-throttling",
    contentParagraphs: [
      "Passive cooling innovations for high-performance chips in compact industrial enclosures.",
    ],
  },
  {
    slug: "predictive-maintenance-transformer-models",
    title: "Predictive Maintenance via Transformer Models",
    excerpt:
      "Utilizing attention mechanisms to identify acoustic anomalies in rotating machinery.",
    categorySlug: "data-science",
    categoryName: "Data Science",
    tags: ["AI", "Predictive Maintenance", "Data Science"],
    author: "MMIS Engineering",
    publishedAt: "2024-03-01T00:00:00.000Z",
    featuredImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7GmLorECuHg0-78CfSmXYjnfkWBdrmlfbxfDCnRlVvQFpcbXjFsbhqog_xEYVBwGntBVSNnZDASwUct-JGpqw6Ekr_RwlsPmrfC20g2xgrR8Cpe8XHFlj_fTNqEKe3Y5aEMt-zKBUSqjOoiPREbDK7dDHiuzsbcXBchYzyyMRBByEkyVFmvy6U5ihpNFQfSnaRXTstqiQ7j4H0fTVNa0ZTn6YWrIfc2wWQv4xazIerFAj82CGzVx4hKHGvXZ9t5gGFocNKy6vwoY",
    featuredImageAlt: "Technical display showing complex data visualizations.",
    source: "BentoGridOfPostsSection.tsx",
    sourceKey: "insights-and-engineering-blog:predictive-maintenance",
    contentParagraphs: [
      "Utilizing attention mechanisms to identify acoustic anomalies in rotating machinery.",
    ],
  },
  {
    slug: "optimizing-rtos-low-power-microcontrollers",
    title: "Optimizing RTOS Performance for Low-Power Microcontrollers",
    excerpt:
      "A deep dive into kernel scheduling and context switching overhead in ultra-low power industrial environments.",
    categorySlug: "embedded-systems",
    categoryName: "Embedded Systems",
    tags: ["RTOS", "Embedded Systems", "Low Power"],
    author: "MMIS Engineering",
    publishedAt: "2024-03-12T00:00:00.000Z",
    featuredImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuxhEAnnM2pWDka2XTQfWgzI4jA_NZjReWzbCZjhcJY483ZwgM4DIKsAf8jneyrxCg0kqYKj1Jp2OTD27AAiiTCZZ_hL4MXhA6mqsOGpbugULFJsrzkt2ibQSuaJ7viFfAkfZajNT3YaEVevA_86dOCDIZ5ObRKWKoTqz3OgvCwzQ0dSl84VOZFLdBV01OScPK8UdY5W2eg2DtRy_oBaPU9EaWPEJxjw0XuBOWMzoY_hnw8dX0SK7KYK7EtGVtRyDRv3CRITRTHH8",
    featuredImageAlt: "Macro shot of a complex circuit board with glowing light trails.",
    source: "ResourceCard1BlogSection.tsx",
    sourceKey: "resources-and-blog:rtos-low-power",
    contentParagraphs: [
      "A deep dive into kernel scheduling and context switching overhead in ultra-low power industrial environments.",
    ],
  },
];
