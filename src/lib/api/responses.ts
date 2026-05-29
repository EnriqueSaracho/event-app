import { NextResponse } from "next/server";

export function jsonOk<T>(body: T, status = 200) {
  return NextResponse.json(body, { status });
}

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function jsonInternalError() {
  return jsonError("Internal server error", 500);
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}
