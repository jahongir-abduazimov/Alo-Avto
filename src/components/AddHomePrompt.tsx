"use client";

import { useEffect, useState } from "react";

export default function AddAppModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setIsTelegram(ua.includes("telegram"));
    setIsSafari(/safari/.test(ua) && !/chrome/.test(ua));

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (isTelegram) {
      if (window.Telegram?.WebApp?.openLink) {
        window.Telegram.WebApp.openLink(window.location.href);
      } else {
        window.open(window.location.href, "_blank");
      }
    } else if (isSafari) {
      alert(
        `Safari'da ilovani o‘rnatish uchun:\n\n1. Share tugmasini bosing\n2. 'Add to Home Screen' ni tanlang\n3. 'Add' tugmasini bosing`
      );
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("✅ User accepted");
      } else {
        console.log("❌ User dismissed");
      }
      setDeferredPrompt(null);
    } else {
      alert("Ilovani qo‘shishda xatolik.\n\nSahifani Chrome’da ochib qayta urinib ko'ring.");
    }

    onClose(); // Modalni yopish
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl">
        <h2 className="text-lg font-semibold mb-2">Ilovani qo‘shish</h2>
        <p className="text-sm text-gray-600 mb-4">
          {
            isTelegram
              ? "Brauzerda ochib, ilovani bosh ekranga qo‘shishingiz mumkin."
              : isSafari
              ? "Safari’da 'Share' tugmasini bosib, 'Add to Home Screen' ni tanlang."
              : "Ilovani tezkor kirish uchun bosh ekranga qo‘shing."
          }
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
          >
            {
              isTelegram
                ? "Brauzerda ochish"
                : isSafari
                ? "Qo‘llanma"
                : "Qo‘shish"
            }
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
}
