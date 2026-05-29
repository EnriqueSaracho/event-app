export type TimedSession = {
  id: string;
  starts_at: string;
  ends_at: string;
};

export function findOverlappingSessionPairs(
  sessions: TimedSession[],
): [string, string][] {
  const pairs: [string, string][] = [];

  for (let i = 0; i < sessions.length; i += 1) {
    for (let j = i + 1; j < sessions.length; j += 1) {
      const a = sessions[i];
      const b = sessions[j];

      if (intervalsOverlap(a.starts_at, a.ends_at, b.starts_at, b.ends_at)) {
        pairs.push([a.id, b.id]);
      }
    }
  }

  return pairs;
}

function intervalsOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  return aStart < bEnd && aEnd > bStart;
}
