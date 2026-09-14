import { HERO_ASSETS } from "@/config/hero-images";
import { siteContent } from "@/config/site-content";
import { entry, type ExplicitContentMap } from "./types";

const adapter = "src/lib/cms/migration/adapters/explicit-content/ai.ts";
const action = (label: string, href: string) => ({ label, href });

export const aiExplicitContent: ExplicitContentMap = {
  "ai.hero": entry(adapter, "AnimatedShaderBackgroundSection SplitHero properties", {
    eyebrow: "AI-Driven Product Engineering",
    title: "Edge AI and Intelligent\nEngineering Solutions",
    summary: "We combine AI with embedded systems, sensors, IoT, industrial data, and customer knowledge to build practical intelligent products and automation solutions.",
    supportingText: "Artificial Intelligence + Embedded Systems + IoT + Industrial Automation",
    media: { source: HERO_ASSETS.edgeComputing },
    mediaAlt: "Industrial engineering workspace with embedded systems and sensor hardware used for edge AI development.",
    callouts: [{ title: "Edge-to-Cloud Integration", body: "Embedded devices, gateways & cloud platforms", icon: "hub" }],
    actions: [action("Discuss Your Application", "/request-consultation"), action("View Capabilities", "#capabilities")],
  }),
  "ai.solution-domains": entry(adapter, "TinymlCardSection constants and JSX literals", {
    heading: "Artificial Intelligence Solutions",
    introduction: "Building Intelligent Solutions for the Future",
    body: [
      "Mind Matrix Workspace applies Artificial Intelligence to real engineering, product, and industrial problems. Our focus is on Edge AI, intelligent embedded products, engineering automation, technical knowledge systems, and customer-specific AI workflows.",
      "By combining AI with embedded firmware, electronics, sensors, IoT, cloud platforms, and industrial communication, we can develop solutions that interact with real products, machines, documents, and operational data.",
    ],
    cards: [
      { title: "Edge AI & Intelligent Embedded Systems", body: "We combine Artificial Intelligence with embedded hardware, firmware, sensors, and industrial communication to create products that can analyse data and respond close to the source.", icon: "memory", items: ["AI-enabled embedded products and smart sensors", "On-device inference and real-time data analysis", "Sensor anomaly and fault detection", "Equipment condition monitoring"] },
      { title: "Custom AI Applications & Engineering Automation", body: "We develop customer-specific AI applications that solve defined engineering and business problems rather than offering generic chatbot functionality.", icon: "engineering", items: ["Engineering knowledge assistants", "Technical support and troubleshooting applications", "Document intelligence and semantic search", "AI-enabled dashboards and reporting", "Requirement, test, and documentation automation", "Secure private knowledge systems"], media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiBKL0d2qUw55KxQkjYVdip_NPMIXpAG7W5zL4MY-WJqCN3tf6Top_RDOwljnl3pStUihnrvDTtM-RMQk8dHQ6TqPVPFnaX9dAvERlKT_S4ZVNof66r-CoUzNmGhPDQqFTaFB3I6CduqQLcTEjJQb7yV5G7UFoth7ofV7JxvbH-BlkZc9QaLCyrbw5XJYATDvcgesBACST89f3QglE85Wi7WT9NH7jiuBECRdulWm8gkefJB-GV2UaEf3-dAZB748e7GPWodcnvnI" }, mediaAlt: "Engineering team reviewing embedded AI system architecture and sensor data." },
      { title: "Agentic AI & Workflow Integration", body: "We design controlled AI workflows that connect approved models with customer documents, databases, APIs, and software tools. The value lies in the integration, workflow logic, permissions, validation, and deployment — not simply access to ChatGPT.", items: ["Multi-step AI workflows", "Tool and API integration", "Human approval and escalation flows", "Permission control and audit logging", "Monitoring, validation, and guardrails"], link: action("Discuss Workflow Integration", "/request-consultation") },
      { title: "AI Knowledge & Support Systems", body: "We build systems that help engineering, service, and business teams retrieve accurate information from authorised company content and use it within practical workflows.", items: ["Engineering and product knowledge assistants", "Technical support assistants", "Product manual and troubleshooting search", "Firmware, hardware, and test-document retrieval", "Source-linked answers and revision-aware content"] },
    ],
  }),
  "ai.capability-areas": entry(adapter, "AI Section capabilityBlocks constant", {
    heading: "AI Capability Areas",
    introduction: "Our AI solutions go beyond general-purpose chatbots by integrating customer data, engineering knowledge, software tools, embedded products, and controlled workflows.",
    cards: [
      { title: "Industrial AI & Intelligent Automation", body: "We combine operational data, sensor information, and engineering rules to support smarter industrial monitoring, diagnostics, and maintenance.", icon: "factory", items: ["Predictive maintenance support", "Equipment health monitoring", "Fault and anomaly detection", "Remote diagnostics", "Alarm prioritisation and intelligent alerts", "Process and energy optimisation"] },
      { title: "AI + IoT Solutions", body: "We connect AI with IoT devices, gateways, and cloud platforms to convert sensor data into useful insights, alerts, and decisions.", icon: "sensors", items: ["Smart IoT dashboards", "Sensor data analytics", "Predictive alerts and anomaly detection", "Edge-to-cloud AI integration", "Intelligent gateways", "Remote monitoring and diagnostics"] },
      { title: "Generative AI Integration", body: "Where appropriate, we integrate suitable commercial or locally deployed Large Language Models into complete customer-owned applications.", icon: "psychology", items: ["OpenAI, Claude, and Google Gemini integration", "Retrieval-Augmented Generation (RAG)", "Structured output and tool calling", "Local and private LLM deployment", "Prompt and workflow design", "Custom APIs and application integration"] },
      { title: "Practical, Supportable AI", body: "We combine AI with embedded systems, industrial data, customer knowledge, and software integration to build practical solutions that are difficult to achieve with a general-purpose chatbot alone.", icon: "verified", items: ["Customer database and knowledge integration", "Service-log and fault-analysis support", "Secure private knowledge systems", "Controlled deployment and guardrails"] },
    ],
  }),
  "ai.platforms": entry(adapter, "Block2Section technologyRows constant", {
    heading: "Technologies & Platforms",
    introduction: "Our technology selection is guided by the customer use case, data security needs, deployment environment, scalability requirements, and integration constraints.",
    columns: [{ key: "area", label: "Area" }, { key: "capabilities", label: "Capabilities" }],
    rows: [
      { area: "Edge AI", capabilities: "TinyML, on-device inference, signal processing, local analytics, intelligent gateways" },
      { area: "AI Models & Platforms", capabilities: "OpenAI GPT models, Anthropic Claude, Google Gemini, local and private LLMs" },
      { area: "AI Development", capabilities: "Python, AI SDKs, structured prompting, tool calling, controlled agentic workflows" },
      { area: "Knowledge & Search", capabilities: "RAG architecture, vector databases, embeddings, semantic search" },
      { area: "Integration", capabilities: "REST APIs, webhooks, Model Context Protocol (MCP), cloud services" },
      { area: "Product Integration", capabilities: "Embedded devices, IoT gateways, cloud dashboards, desktop applications, industrial systems" },
    ],
  }),
  "ai.solution-categories": entry(adapter, "Block3Section solutionCategories constant", {
    heading: "AI Solutions We Can Develop",
    introduction: "Our AI solutions go beyond general-purpose chatbots by integrating customer data, engineering knowledge, software tools, embedded products, and controlled workflows.",
    actions: [action("Engineering Whitepapers", "/engineering-whitepapers")],
    cards: [
      { title: "Edge AI Products", body: "Intelligent sensor nodes • AI-enabled industrial gateways • On-device anomaly detection • Equipment condition-monitoring devices • Vision-enabled inspection systems", icon: "developer_board" },
      { title: "Engineering & Knowledge Solutions", body: "Engineering knowledge assistants • Technical support applications • Document intelligence and search • Requirement and test-report automation • Diagnostic support tools", icon: "menu_book" },
      { title: "Industrial & IoT Solutions", body: "Predictive maintenance support • Smart alarm and diagnostic platforms • AI-powered IoT dashboards • Sensor analytics • Remote monitoring solutions", icon: "precision_manufacturing" },
      { title: "Controlled Agentic Workflows", body: "Multi-step workflow automation • Tool and API integration • Human approval workflows • Private knowledge access • Audit-ready AI operations", icon: "account_tree" },
    ],
  }),
  "ai.secondary-capability": entry(adapter, "Block4Section JSX plus siteContent", {
    title: "Secondary AI Capability",
    paragraphs: [siteContent.aiSecondaryStatement, "Primary engineering support remains embedded hardware, firmware, industrial communication, monitoring, control, and product debugging."],
    items: siteContent.whyChooseUs,
  }),
  "ai.practical-ai": entry(adapter, "Block5Section JSX literals", {
    title: "Practical AI for Engineering Teams",
    paragraphs: [
      "Our AI solutions go beyond general-purpose chatbots by integrating customer data, engineering knowledge, software tools, embedded products, and controlled workflows.",
      "We combine AI with embedded systems, industrial data, customer knowledge, and software integration to build practical solutions that are difficult to achieve with a general-purpose chatbot alone.",
    ],
  }),
  "ai.consultation": entry(adapter, "Block6Section JSX literals", {
    title: "Let us develop your next intelligent product",
    body: "Let us develop your next intelligent product, Edge AI solution, or customer-specific engineering application.",
    actions: [action("Request Consultation", "/request-consultation"), action("Contact Engineering Team", "/contact-us")],
  }),
};

