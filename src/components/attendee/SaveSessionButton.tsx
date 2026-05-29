"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useDemoVisitor } from "@/lib/demo-visitor/DemoVisitorProvider";
import {
  isSessionSaved,
  saveSession,
  unsaveSession,
} from "@/lib/demo-visitor/saved-sessions";

type SaveSessionButtonProps = {
  sessionId: string;
};

export function SaveSessionButton({ sessionId }: SaveSessionButtonProps) {
  const { visitorId, isReady } = useDemoVisitor();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!isReady || !visitorId) return;

    let cancelled = false;
    isSessionSaved(visitorId, sessionId)
      .then((isSaved) => {
        if (!cancelled) {
          setSaved(isSaved);
          setInitialized(true);
        }
      })
      .catch(() => {
        if (!cancelled) setInitialized(true);
      });

    return () => {
      cancelled = true;
    };
  }, [isReady, visitorId, sessionId]);

  async function toggleSave() {
    if (!visitorId) return;
    setLoading(true);
    const wasSaved = saved;

    try {
      if (wasSaved) {
        setSaved(false);
        await unsaveSession(visitorId, sessionId);
      } else {
        setSaved(true);
        await saveSession(visitorId, sessionId);
      }
    } catch {
      setSaved(wasSaved);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={saved ? "secondary" : "primary"}
      onClick={toggleSave}
      disabled={!isReady || !visitorId || loading || !initialized}
      aria-pressed={saved}
    >
      {loading ? "Saving…" : saved ? "Saved" : "Save session"}
    </Button>
  );
}
