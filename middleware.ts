import { NextRequest, NextResponse } from "next/server";

// Himoya qilinadigan sahifalar
const protectedRoutes = [
  "/",
  "/admin",
  "/customer",
  "/carreturn",
  // ... boshqa admin/customer sahifalar
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Faqat protected route'lar uchun tekshir
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Tokenni localStorage'dan emas, cookie'dan oling (SSR uchun)
    const accessToken = request.cookies.get("access_token")?.value;

    // Token yo‘q bo‘lsa, login sahifasiga yo‘naltir
    if (!accessToken) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // User ma'lumotini cookie yoki headerdan oling (masalan, user role)
    const userRole = request.cookies.get("user_role")?.value;

    // Rolega qarab yo‘naltirish (masalan, admin sahifasiga user kirmasligi uchun)
    if (
      pathname.startsWith("/admin") &&
      userRole !== "manager" &&
      userRole !== "admin"
    ) {
      return NextResponse.redirect(new URL("/customer", request.url));
    }
    if (pathname.startsWith("/customer") && userRole !== "user") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Login sahifasiga kirgan, lekin allaqachon login bo‘lgan userni role'ga qarab yo‘naltirish
  if (pathname === "/login") {
    const accessToken = request.cookies.get("access_token")?.value;
    const userRole = request.cookies.get("user_role")?.value;
    if (accessToken && userRole) {
      if (userRole === "user") {
        return NextResponse.redirect(new URL("/customer", request.url));
      } else {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
  }

  // Default: hech narsa qilmaydi
  return NextResponse.next();
}

// Qaysi route'larda ishlasin
export const config = {
  matcher: [
    "/:path*",
    "/admin/:path*",
    "/customer/:path*",
    "/carreturn/:path*",
    "/login",
    // ... boshqa kerakli route'lar
  ],
};
