import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Links antigos com prefixo /n/ redirecionam para a raiz. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/n") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname.startsWith("/n/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(2);
    return NextResponse.redirect(url, 308);
  }
}

export const config = {
  matcher: ["/n", "/n/:path*"],
};
