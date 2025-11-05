import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  // ⚠️ Ne touche pas aux routes d'Auth.js (PKCE)
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isLogin = pathname === "/login";

  // 🔒 non connecté → tout sauf /login redirige vers /login
  if (!isLoggedIn && !isLogin) {
    const url = new URL("/login", nextUrl.origin);
    url.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(url);
  }

  // ✅ connecté → empêcher l'accès à /login
  if (isLoggedIn && isLogin) {
    return NextResponse.redirect(new URL("/", nextUrl.origin));
  }

  return NextResponse.next();
});

// ➜ protège toutes les pages + toutes les API,
//    puis on EXCLUT /api/auth/* dans le code ci-dessus.
export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // toutes les pages (pas les assets)
    "/api/:path*",            // toutes les API
  ],
};
