import Link from "next/link";
import { StitchImage } from "@/components/ui/StitchImage";

const edgeAiItems = [
  "AI-enabled embedded products and smart sensors",
  "On-device inference and real-time data analysis",
  "Sensor anomaly and fault detection",
  "Equipment condition monitoring",
  "Intelligent industrial gateways",
  "TinyML and low-power AI",
  "Vision-based inspection and local event detection",
];

const customAiItems = [
  "Engineering knowledge assistants",
  "Technical support and troubleshooting applications",
  "Document intelligence and semantic search",
  "AI-enabled dashboards and reporting",
  "Requirement, test, and documentation automation",
  "Secure private knowledge systems",
];

export function TinymlCardSection() {
  return (
    <section id="capabilities" className="py-stack-lg px-margin-desktop max-w-container-max mx-auto">
      <div className="mb-16 max-w-3xl">
        <h2 className="font-headline-lg text-headline-lg mb-4">
          Artificial Intelligence Solutions
        </h2>
        <p className="text-on-surface-variant font-body-md mb-4">
          Building Intelligent Solutions for the Future
        </p>
        <p className="text-on-surface-variant font-body-md">
          Mind Matrix Workspace applies Artificial Intelligence to real
          engineering, product, and industrial problems. Our focus is on Edge AI,
          intelligent embedded products, engineering automation, technical
          knowledge systems, and customer-specific AI workflows.
        </p>
        <p className="text-on-surface-variant font-body-md mt-4">
          By combining AI with embedded firmware, electronics, sensors, IoT,
          cloud platforms, and industrial communication, we can develop
          solutions that interact with real products, machines, documents, and
          operational data.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 md:col-span-4 glass-card p-8 border border-outline-variant/20 rounded-xl hover:border-primary transition-all group">
          <span className="material-symbols-outlined text-4xl text-primary mb-6">
            memory
          </span>
          <h3 className="font-headline-md text-headline-md mb-4">
            Edge AI &amp; Intelligent Embedded Systems
          </h3>
          <p className="text-on-surface-variant mb-6">
            We combine Artificial Intelligence with embedded hardware, firmware,
            sensors, and industrial communication to create products that can
            analyse data and respond close to the source.
          </p>
          <ul className="space-y-2 text-label-sm font-label-sm text-on-surface-variant">
            {edgeAiItems.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-8 bg-white border border-outline-variant/20 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center group technical-glow overflow-hidden">
          <div className="flex-1">
            <span className="material-symbols-outlined text-4xl text-primary mb-6">
              engineering
            </span>
            <h3 className="font-headline-md text-headline-md mb-4">
              Custom AI Applications &amp; Engineering Automation
            </h3>
            <p className="text-on-surface-variant mb-6">
              We develop customer-specific AI applications that solve defined
              engineering and business problems rather than offering generic
              chatbot functionality.
            </p>
            <ul className="space-y-2 text-label-sm font-label-sm text-on-surface-variant">
              {customAiItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full h-48 md:h-full bg-surface-container rounded-lg overflow-hidden relative min-h-[12rem]">
            <StitchImage
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiBKL0d2qUw55KxQkjYVdip_NPMIXpAG7W5zL4MY-WJqCN3tf6Top_RDOwljnl3pStUihnrvDTtM-RMQk8dHQ6TqPVPFnaX9dAvERlKT_S4ZVNof66r-CoUzNmGhPDQqFTaFB3I6CduqQLcTEjJQb7yV5G7UFoth7ofV7JxvbH-BlkZc9QaLCyrbw5XJYATDvcgesBACST89f3QglE85Wi7WT9NH7jiuBECRdulWm8gkefJB-GV2UaEf3-dAZB748e7GPWodcnvnI"
              alt="Engineering team reviewing embedded AI system architecture and sensor data."
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 bg-primary-container text-white p-10 rounded-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md mb-4">
              Agentic AI &amp; Workflow Integration
            </h3>
            <p className="text-white/70 mb-6">
              We design controlled AI workflows that connect approved models with
              customer documents, databases, APIs, and software tools. The value
              lies in the integration, workflow logic, permissions, validation,
              and deployment — not simply access to ChatGPT.
            </p>
            <ul className="space-y-2 text-label-sm font-label-sm text-white/80 mb-8">
              {[
                "Multi-step AI workflows",
                "Tool and API integration",
                "Human approval and escalation flows",
                "Permission control and audit logging",
                "Monitoring, validation, and guardrails",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-secondary-fixed mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/request-consultation"
              className="font-label-sm text-label-sm font-bold border-b border-white hover:opacity-70 transition-opacity"
            >
              Discuss Workflow Integration
            </Link>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 bg-surface-container p-10 rounded-xl border border-outline-variant/20">
          <h3 className="font-headline-md text-headline-md mb-4">
            AI Knowledge &amp; Support Systems
          </h3>
          <p className="text-on-surface-variant mb-6">
            We build systems that help engineering, service, and business teams
            retrieve accurate information from authorised company content and use
            it within practical workflows.
          </p>
          <ul className="space-y-2 text-label-sm font-label-sm text-on-surface-variant">
            {[
              "Engineering and product knowledge assistants",
              "Technical support assistants",
              "Product manual and troubleshooting search",
              "Firmware, hardware, and test-document retrieval",
              "Source-linked answers and revision-aware content",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
