'use client';

import { useEffect } from 'react';

interface TelegramWebApp {
  expand: () => void;
  // kerak bo‘lsa boshqa metodlar/propertilar ham qo‘shish mumkin
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export default function WebApp() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.expand();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <h1 className="text-2xl font-bold">Telegram ichidagi sayt!</h1>
    </div>
  );
}
