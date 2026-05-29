import Link from "next/link";
import {
  countByStatus,
  MOCK_CONTENT,
  STATUS_LABELS,
  type ContentStatus,
} from "@/lib/admin/mock-content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const statusStyles: Record<ContentStatus, string> = {
  draft: "bg-surface-muted text-foreground ring-1 ring-border",
  needs_review: "bg-amber-50 text-amber-900 ring-1 ring-amber-200/60",
  queued: "bg-teal-50 text-teal-900 ring-1 ring-teal-200/60",
};

export default function AdminContentPage() {
  const statuses: ContentStatus[] = ["draft", "needs_review", "queued"];

  return (
    <>
      <PageHeader
        title="Content queue"
        description="Review and manage conference content (demo preview only)."
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statuses.map((status) => (
          <Card key={status} variant="muted">
            <p className="text-sm font-medium text-muted">
              {STATUS_LABELS[status]}
            </p>
            <p className="mt-2 text-3xl font-semibold text-primary">
              {countByStatus(status)}
            </p>
          </Card>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="hidden border-b border-border bg-surface-muted/50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted lg:grid lg:grid-cols-[1fr_140px_120px] lg:gap-4">
          <span>Title</span>
          <span>Status</span>
          <span>Updated</span>
        </div>
        <ul className="divide-y divide-border">
          {MOCK_CONTENT.map((item) => (
            <li key={item.id}>
              <Link href={`/admin/content/${item.id}`}>
                <div className="block px-4 py-4 transition-colors hover:bg-surface-muted/40 lg:grid lg:grid-cols-[1fr_140px_120px] lg:items-center lg:gap-4">
                  <div>
                    <h2 className="font-medium text-foreground">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted line-clamp-2 lg:line-clamp-1">
                      {item.summary}
                    </p>
                  </div>
                  <div className="mt-3 lg:mt-0">
                    <Badge className={statusStyles[item.status]}>
                      {STATUS_LABELS[item.status]}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted lg:mt-0">
                    {new Date(item.updatedAt).toLocaleDateString("en-CA", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
