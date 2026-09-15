"use client";

import { FormField, textareaClassName, inputClassName } from "@/components/admin/cms/FormField";

type Props = {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  readOnlyKeys?: string[];
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function StructuredContentEditor({ data, onChange, readOnlyKeys = ["componentKey", "sourceFile", "lockedLayout"] }: Props) {
  const update = (key: string, value: unknown) => onChange({ ...data, [key]: value });

  const itemsText = Array.isArray(data.items)
    ? data.items.map((item) => (typeof item === "string" ? item : JSON.stringify(item))).join("\n")
    : "";

  const stringsText = Array.isArray(data.strings) ? data.strings.join("\n") : "";
  const paragraphs = Array.isArray(data.paragraphs)
    ? data.paragraphs.map((item) => String(item ?? ""))
    : [];
  const cards = Array.isArray(data.cards) ? data.cards.map(asRecord) : [];
  const actions = Array.isArray(data.actions) ? data.actions.map(asRecord) : [];
  const itemsAreObjects =
    Array.isArray(data.items) && data.items.some((item) => item && typeof item === "object");
  const objectItems = itemsAreObjects ? data.items.map(asRecord) : [];
  const featured = asRecord(data.featured);
  const showFeatured = data.featured != null && typeof data.featured === "object" && !Array.isArray(data.featured);
  const filters = Array.isArray(data.filters) ? data.filters.map(asRecord) : [];
  const jobs = Array.isArray(data.jobs) ? data.jobs.map(asRecord) : [];
  const showFilters = Array.isArray(data.filters);
  const showJobs = Array.isArray(data.jobs);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField label="Component Key">
        <input
          className={inputClassName}
          value={String(data.componentKey ?? "")}
          readOnly={readOnlyKeys.includes("componentKey")}
          onChange={(e) => update("componentKey", e.target.value)}
        />
      </FormField>
      <FormField label="Source File">
        <input className={inputClassName} value={String(data.sourceFile ?? "")} readOnly />
      </FormField>
      <FormField label="Title">
        <input className={inputClassName} value={String(data.title ?? "")} onChange={(e) => update("title", e.target.value)} />
      </FormField>
      <FormField label="Title accent">
        <input
          className={inputClassName}
          value={String(data.titleAccent ?? "")}
          onChange={(e) => update("titleAccent", e.target.value)}
        />
      </FormField>
      <FormField label="Title accent class">
        <input
          className={inputClassName}
          value={String(data.titleAccentClassName ?? "")}
          onChange={(e) => update("titleAccentClassName", e.target.value)}
        />
      </FormField>
      <FormField label="Eyebrow icon">
        <input
          className={inputClassName}
          value={String(data.eyebrowIcon ?? "")}
          onChange={(e) => update("eyebrowIcon", e.target.value)}
        />
      </FormField>
      <FormField label="Heading">
        <input className={inputClassName} value={String(data.heading ?? "")} onChange={(e) => update("heading", e.target.value)} />
      </FormField>
      <FormField label="Contents heading">
        <input
          className={inputClassName}
          value={String(data.tocHeading ?? "")}
          onChange={(e) => update("tocHeading", e.target.value)}
        />
      </FormField>
      <FormField label="Eyebrow">
        <input className={inputClassName} value={String(data.eyebrow ?? "")} onChange={(e) => update("eyebrow", e.target.value)} />
      </FormField>
      <div className="md:col-span-2">
        <FormField label="Introduction">
          <textarea
            className={textareaClassName}
            value={String(data.introduction ?? "")}
            onChange={(e) => update("introduction", e.target.value)}
          />
        </FormField>
      </div>
      <div className="md:col-span-2">
        <FormField label="Body">
          <textarea
            className={textareaClassName}
            value={Array.isArray(data.body) ? data.body.map(String).join("\n\n") : String(data.body ?? "")}
            onChange={(e) =>
              update(
                "body",
                Array.isArray(data.body)
                  ? e.target.value.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean)
                  : e.target.value
              )
            }
          />
        </FormField>
      </div>
      <div className="md:col-span-2">
        <FormField label="Supporting text">
          <textarea
            className={textareaClassName}
            value={String(data.supportingText ?? "")}
            onChange={(e) => update("supportingText", e.target.value)}
          />
        </FormField>
      </div>
      <div className="md:col-span-2">
        <FormField label="Supporting copy">
          <textarea
            className={textareaClassName}
            value={String(data.supportingCopy ?? "")}
            onChange={(e) => update("supportingCopy", e.target.value)}
          />
        </FormField>
      </div>
      <div className="md:col-span-2">
        <FormField label="Summary">
          <textarea
            className={textareaClassName}
            value={String(data.summary ?? "")}
            onChange={(e) => update("summary", e.target.value)}
          />
        </FormField>
      </div>
      <div className="md:col-span-2">
        <FormField label="Description">
          <textarea
            className={textareaClassName}
            value={String(data.description ?? "")}
            onChange={(e) => update("description", e.target.value)}
          />
        </FormField>
      </div>
      <div className="md:col-span-2 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Paragraphs</p>
          <button
            type="button"
            className="rounded-lg border px-3 py-1 text-xs"
            onClick={() => update("paragraphs", [...paragraphs, ""])}
          >
            Add paragraph
          </button>
        </div>
        {paragraphs.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No paragraphs yet.</p>
        ) : (
          paragraphs.map((paragraph, index) => (
            <FormField key={`paragraph-${index}`} label={`Paragraph ${index + 1}`}>
              <textarea
                className={textareaClassName}
                value={paragraph}
                onChange={(e) => {
                  const next = [...paragraphs];
                  next[index] = e.target.value;
                  update("paragraphs", next);
                }}
              />
              <button
                type="button"
                className="mt-2 text-xs text-error"
                onClick={() => update("paragraphs", paragraphs.filter((_, i) => i !== index))}
              >
                Remove paragraph
              </button>
            </FormField>
          ))
        )}
      </div>
      <div className="md:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Cards</p>
          <button
            type="button"
            className="rounded-lg border px-3 py-1 text-xs"
            onClick={() => update("cards", [...cards, { title: "", icon: "", body: "" }])}
          >
            Add card
          </button>
        </div>
        {cards.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No cards yet.</p>
        ) : (
          cards.map((card, index) => (
            <div key={`card-${index}`} className="space-y-3 rounded-xl border border-outline-variant/30 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Card {index + 1}</p>
                <button
                  type="button"
                  className="text-xs text-error"
                  onClick={() => update("cards", cards.filter((_, i) => i !== index))}
                >
                  Remove card
                </button>
              </div>
              <FormField label="Eyebrow">
                <input
                  className={inputClassName}
                  value={String(card.eyebrow ?? "")}
                  onChange={(e) => {
                    const next = cards.map((item, i) =>
                      i === index ? { ...item, eyebrow: e.target.value } : item
                    );
                    update("cards", next);
                  }}
                />
              </FormField>
              <FormField label="Title">
                <input
                  className={inputClassName}
                  value={String(card.title ?? "")}
                  onChange={(e) => {
                    const next = cards.map((item, i) =>
                      i === index ? { ...item, title: e.target.value } : item
                    );
                    update("cards", next);
                  }}
                />
              </FormField>
              <FormField label="Image URL">
                <input
                  className={inputClassName}
                  value={String(asRecord(card.media).source ?? card.imageUrl ?? "")}
                  onChange={(e) => {
                    const next = cards.map((item, i) =>
                      i === index
                        ? { ...item, media: { ...asRecord(item.media), source: e.target.value } }
                        : item
                    );
                    update("cards", next);
                  }}
                />
              </FormField>
              <FormField label="Icon" helpText="Material Symbols name, for example handyman or verified_user.">
                <input
                  className={inputClassName}
                  value={String(card.icon ?? "")}
                  onChange={(e) => {
                    const next = cards.map((item, i) =>
                      i === index ? { ...item, icon: e.target.value } : item
                    );
                    update("cards", next);
                  }}
                />
              </FormField>
              <FormField label="Body">
                <textarea
                  className={textareaClassName}
                  value={String(card.body ?? "")}
                  onChange={(e) => {
                    const next = cards.map((item, i) =>
                      i === index ? { ...item, body: e.target.value } : item
                    );
                    update("cards", next);
                  }}
                />
              </FormField>
              <FormField label="List items (one per line)">
                <textarea
                  className={textareaClassName}
                  value={Array.isArray(card.items) ? card.items.map(String).join("\n") : ""}
                  onChange={(e) => {
                    const next = cards.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            items: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean),
                          }
                        : item
                    );
                    update("cards", next);
                  }}
                />
              </FormField>
              <FormField label="Label">
                <input
                  className={inputClassName}
                  value={String(card.label ?? "")}
                  onChange={(e) => {
                    const next = cards.map((item, i) =>
                      i === index ? { ...item, label: e.target.value } : item
                    );
                    update("cards", next);
                  }}
                />
              </FormField>
              <FormField label="Badges (one per line)">
                <textarea
                  className={textareaClassName}
                  value={Array.isArray(card.badges) ? card.badges.map(String).join("\n") : ""}
                  onChange={(e) => {
                    const next = cards.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            badges: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean),
                          }
                        : item
                    );
                    update("cards", next);
                  }}
                />
              </FormField>
              <FormField label="Metrics (one per line, value | label)">
                <textarea
                  className={textareaClassName}
                  value={
                    Array.isArray(card.metrics)
                      ? card.metrics
                          .map((entry) => {
                            const metric = asRecord(entry);
                            return [metric.value, metric.label].filter(Boolean).join(" | ");
                          })
                          .join("\n")
                      : ""
                  }
                  onChange={(e) => {
                    const next = cards.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            metrics: e.target.value
                              .split("\n")
                              .map((line) => line.trim())
                              .filter(Boolean)
                              .map((line) => {
                                const [value, ...rest] = line.split("|").map((part) => part.trim());
                                return { value: value ?? "", label: rest.join(" | ") };
                              }),
                          }
                        : item
                    );
                    update("cards", next);
                  }}
                />
              </FormField>
            </div>
          ))
        )}
      </div>
      <div className="md:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Actions</p>
          <button
            type="button"
            className="rounded-lg border px-3 py-1 text-xs"
            onClick={() => update("actions", [...actions, { label: "", href: "" }])}
          >
            Add action
          </button>
        </div>
        {actions.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No actions yet.</p>
        ) : (
          actions.map((action, index) => (
            <div key={`action-${index}`} className="grid grid-cols-1 gap-3 rounded-xl border border-outline-variant/30 p-4 md:grid-cols-2">
              <FormField label={`Action ${index + 1} label`}>
                <input
                  className={inputClassName}
                  value={String(action.label ?? "")}
                  onChange={(e) => {
                    const next = actions.map((item, i) =>
                      i === index ? { ...item, label: e.target.value } : item
                    );
                    update("actions", next);
                  }}
                />
              </FormField>
              <FormField label="URL">
                <input
                  className={inputClassName}
                  value={String(action.href ?? action.url ?? "")}
                  onChange={(e) => {
                    const next = actions.map((item, i) =>
                      i === index ? { ...item, href: e.target.value } : item
                    );
                    update("actions", next);
                  }}
                />
              </FormField>
              <button
                type="button"
                className="text-left text-xs text-error"
                onClick={() => update("actions", actions.filter((_, i) => i !== index))}
              >
                Remove action
              </button>
            </div>
          ))
        )}
      </div>
      {showFeatured ? (
        <div className="md:col-span-2 space-y-3 rounded-xl border border-outline-variant/30 p-4">
          <p className="text-sm font-medium">Featured card</p>
          <FormField label="Title">
            <input
              className={inputClassName}
              value={String(featured.title ?? "")}
              onChange={(e) => update("featured", { ...featured, title: e.target.value })}
            />
          </FormField>
          <FormField label="Icon">
            <input
              className={inputClassName}
              value={String(featured.icon ?? "")}
              onChange={(e) => update("featured", { ...featured, icon: e.target.value })}
            />
          </FormField>
          <FormField label="Body">
            <textarea
              className={textareaClassName}
              value={String(featured.body ?? "")}
              onChange={(e) => update("featured", { ...featured, body: e.target.value })}
            />
          </FormField>
        </div>
      ) : null}
      {showFilters ? (
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Filters</p>
            <button
              type="button"
              className="rounded-lg border px-3 py-1 text-xs"
              onClick={() => update("filters", [...filters, { label: "", value: "" }])}
            >
              Add filter
            </button>
          </div>
          {filters.map((filter, index) => (
            <div key={`filter-${index}`} className="grid grid-cols-1 gap-3 rounded-xl border border-outline-variant/30 p-4 md:grid-cols-2">
              <FormField label="Label">
                <input
                  className={inputClassName}
                  value={String(filter.label ?? "")}
                  onChange={(e) =>
                    update(
                      "filters",
                      filters.map((item, i) => (i === index ? { ...item, label: e.target.value } : item))
                    )
                  }
                />
              </FormField>
              <FormField label="Value">
                <input
                  className={inputClassName}
                  value={String(filter.value ?? "")}
                  onChange={(e) =>
                    update(
                      "filters",
                      filters.map((item, i) => (i === index ? { ...item, value: e.target.value } : item))
                    )
                  }
                />
              </FormField>
              <button
                type="button"
                className="text-left text-xs text-error"
                onClick={() => update("filters", filters.filter((_, i) => i !== index))}
              >
                Remove filter
              </button>
            </div>
          ))}
        </div>
      ) : null}
      {showJobs ? (
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Openings</p>
            <button
              type="button"
              className="rounded-lg border px-3 py-1 text-xs"
              onClick={() =>
                update("jobs", [
                  ...jobs,
                  { title: "", body: "", category: "", categoryLabel: "", type: "", location: "" },
                ])
              }
            >
              Add opening
            </button>
          </div>
          {jobs.length === 0 ? (
            <p className="text-sm text-on-surface-variant">No openings yet.</p>
          ) : (
            jobs.map((job, index) => (
              <div key={`job-${index}`} className="space-y-3 rounded-xl border border-outline-variant/30 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Opening {index + 1}</p>
                  <button
                    type="button"
                    className="text-xs text-error"
                    onClick={() => update("jobs", jobs.filter((_, i) => i !== index))}
                  >
                    Remove opening
                  </button>
                </div>
                <FormField label="Title">
                  <input
                    className={inputClassName}
                    value={String(job.title ?? "")}
                    onChange={(e) =>
                      update(
                        "jobs",
                        jobs.map((item, i) => (i === index ? { ...item, title: e.target.value } : item))
                      )
                    }
                  />
                </FormField>
                <FormField label="Category label">
                  <input
                    className={inputClassName}
                    value={String(job.categoryLabel ?? "")}
                    onChange={(e) =>
                      update(
                        "jobs",
                        jobs.map((item, i) => (i === index ? { ...item, categoryLabel: e.target.value } : item))
                      )
                    }
                  />
                </FormField>
                <FormField label="Category value">
                  <input
                    className={inputClassName}
                    value={String(job.category ?? "")}
                    onChange={(e) =>
                      update(
                        "jobs",
                        jobs.map((item, i) => (i === index ? { ...item, category: e.target.value } : item))
                      )
                    }
                  />
                </FormField>
                <FormField label="Type">
                  <input
                    className={inputClassName}
                    value={String(job.type ?? "")}
                    onChange={(e) =>
                      update(
                        "jobs",
                        jobs.map((item, i) => (i === index ? { ...item, type: e.target.value } : item))
                      )
                    }
                  />
                </FormField>
                <FormField label="Location">
                  <input
                    className={inputClassName}
                    value={String(job.location ?? "")}
                    onChange={(e) =>
                      update(
                        "jobs",
                        jobs.map((item, i) => (i === index ? { ...item, location: e.target.value } : item))
                      )
                    }
                  />
                </FormField>
                <FormField label="Body">
                  <textarea
                    className={textareaClassName}
                    value={String(job.body ?? "")}
                    onChange={(e) =>
                      update(
                        "jobs",
                        jobs.map((item, i) => (i === index ? { ...item, body: e.target.value } : item))
                      )
                    }
                  />
                </FormField>
              </div>
            ))
          )}
        </div>
      ) : null}
      <div className="md:col-span-2">
        {itemsAreObjects ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Items</p>
              <button
                type="button"
                className="rounded-lg border px-3 py-1 text-xs"
                onClick={() => update("items", [...objectItems, { title: "", icon: "", body: "" }])}
              >
                Add item
              </button>
            </div>
            {objectItems.map((item, index) => (
              <div key={`item-${index}`} className="space-y-3 rounded-xl border border-outline-variant/30 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Item {index + 1}</p>
                  <button
                    type="button"
                    className="text-xs text-error"
                    onClick={() => update("items", objectItems.filter((_, i) => i !== index))}
                  >
                    Remove item
                  </button>
                </div>
                <FormField label="Title">
                  <input
                    className={inputClassName}
                    value={String(item.title ?? "")}
                    onChange={(e) =>
                      update(
                        "items",
                        objectItems.map((entry, i) => (i === index ? { ...entry, title: e.target.value } : entry))
                      )
                    }
                  />
                </FormField>
                <FormField label="Icon">
                  <input
                    className={inputClassName}
                    value={String(item.icon ?? "")}
                    onChange={(e) =>
                      update(
                        "items",
                        objectItems.map((entry, i) => (i === index ? { ...entry, icon: e.target.value } : entry))
                      )
                    }
                  />
                </FormField>
                <FormField label="Body">
                  <textarea
                    className={textareaClassName}
                    value={String(item.body ?? item.description ?? "")}
                    onChange={(e) =>
                      update(
                        "items",
                        objectItems.map((entry, i) =>
                          i === index
                            ? { ...entry, body: e.target.value, description: e.target.value }
                            : entry
                        )
                      )
                    }
                  />
                </FormField>
              </div>
            ))}
          </div>
        ) : (
          <FormField label="Items (one per line)">
            <textarea
              className={textareaClassName}
              value={itemsText}
              onChange={(e) =>
                update(
                  "items",
                  e.target.value.split("\n").map((line) => line.trim()).filter(Boolean)
                )
              }
            />
          </FormField>
        )}
      </div>
      {Array.isArray(data.rows) ? (
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Table rows</p>
            <button
              type="button"
              className="rounded-lg border px-3 py-1 text-xs"
              onClick={() =>
                update("rows", [...(Array.isArray(data.rows) ? data.rows.map(asRecord) : []), { area: "", capabilities: "" }])
              }
            >
              Add row
            </button>
          </div>
          {(Array.isArray(data.rows) ? data.rows.map(asRecord) : []).map((row, index) => (
            <div key={`row-${index}`} className="grid grid-cols-1 gap-3 rounded-xl border border-outline-variant/30 p-4 md:grid-cols-2">
              <FormField label="Area">
                <input
                  className={inputClassName}
                  value={String(row.area ?? row.title ?? "")}
                  onChange={(e) => {
                    const rows = (Array.isArray(data.rows) ? data.rows.map(asRecord) : []).map((item, i) =>
                      i === index ? { ...item, area: e.target.value } : item
                    );
                    update("rows", rows);
                  }}
                />
              </FormField>
              <FormField label="Capabilities">
                <textarea
                  className={textareaClassName}
                  value={String(row.capabilities ?? row.body ?? "")}
                  onChange={(e) => {
                    const rows = (Array.isArray(data.rows) ? data.rows.map(asRecord) : []).map((item, i) =>
                      i === index ? { ...item, capabilities: e.target.value } : item
                    );
                    update("rows", rows);
                  }}
                />
              </FormField>
              <button
                type="button"
                className="text-left text-xs text-error"
                onClick={() =>
                  update(
                    "rows",
                    (Array.isArray(data.rows) ? data.rows : []).filter((_, i) => i !== index)
                  )
                }
              >
                Remove row
              </button>
            </div>
          ))}
        </div>
      ) : null}
      {Array.isArray(data.highlights) ? (
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Highlights</p>
            <button
              type="button"
              className="rounded-lg border px-3 py-1 text-xs"
              onClick={() =>
                update("highlights", [
                  ...(Array.isArray(data.highlights) ? data.highlights.map(asRecord) : []),
                  { title: "", body: "", icon: "" },
                ])
              }
            >
              Add highlight
            </button>
          </div>
          {(Array.isArray(data.highlights) ? data.highlights.map(asRecord) : []).map((item, index) => (
            <div key={`highlight-${index}`} className="space-y-3 rounded-xl border border-outline-variant/30 p-4">
              <FormField label="Title">
                <input
                  className={inputClassName}
                  value={String(item.title ?? "")}
                  onChange={(e) =>
                    update(
                      "highlights",
                      (Array.isArray(data.highlights) ? data.highlights.map(asRecord) : []).map((entry, i) =>
                        i === index ? { ...entry, title: e.target.value } : entry
                      )
                    )
                  }
                />
              </FormField>
              <FormField label="Icon">
                <input
                  className={inputClassName}
                  value={String(item.icon ?? "")}
                  onChange={(e) =>
                    update(
                      "highlights",
                      (Array.isArray(data.highlights) ? data.highlights.map(asRecord) : []).map((entry, i) =>
                        i === index ? { ...entry, icon: e.target.value } : entry
                      )
                    )
                  }
                />
              </FormField>
              <FormField label="Body">
                <textarea
                  className={textareaClassName}
                  value={String(item.body ?? "")}
                  onChange={(e) =>
                    update(
                      "highlights",
                      (Array.isArray(data.highlights) ? data.highlights.map(asRecord) : []).map((entry, i) =>
                        i === index ? { ...entry, body: e.target.value } : entry
                      )
                    )
                  }
                />
              </FormField>
              <button
                type="button"
                className="text-left text-xs text-error"
                onClick={() =>
                  update(
                    "highlights",
                    (Array.isArray(data.highlights) ? data.highlights : []).filter((_, i) => i !== index)
                  )
                }
              >
                Remove highlight
              </button>
            </div>
          ))}
        </div>
      ) : null}
      {(["links", "toc", "staticLinks"] as const).map((field) =>
        Array.isArray(data[field]) ? (
          <div key={field} className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {field === "toc" ? "Contents" : field === "staticLinks" ? "Static links" : "Links"}
              </p>
              <button
                type="button"
                className="rounded-lg border px-3 py-1 text-xs"
                onClick={() =>
                  update(field, [
                    ...(Array.isArray(data[field]) ? data[field].map(asRecord) : []),
                    { label: "", href: "" },
                  ])
                }
              >
                Add link
              </button>
            </div>
            {(Array.isArray(data[field]) ? data[field].map(asRecord) : []).map((item, index) => (
              <div key={`${field}-${index}`} className="grid grid-cols-1 gap-3 rounded-xl border border-outline-variant/30 p-4 md:grid-cols-2">
                <FormField label="Label">
                  <input
                    className={inputClassName}
                    value={String(item.label ?? "")}
                    onChange={(e) =>
                      update(
                        field,
                        (Array.isArray(data[field]) ? data[field].map(asRecord) : []).map((entry, i) =>
                          i === index ? { ...entry, label: e.target.value } : entry
                        )
                      )
                    }
                  />
                </FormField>
                <FormField label="URL">
                  <input
                    className={inputClassName}
                    value={String(item.href ?? item.url ?? "")}
                    onChange={(e) =>
                      update(
                        field,
                        (Array.isArray(data[field]) ? data[field].map(asRecord) : []).map((entry, i) =>
                          i === index ? { ...entry, href: e.target.value } : entry
                        )
                      )
                    }
                  />
                </FormField>
                <button
                  type="button"
                  className="text-left text-xs text-error"
                  onClick={() =>
                    update(
                      field,
                      (Array.isArray(data[field]) ? data[field] : []).filter((_, i) => i !== index)
                    )
                  }
                >
                  Remove link
                </button>
              </div>
            ))}
          </div>
        ) : null
      )}
      {Array.isArray(data.bullets) ? (
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Bullets</p>
            <button
              type="button"
              className="rounded-lg border px-3 py-1 text-xs"
              onClick={() =>
                update("bullets", [
                  ...(Array.isArray(data.bullets) ? data.bullets.map(asRecord) : []),
                  { value: "", label: "", title: "", body: "" },
                ])
              }
            >
              Add bullet
            </button>
          </div>
          {(Array.isArray(data.bullets) ? data.bullets.map(asRecord) : []).map((item, index) => (
            <div key={`bullet-${index}`} className="grid grid-cols-1 gap-3 rounded-xl border border-outline-variant/30 p-4 md:grid-cols-2">
              <FormField label="Value">
                <input
                  className={inputClassName}
                  value={String(item.value ?? "")}
                  onChange={(e) =>
                    update(
                      "bullets",
                      (Array.isArray(data.bullets) ? data.bullets.map(asRecord) : []).map((entry, i) =>
                        i === index ? { ...entry, value: e.target.value } : entry
                      )
                    )
                  }
                />
              </FormField>
              <FormField label="Label">
                <input
                  className={inputClassName}
                  value={String(item.label ?? item.title ?? "")}
                  onChange={(e) =>
                    update(
                      "bullets",
                      (Array.isArray(data.bullets) ? data.bullets.map(asRecord) : []).map((entry, i) =>
                        i === index ? { ...entry, label: e.target.value } : entry
                      )
                    )
                  }
                />
              </FormField>
              <FormField label="Title">
                <input
                  className={inputClassName}
                  value={String(item.title ?? "")}
                  onChange={(e) =>
                    update(
                      "bullets",
                      (Array.isArray(data.bullets) ? data.bullets.map(asRecord) : []).map((entry, i) =>
                        i === index ? { ...entry, title: e.target.value } : entry
                      )
                    )
                  }
                />
              </FormField>
              <FormField label="Body">
                <textarea
                  className={textareaClassName}
                  value={String(item.body ?? "")}
                  onChange={(e) =>
                    update(
                      "bullets",
                      (Array.isArray(data.bullets) ? data.bullets.map(asRecord) : []).map((entry, i) =>
                        i === index ? { ...entry, body: e.target.value } : entry
                      )
                    )
                  }
                />
              </FormField>
              <button
                type="button"
                className="text-left text-xs text-error"
                onClick={() =>
                  update(
                    "bullets",
                    (Array.isArray(data.bullets) ? data.bullets : []).filter((_, i) => i !== index)
                  )
                }
              >
                Remove bullet
              </button>
            </div>
          ))}
        </div>
      ) : null}
      {Array.isArray(data.callouts) ? (
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Callouts</p>
            <button
              type="button"
              className="rounded-lg border px-3 py-1 text-xs"
              onClick={() =>
                update("callouts", [
                  ...(Array.isArray(data.callouts) ? data.callouts.map(asRecord) : []),
                  { value: "", label: "", quote: "", author: "" },
                ])
              }
            >
              Add callout
            </button>
          </div>
          {(Array.isArray(data.callouts) ? data.callouts.map(asRecord) : []).map((item, index) => (
            <div key={`callout-${index}`} className="grid grid-cols-1 gap-3 rounded-xl border border-outline-variant/30 p-4 md:grid-cols-2">
              <FormField label="Value">
                <input
                  className={inputClassName}
                  value={String(item.value ?? "")}
                  onChange={(e) =>
                    update(
                      "callouts",
                      (Array.isArray(data.callouts) ? data.callouts.map(asRecord) : []).map((entry, i) =>
                        i === index ? { ...entry, value: e.target.value } : entry
                      )
                    )
                  }
                />
              </FormField>
              <FormField label="Label">
                <input
                  className={inputClassName}
                  value={String(item.label ?? "")}
                  onChange={(e) =>
                    update(
                      "callouts",
                      (Array.isArray(data.callouts) ? data.callouts.map(asRecord) : []).map((entry, i) =>
                        i === index ? { ...entry, label: e.target.value } : entry
                      )
                    )
                  }
                />
              </FormField>
              <FormField label="Quote">
                <textarea
                  className={textareaClassName}
                  value={String(item.quote ?? "")}
                  onChange={(e) =>
                    update(
                      "callouts",
                      (Array.isArray(data.callouts) ? data.callouts.map(asRecord) : []).map((entry, i) =>
                        i === index ? { ...entry, quote: e.target.value } : entry
                      )
                    )
                  }
                />
              </FormField>
              <FormField label="Author">
                <input
                  className={inputClassName}
                  value={String(item.author ?? "")}
                  onChange={(e) =>
                    update(
                      "callouts",
                      (Array.isArray(data.callouts) ? data.callouts.map(asRecord) : []).map((entry, i) =>
                        i === index ? { ...entry, author: e.target.value } : entry
                      )
                    )
                  }
                />
              </FormField>
              <button
                type="button"
                className="text-left text-xs text-error"
                onClick={() =>
                  update(
                    "callouts",
                    (Array.isArray(data.callouts) ? data.callouts : []).filter((_, i) => i !== index)
                  )
                }
              >
                Remove callout
              </button>
            </div>
          ))}
        </div>
      ) : null}
      {Array.isArray(data.addresses) || data.email != null ? (
        <div className="md:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Legal name">
            <input
              className={inputClassName}
              value={String(data.legalName ?? "")}
              onChange={(e) => update("legalName", e.target.value)}
            />
          </FormField>
          <FormField label="Email">
            <input
              className={inputClassName}
              value={String(data.email ?? "")}
              onChange={(e) => update("email", e.target.value)}
            />
          </FormField>
          <FormField label="Registered office label">
            <input
              className={inputClassName}
              value={String(data.registeredOfficeLabel ?? "")}
              onChange={(e) => update("registeredOfficeLabel", e.target.value)}
            />
          </FormField>
          <FormField label="GSTIN label">
            <input
              className={inputClassName}
              value={String(data.gstinLabel ?? "")}
              onChange={(e) => update("gstinLabel", e.target.value)}
            />
          </FormField>
          <FormField label="Contact heading">
            <input
              className={inputClassName}
              value={String(data.contactHeading ?? "")}
              onChange={(e) => update("contactHeading", e.target.value)}
            />
          </FormField>
          <FormField label="Confidentiality heading">
            <input
              className={inputClassName}
              value={String(data.confidentialityHeading ?? "")}
              onChange={(e) => update("confidentialityHeading", e.target.value)}
            />
          </FormField>
          <FormField label="Enquiry title">
            <input
              className={inputClassName}
              value={String(data.enquiryTitle ?? "")}
              onChange={(e) => update("enquiryTitle", e.target.value)}
            />
          </FormField>
          <div className="md:col-span-2">
            <FormField label="Enquiry copy">
              <textarea
                className={textareaClassName}
                value={String(data.enquiryBody ?? "")}
                onChange={(e) => update("enquiryBody", e.target.value)}
              />
            </FormField>
          </div>
        </div>
      ) : null}
      <div className="md:col-span-2">
        <FormField label="Footnote">
          <textarea
            className={textareaClassName}
            value={String(data.footnote ?? "")}
            onChange={(e) => update("footnote", e.target.value)}
          />
        </FormField>
      </div>
      <div className="md:col-span-2">
        <FormField label="Additional Text (one per line)">
          <textarea
            className={textareaClassName}
            value={stringsText}
            onChange={(e) =>
              update(
                "strings",
                e.target.value.split("\n").map((line) => line.trim()).filter(Boolean)
              )
            }
          />
        </FormField>
      </div>
    </div>
  );
}
