// proxy.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isLivePreview = request.nextUrl.searchParams.has("live-preview");
  const response = NextResponse.next();

  if (isLivePreview) {
    response.headers.set("x-live-preview", "1");
  }

  return response;
}
