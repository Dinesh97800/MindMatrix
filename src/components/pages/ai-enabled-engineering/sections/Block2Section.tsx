const technologyRows = [
  {
    area: "Edge AI",
    capabilities:
      "TinyML, on-device inference, signal processing, local analytics, intelligent gateways",
  },
  {
    area: "AI Models & Platforms",
    capabilities:
      "OpenAI GPT models, Anthropic Claude, Google Gemini, local and private LLMs",
  },
  {
    area: "AI Development",
    capabilities:
      "Python, AI SDKs, structured prompting, tool calling, controlled agentic workflows",
  },
  {
    area: "Knowledge & Search",
    capabilities:
      "RAG architecture, vector databases, embeddings, semantic search",
  },
  {
    area: "Integration",
    capabilities:
      "REST APIs, webhooks, Model Context Protocol (MCP), cloud services",
  },
  {
    area: "Product Integration",
    capabilities:
      "Embedded devices, IoT gateways, cloud dashboards, desktop applications, industrial systems",
  },
];

export function Block2Section() {
  return (
    <section className="py-stack-lg px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-12 gap-gutter items-start">
        <div className="col-span-12 lg:col-span-5">
          <h2 className="font-headline-lg text-headline-lg mb-6">
            Technologies &amp; Platforms
          </h2>
          <p className="text-on-surface-variant font-body-md">
            Our technology selection is guided by the customer use case, data
            security needs, deployment environment, scalability requirements,
            and integration constraints.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="overflow-x-auto rounded-xl border border-outline-variant/20 bg-white">
            <table className="w-full min-w-[32rem] text-left">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container">
                  <th className="px-6 py-4 font-label-sm text-label-sm uppercase tracking-wider text-primary">
                    Area
                  </th>
                  <th className="px-6 py-4 font-label-sm text-label-sm uppercase tracking-wider text-primary">
                    Capabilities
                  </th>
                </tr>
              </thead>
              <tbody>
                {technologyRows.map((row) => (
                  <tr
                    key={row.area}
                    className="border-b border-outline-variant/10 last:border-0"
                  >
                    <td className="px-6 py-4 font-headline-md text-body-md font-semibold text-primary align-top whitespace-nowrap">
                      {row.area}
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant font-body-md text-sm">
                      {row.capabilities}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
