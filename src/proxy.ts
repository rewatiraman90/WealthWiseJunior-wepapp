import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// No active redirects needed — wealthwisejunior.in.net is served by
// GitHub Pages directly and no longer routes through this app.
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
