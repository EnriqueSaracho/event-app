"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ensureDemoVisitorId } from "./api";

type DemoVisitorContextValue = {
  visitorId: string | null;
  isReady: boolean;
  error: string | null;
};

const DemoVisitorContext = createContext<DemoVisitorContextValue>({
  visitorId: null,
  isReady: false,
  error: null,
});

export function DemoVisitorProvider({ children }: { children: ReactNode }) {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    ensureDemoVisitorId()
      .then((id) => {
        if (!cancelled) {
          setVisitorId(id);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not initialize your demo profile.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({ visitorId, isReady, error }),
    [visitorId, isReady, error],
  );

  return (
    <DemoVisitorContext.Provider value={value}>
      {children}
    </DemoVisitorContext.Provider>
  );
}

export function useDemoVisitor() {
  return useContext(DemoVisitorContext);
}

export function useDemoVisitorId(): string | null {
  return useContext(DemoVisitorContext).visitorId;
}

export function useEnsureDemoVisitor() {
  const ctx = useContext(DemoVisitorContext);
  const requireVisitorId = useCallback(() => {
    if (!ctx.visitorId) {
      throw new Error("Demo visitor not ready");
    }
    return ctx.visitorId;
  }, [ctx.visitorId]);
  return { ...ctx, requireVisitorId };
}
