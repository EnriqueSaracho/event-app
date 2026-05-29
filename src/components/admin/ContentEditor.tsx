"use client";

import { useState } from "react";
import Link from "next/link";
import type { MockContentItem } from "@/lib/admin/mock-content";
import { STATUS_LABELS } from "@/lib/admin/mock-content";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { categoryLabel } from "@/components/ui/CategoryBadge";
import type { SessionCategory } from "@/lib/supabase/types";

type ContentEditorProps = {
  item: MockContentItem;
};

export function ContentEditor({ item }: ContentEditorProps) {
  const [title, setTitle] = useState(item.title);
  const [summary, setSummary] = useState(item.summary);
  const [category, setCategory] = useState(item.category);
  const [status, setStatus] = useState(item.status);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  function handleSave() {
    setSavedMessage("Saved (demo only — no data was written)");
    setTimeout(() => setSavedMessage(null), 4000);
  }

  const categories: SessionCategory[] = [
    "keynote",
    "workshop",
    "panel",
    "networking",
    "social",
  ];

  const inputClass =
    "mt-1 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[44px]";

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to content queue
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h1 className="text-2xl font-semibold text-foreground lg:text-3xl">
            Edit content
          </h1>
          <p className="mt-1 text-sm text-muted">Item #{item.id}</p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-foreground"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="summary"
                className="block text-sm font-medium text-foreground"
              >
                Summary
              </label>
              <textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
                className={`${inputClass} min-h-[100px]`}
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-foreground"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {categoryLabel(cat)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-foreground"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as MockContentItem["status"])
                }
                className={inputClass}
              >
                {(
                  Object.entries(STATUS_LABELS) as [
                    MockContentItem["status"],
                    string,
                  ][]
                ).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" variant="accent">
                Save
              </Button>
              {savedMessage ? (
                <p className="text-sm text-success" role="status">
                  {savedMessage}
                </p>
              ) : null}
            </div>
          </form>
        </section>

        <section className="lg:sticky lg:top-6 lg:self-start">
          <h2 className="section-label mb-4">Live preview</h2>
          <Card variant="elevated" className="border-primary/10">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary/10 text-primary ring-1 ring-primary/10">
                {categoryLabel(category as SessionCategory)}
              </Badge>
              <Badge className="bg-surface-muted text-foreground ring-1 ring-border">
                {STATUS_LABELS[status]}
              </Badge>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {title || "Untitled"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {summary || "No summary provided."}
            </p>
          </Card>
          <p className="mt-3 text-xs text-muted">
            Preview reflects attendee-facing session card styling.
          </p>
        </section>
      </div>
    </div>
  );
}
