import { NextRequest, NextResponse } from "next/server";

function shouldBypass(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/clone-page") ||
    pathname.startsWith("/glowhaus-images") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap")
  );
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  const destination = new URL("/clone-page", request.url);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-glowhaus-target", `${pathname}${search}`);

  return NextResponse.rewrite(destination, {
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/:path*"]
};
