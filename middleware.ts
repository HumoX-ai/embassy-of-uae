import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { languages, fallbackLng } from "./i18n/settings";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Agar allaqachon locale bor bo‘lsa — o‘tkazib yuboramiz
  const hasLocale = languages.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  // Root yoki boshqa path — redirect
  const locale = fallbackLng;

  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url),
  );
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
