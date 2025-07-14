"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    checkOnlineStatus();
    window.addEventListener("online", checkOnlineStatus);
    window.addEventListener("offline", checkOnlineStatus);

    return () => {
      window.removeEventListener("online", checkOnlineStatus);
      window.removeEventListener("offline", checkOnlineStatus);
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (isOnline) {
    // Agar online bo'lsa, bosh sahifaga yo'naltirish
    window.location.href = "/";
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="mb-6">
          <WifiOff className="mx-auto h-16 w-16 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Internet aloqasi yo'q
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Internet aloqasini tekshiring va qaytadan urinib ko'ring. Ba'zi
          funksiyalar offline rejimda ishlaydi.
        </p>
        <Button onClick={handleRetry} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Qayta urinish
        </Button>
      </div>
    </div>
  );
}
