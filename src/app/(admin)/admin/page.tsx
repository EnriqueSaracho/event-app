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
  draft: "bg-surface-muted text-foreground",
  needs_review: "bg-amber-100 text-amber-800",
  queued: "bg-teal-100 text-teal-800",
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
          <Card key={status}>
            <p className="text-sm font-medium text-muted">
              {STATUS_LABELS[status]}
            </p>
            <p className="mt-1 text-3xl font-semibold text-primary">
              {countByStatus(status)}
            </p>
          </Card>
        ))}
      </div>

      <ul className="space-y-3">
        {MOCK_CONTENT.map((item) => (
          <li key={item.id}>
            <Link href={`/admin/content/${item.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-medium text-foreground">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted line-clamp-2">
                      {item.summary}
                    </p>
                    <p className="mt-2 text-xs text-muted">
                      Updated{" "}
                      {new Date(item.updatedAt).toLocaleDateString("en-CA", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <Badge className={statusStyles[item.status]}>
                    {STATUS_LABELS[item.status]}
                  </Badge>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
