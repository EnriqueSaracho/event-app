export async function safeQuery<T>(
  fn: () => Promise<T>,
): Promise<{ ok: true; data: T } | { ok: false }> {
  try {
    const data = await fn();
    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}
