export type ContentStatus = "draft" | "needs_review" | "queued";

export type MockContentItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  status: ContentStatus;
  updatedAt: string;
};

export const MOCK_CONTENT: MockContentItem[] = [
  {
    id: "1",
    title: "Opening Keynote: Building Stronger Communities",
    summary:
      "Welcome address covering ConcreteBC priorities and member impact for 2027.",
    category: "keynote",
    status: "draft",
    updatedAt: "2027-05-28T14:30:00Z",
  },
  {
    id: "2",
    title: "Workshop: Grant Writing Essentials",
    summary:
      "Hands-on session for nonprofit leaders on securing foundation funding.",
    category: "workshop",
    status: "needs_review",
    updatedAt: "2027-05-27T09:15:00Z",
  },
  {
    id: "3",
    title: "Panel: Rural Infrastructure Challenges",
    summary:
      "Regional leaders discuss funding gaps and community-led solutions.",
    category: "panel",
    status: "queued",
    updatedAt: "2027-05-26T16:45:00Z",
  },
  {
    id: "4",
    title: "Networking: Sponsor Meet & Greet",
    summary: "Informal mixer with conference sponsors and exhibitors.",
    category: "networking",
    status: "draft",
    updatedAt: "2027-05-25T11:00:00Z",
  },
  {
    id: "5",
    title: "Social: Evening Reception",
    summary: "End-of-day reception on the main stage concourse.",
    category: "social",
    status: "queued",
    updatedAt: "2027-05-24T18:20:00Z",
  },
];

export const STATUS_LABELS: Record<ContentStatus, string> = {
  draft: "Draft",
  needs_review: "Needs review",
  queued: "Queued",
};

export function getMockContentById(id: string): MockContentItem | undefined {
  return MOCK_CONTENT.find((item) => item.id === id);
}

export function countByStatus(status: ContentStatus): number {
  return MOCK_CONTENT.filter((item) => item.status === status).length;
}
