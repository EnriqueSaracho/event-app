"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useDemoVisitor } from "@/lib/demo-visitor/DemoVisitorProvider";
import {
  isSessionSaved,
  saveSession,
  unsaveSession,
} from "@/lib/demo-visitor/saved-sessions";

type SaveSessionButtonProps = {
  sessionId: string;
  layout?: "inline" | "rail";
};

export function SaveSessionButton({
  sessionId,
  layout = "inline",
}: SaveSessionButtonProps) {
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

  const button = (
    <Button
      variant={saved ? "secondary" : "accent"}
      onClick={toggleSave}
      disabled={!isReady || !visitorId || loading || !initialized}
      aria-pressed={saved}
      className={layout === "rail" ? "w-full" : undefined}
    >
      {loading ? "Saving…" : saved ? "Saved to schedule" : "Save session"}
    </Button>
  );

  if (layout === "rail") {
    return (
      <Card className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Your schedule</p>
        <p className="text-sm text-muted">
          Add this session to your personal agenda and view it on the Saved page.
        </p>
        {button}
      </Card>
    );
  }

  return button;
}
