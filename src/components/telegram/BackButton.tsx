"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTelegramWebApp } from "@/components/hooks/use-telegram-webapp";

export default function TelegramBackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { showBackButton, hideBackButton } = useTelegramWebApp();

  useEffect(() => {
    // Home page va login page da back button ko'rsatmaslik
    const isHomePage = pathname === "/";
    const isLoginPage = pathname === "/login";

    if (isHomePage || isLoginPage) {
      hideBackButton();
    } else {
      // Admin va customer pagelarda back button ko'rsatish
      showBackButton(() => {
        // Orqaga qaytish logikasi
        if (window.history.length > 1) {
          router.back();
        } else {
          // Agar history bo'sh bo'lsa, tegishli asosiy page ga qaytish
          if (pathname.startsWith("/admin")) {
            router.push("/admin");
          } else if (pathname.startsWith("/customer")) {
            router.push("/customer");
          } else {
            router.push("/");
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (!isHomePage && !isLoginPage) {
        hideBackButton();
      }
    };
  }, [pathname, showBackButton, hideBackButton, router]);

  return null; // Bu component hech narsa render qilmaydi
}
