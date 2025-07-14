"use client";

import { useEffect, useCallback, useState } from "react";
import {
  getTelegramWebApp,
  isTelegramWebApp,
  type WebAppError,
} from "@/lib/telegram";

interface TelegramWebAppState {
  isReady: boolean;
  isExpanded: boolean;
  viewportHeight: number;
  error: WebAppError | null;
}

export function useTelegramWebApp() {
  const [state, setState] = useState<TelegramWebAppState>({
    isReady: false,
    isExpanded: false,
    viewportHeight: typeof window !== "undefined" ? window.innerHeight : 0,
    error: null,
  });

  // WebApp ni sozlash
  const setupWebApp = useCallback(() => {
    try {
      const webApp = getTelegramWebApp();

      if (!webApp) {
        setState((prev) => ({
          ...prev,
          error: {
            code: "NO_WEBAPP",
            message: "Telegram WebApp not available",
          },
        }));
        return;
      }

      // WebApp ni tayyor qilish
      webApp.ready();

      // Full screen mode - hide header completely
      webApp.expand();

      // Hide header for full screen experience
      if (webApp.setHeaderColor) {
        webApp.setHeaderColor("#000000"); // Set to black first
      }

      // Try to hide header completely (if supported)
      try {
        // Some versions support hiding header
        if (webApp.MainButton) {
          webApp.MainButton.hide();
        }

        // Set viewport to full height
        if (webApp.viewportHeight) {
          document.documentElement.style.setProperty(
            "--tg-viewport-height",
            `${webApp.viewportHeight}px`
          );
          document.documentElement.style.setProperty(
            "--tg-viewport-stable-height",
            `${webApp.viewportStableHeight || webApp.viewportHeight}px`
          );
        }

        // Remove any default margins/padding that might be added by Telegram
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.documentElement.style.margin = "0";
        document.documentElement.style.padding = "0";

      } catch (error) {
      }

      // Disable closing confirmation for better UX
      webApp.disableClosingConfirmation();

      // Set background to white
      webApp.setBackgroundColor("#ffffff");

      setState((prev) => ({
        ...prev,
        isReady: true,
        isExpanded: webApp.isExpanded,
        viewportHeight: webApp.viewportHeight,
        error: null,
      }));

    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: {
          code: "SETUP_ERROR",
          message: "Failed to setup Telegram WebApp",
          details: error,
        },
      }));
    }
  }, []);

  // Back button ni ko'rsatish
  const showBackButton = useCallback((onBack?: () => void) => {
    try {
      const webApp = getTelegramWebApp();
      if (webApp?.BackButton) {
        webApp.BackButton.show();
        if (onBack) {
          webApp.BackButton.onClick(onBack);
        }
      }
    } catch (error) {
      console.error("❌ Error showing back button:", error);
    }
  }, []);

  // Back button ni yashirish
  const hideBackButton = useCallback(() => {
    try {
      const webApp = getTelegramWebApp();
      if (webApp?.BackButton) {
        webApp.BackButton.hide();
      }
    } catch (error) {
      console.error("❌ Error hiding back button:", error);
    }
  }, []);

  // Main button ni boshqarish
  const showMainButton = useCallback((text: string, onClick?: () => void) => {
    try {
      const webApp = getTelegramWebApp();
      if (webApp?.MainButton) {
        webApp.MainButton.setText(text);
        webApp.MainButton.show();
        webApp.MainButton.enable();
        if (onClick) {
          webApp.MainButton.onClick(onClick);
        }
      }
    } catch (error) {
      console.error("❌ Error showing main button:", error);
    }
  }, []);

  const hideMainButton = useCallback(() => {
    try {
      const webApp = getTelegramWebApp();
      if (webApp?.MainButton) {
        webApp.MainButton.hide();
      }
    } catch (error) {
    }
  }, []);

  // Haptic feedback
  const hapticFeedback = useCallback(
    (
      type: "impact" | "notification" | "selection",
      style?: "light" | "medium" | "heavy" | "error" | "success" | "warning"
    ) => {
      try {
        const webApp = getTelegramWebApp();
        if (webApp?.HapticFeedback) {
          if (
            type === "impact" &&
            style &&
            ["light", "medium", "heavy"].includes(style)
          ) {
            webApp.HapticFeedback.impactOccurred(
              style as "light" | "medium" | "heavy"
            );
          } else if (
            type === "notification" &&
            style &&
            ["error", "success", "warning"].includes(style)
          ) {
            webApp.HapticFeedback.notificationOccurred(
              style as "error" | "success" | "warning"
            );
          } else if (type === "selection") {
            webApp.HapticFeedback.selectionChanged();
          }
        }
      } catch (error) {
        console.error("❌ Error with haptic feedback:", error);
      }
    },
    []
  );

  // Alert ko'rsatish
  const showAlert = useCallback((message: string, callback?: () => void) => {
    try {
      const webApp = getTelegramWebApp();
      if (webApp?.showAlert) {
        webApp.showAlert(message, callback);
      } else {
        // Fallback
        alert(message);
        callback?.();
      }
    } catch (error) {
      console.error("❌ Error showing alert:", error);
      alert(message);
      callback?.();
    }
  }, []);

  // Confirm ko'rsatish
  const showConfirm = useCallback(
    (message: string, callback?: (confirmed: boolean) => void) => {
      try {
        const webApp = getTelegramWebApp();
        if (webApp?.showConfirm) {
          webApp.showConfirm(message, callback);
        } else {
          // Fallback
          const result = confirm(message);
          callback?.(result);
        }
      } catch (error) {
        console.error("❌ Error showing confirm:", error);
        const result = confirm(message);
        callback?.(result);
      }
    },
    []
  );

  // App ni yopish
  const closeApp = useCallback(() => {
    try {
      const webApp = getTelegramWebApp();
      if (webApp) {
        webApp.close();
      } else {
        // Fallback
        window.history.back();
      }
    } catch (error) {
      console.error("❌ Error closing app:", error);
      window.history.back();
    }
  }, []);

  // Link ochish
  const openLink = useCallback((url: string, internal = false) => {
    try {
      const webApp = getTelegramWebApp();
      if (webApp) {
        if (internal) {
          webApp.openTelegramLink(url);
        } else {
          webApp.openLink(url);
        }
      } else {
        // Fallback
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("❌ Error opening link:", error);
      window.open(url, "_blank");
    }
  }, []);

  // Initial setup
  useEffect(() => {
    if (isTelegramWebApp()) {
      setupWebApp();
    }
  }, [setupWebApp]);

  // Viewport o'zgarishlarini kuzatish
  useEffect(() => {
    const handleResize = () => {
      const webApp = getTelegramWebApp();
      if (webApp) {
        setState((prev) => ({
          ...prev,
          viewportHeight: webApp.viewportHeight,
          isExpanded: webApp.isExpanded,
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    ...state,
    showBackButton,
    hideBackButton,
    showMainButton,
    hideMainButton,
    hapticFeedback,
    showAlert,
    showConfirm,
    closeApp,
    openLink,
    setupWebApp,
  };
}