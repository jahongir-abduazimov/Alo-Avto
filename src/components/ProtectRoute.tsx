"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { handleTokenExpiration, isTokenExpired } from "@/lib/utils";

interface ProtectRouteProps {
  children: React.ReactNode;
}

export default function ProtectRoute({ children }: ProtectRouteProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if we're on a protected route
    const isProtectedRoute =
      pathname?.startsWith("/admin") ||
      pathname?.startsWith("/customer") ||
      pathname?.startsWith("/carreturn");

    if (isProtectedRoute) {
      // Check if token exists and is not expired
      const token = localStorage.getItem("access_token");
      if (!token || isTokenExpired(token)) {
        // Handle token expiration and redirect to login
        handleTokenExpiration();
      }
    }
  }, [pathname]);

  // Check token expiration periodically
  useEffect(() => {
    const checkTokenInterval = setInterval(() => {
      const token = localStorage.getItem("access_token");
      if (token && isTokenExpired(token)) {
        handleTokenExpiration();
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkTokenInterval);
  }, []);

  return <>{children}</>;
}
