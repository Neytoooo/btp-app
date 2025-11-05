export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/plans/:path*",
    "/metres/:path*",
    "/devis/:path*",
  ],
};
