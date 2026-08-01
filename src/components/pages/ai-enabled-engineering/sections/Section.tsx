const capabilityBlocks = [
  {
    icon: "factory",
    title: "Industrial AI & Intelligent Automation",
    intro:
      "We combine operational data, sensor information, and engineering rules to support smarter industrial monitoring, diagnostics, and maintenance.",
    items: [
      "Predictive maintenance support",
      "Equipment health monitoring",
      "Fault and anomaly detection",
      "Remote diagnostics",
      "Alarm prioritisation and intelligent alerts",
      "Process and energy optimisation",
    ],
  },
  {
    icon: "sensors",
    title: "AI + IoT Solutions",
    intro:
      "We connect AI with IoT devices, gateways, and cloud platforms to convert sensor data into useful insights, alerts, and decisions.",
    items: [
      "Smart IoT dashboards",
      "Sensor data analytics",
      "Predictive alerts and anomaly detection",
      "Edge-to-cloud AI integration",
      "Intelligent gateways",
      "Remote monitoring and diagnostics",
    ],
  },
  {
    icon: "psychology",
    title: "Generative AI Integration",
    intro:
      "Where appropriate, we integrate suitable commercial or locally deployed Large Language Models into complete customer-owned applications.",
    items: [
      "OpenAI, Claude, and Google Gemini integration",
      "Retrieval-Augmented Generation (RAG)",
      "Structured output and tool calling",
      "Local and private LLM deployment",
      "Prompt and workflow design",
      "Custom APIs and application integration",
    ],
  },
  {
    icon: "verified",
    title: "Practical, Supportable AI",
    intro:
      "We combine AI with embedded systems, industrial data, customer knowledge, and software integration to build practical solutions that are difficult to achieve with a general-purpose chatbot alone.",
    items: [
      "Customer database and knowledge integration",
      "Service-log and fault-analysis support",
      "Secure private knowledge systems",
      "Controlled deployment and guardrails",
    ],
  },
];

export function Section() {
  return (
    <section className="py-stack-lg bg-surface grid-pattern">
      <div className="px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-headline-lg text-headline-lg mb-4">
            AI Capability Areas
          </h2>
          <p className="text-on-surface-variant font-body-md">
            Our AI solutions go beyond general-purpose chatbots by integrating
            customer data, engineering knowledge, software tools, embedded
            products, and controlled workflows.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {capabilityBlocks.map((block) => (
            <div
              key={block.title}
              className="bg-white p-8 border border-outline-variant/20 rounded-lg technical-glow"
            >
              <span className="material-symbols-outlined text-3xl text-primary mb-4">
                {block.icon}
              </span>
              <h4 className="font-headline-md text-headline-md mb-3">
                {block.title}
              </h4>
              <p className="text-on-surface-variant text-sm mb-4">{block.intro}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
