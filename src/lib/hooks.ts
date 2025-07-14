"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpired, handleTokenExpiration } from "./utils";

/**
 * Custom hook to check token expiration and redirect to login if needed
 */
export function useTokenExpiration() {
  const router = useRouter();

  useEffect(() => {
    // Check token on mount
    const token = localStorage.getItem("access_token");
    if (!token || isTokenExpired(token)) {
      handleTokenExpiration();
      return;
    }

    // Set up interval to check token periodically
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("access_token");
      if (!currentToken || isTokenExpired(currentToken)) {
        handleTokenExpiration();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [router]);
}

/**
 * Custom hook to handle API errors, especially 401 Unauthorized
 */
export function useApiErrorHandler() {
  const router = useRouter();

  const handleApiError = (error: any) => {
    // Check if error is related to authentication
    if (error?.status === 401 || error?.message === "Unauthorized") {
      handleTokenExpiration();
      return true;
    }
    return false;
  };

  return { handleApiError };
}
