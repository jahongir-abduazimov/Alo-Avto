// app/webapp/page.tsx
'use client';

import { useEffect } from 'react';

export default function WebApp() {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    tg?.expand();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <h1 className="text-2xl font-bold">Telegram ichidagi sayt!</h1>
    </div>
  );
}
