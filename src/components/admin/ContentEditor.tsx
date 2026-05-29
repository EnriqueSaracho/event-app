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

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin"
          className="text-sm font-medium text-accent hover:underline"
        >
          ← Back to content queue
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h1 className="text-2xl font-semibold text-primary">Edit content</h1>
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
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[44px]"
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
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[44px]"
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
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[44px]"
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
              <Button type="submit">Save</Button>
              {savedMessage ? (
                <p className="text-sm text-accent" role="status">
                  {savedMessage}
                </p>
              ) : null}
            </div>
          </form>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            Preview
          </h2>
          <Card>
            <Badge className="bg-primary/10 text-primary">
              {categoryLabel(category as SessionCategory)}
            </Badge>
            <Badge className="ml-2 bg-surface-muted text-foreground">
              {STATUS_LABELS[status]}
            </Badge>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              {title || "Untitled"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {summary || "No summary provided."}
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
