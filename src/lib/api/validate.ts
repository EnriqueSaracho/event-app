const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isValidUuid(value: string): boolean {
  return UUID_REGEX.test(value);
}

export function parseUuid(
  value: string | null | undefined,
  fieldName: string,
): string | null {
  if (!value) {
    return null;
  }

  if (!isValidUuid(value)) {
    return null;
  }

  return value;
}

export function requireUuid(
  value: string | null | undefined,
  fieldName: string,
): { ok: true; value: string } | { ok: false; fieldName: string } {
  const parsed = parseUuid(value, fieldName);
  if (!parsed) {
    return { ok: false, fieldName };
  }

  return { ok: true, value: parsed };
}

export async function parseJsonBody<T extends Record<string, unknown>>(
  request: Request,
): Promise<{ ok: true; body: T } | { ok: false; reason: "invalid_json" }> {
  try {
    const body = (await request.json()) as T;
    return { ok: true, body };
  } catch {
    return { ok: false, reason: "invalid_json" };
  }
}

export function escapeIlikePattern(value: string): string {
  return value.replace(/[%_\\]/g, "\\$&");
}
