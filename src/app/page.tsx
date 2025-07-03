"use client";

import DashboardPage from "@/components/dashboard/page";
import Container from "@/components/layout/container";
import React, { useEffect } from "react";

interface TelegramWebApp {
  expand: () => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export default function HomePage() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.expand();
  }, []);
  return (
    <>
      <Container>
        <DashboardPage />
      </Container>
    </>
  );
}
