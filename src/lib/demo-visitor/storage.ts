import { DEMO_VISITOR_STORAGE_KEY } from "./constants";

export function getStoredVisitorId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(DEMO_VISITOR_STORAGE_KEY);
}

export function setStoredVisitorId(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(DEMO_VISITOR_STORAGE_KEY, id);
}
