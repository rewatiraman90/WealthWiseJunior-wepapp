import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const isMarketingSite =
    hostname === "wealthwisejunior.in.net" ||
    hostname === "www.wealthwisejunior.in.net";

  if (isMarketingSite && request.nextUrl.pathname === "/campus") {
    return NextResponse.redirect("https://wwjcampus.in.net", { status: 302 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/campus"],
};
