// Telegram foydalanuvchi ma'lumotlarini olish

declare global {
    interface Window {
      Telegram?: {
        WebApp?: {
          ready: () => void;
          expand: () => void;
          close: () => void;
          BackButton: {
            show: () => void;
            hide: () => void;
            onClick: (callback: () => void) => void;
            offClick: (callback: () => void) => void;
          };
          MainButton: {
            text: string;
            color: string;
            textColor: string;
            isVisible: boolean;
            isProgressVisible: boolean;
            isActive: boolean;
            show: () => void;
            hide: () => void;
            enable: () => void;
            disable: () => void;
            showProgress: (leaveActive?: boolean) => void;
            hideProgress: () => void;
            setText: (text: string) => void;
            onClick: (callback: () => void) => void;
            offClick: (callback: () => void) => void;
          };
          HapticFeedback: {
            impactOccurred: (
              style: "light" | "medium" | "heavy" | "rigid" | "soft"
            ) => void;
            notificationOccurred: (type: "error" | "success" | "warning") => void;
            selectionChanged: () => void;
          };
          setHeaderColor: (color: string) => void;
          setBackgroundColor: (color: string) => void;
          enableClosingConfirmation: () => void;
          disableClosingConfirmation: () => void;
          isExpanded: boolean;
          viewportHeight: number;
          viewportStableHeight: number;
          platform: string;
          version: string;
          initDataUnsafe?: {
            user?: {
              id: number;
              username?: string;
              first_name?: string;
              last_name?: string;
              language_code?: string;
              is_premium?: boolean;
            };
            chat_instance?: string;
            chat_type?: string;
            start_param?: string;
          };
          sendData: (data: string) => void;
          openLink: (url: string) => void;
          openTelegramLink: (url: string) => void;
          showPopup: (
            params: {
              title?: string;
              message: string;
              buttons?: Array<{
                id?: string;
                type?: "default" | "ok" | "close" | "cancel" | "destructive";
                text: string;
              }>;
            },
            callback?: (buttonId: string) => void
          ) => void;
          showAlert: (message: string, callback?: () => void) => void;
          showConfirm: (
            message: string,
            callback?: (confirmed: boolean) => void
          ) => void;
        };
      };
    }
  }
  
  export interface TelegramUser {
    id: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    language_code?: string;
    is_premium?: boolean;
  }
  
  export interface WebAppError {
    code: string;
    message: string;
    details?: any;
  }
  
  // Telegram Web App obyektini olish
  export function getTelegramWebApp() {
    try {
      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      ) {
        return window.Telegram.WebApp;
      }
      return null;
    } catch (error) {
      console.error("Error accessing Telegram WebApp:", error);
      return null;
    }
  }
  
  // Telegram foydalanuvchi ma'lumotlarini olish
  export function getTelegramUser(): TelegramUser | null {
    try {
      const webApp = getTelegramWebApp();
  
      if (webApp && webApp.initDataUnsafe && webApp.initDataUnsafe.user) {
        return {
          id: webApp.initDataUnsafe.user.id,
          username: webApp.initDataUnsafe.user.username,
          first_name: webApp.initDataUnsafe.user.first_name,
          last_name: webApp.initDataUnsafe.user.last_name,
          language_code: webApp.initDataUnsafe.user.language_code,
          is_premium: webApp.initDataUnsafe.user.is_premium,
        };
      }
  
      return null;
    } catch (error) {
      console.error("Error getting Telegram user:", error);
      return null;
    }
  }
  
  // Faqat user ID ni olish
  export function getTelegramUserId(): number | null {
    const user = getTelegramUser();
    return user ? user.id : null;
  }
  
  // Faqat username ni olish
  export function getTelegramUsername(): string | null {
    const user = getTelegramUser();
    return user ? user.username || null : null;
  }
  
  // Telegram WebApp mavjudligini tekshirish
  export function isTelegramWebApp(): boolean {
    try {
      return !!(
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      );
    } catch {
      return false;
    }
  }
  
  // Telegram WebApp versiyasini olish
  export function getTelegramWebAppVersion(): string | null {
    try {
      const webApp = getTelegramWebApp();
      return webApp?.version || null;
    } catch {
      return null;
    }
  }
  
  // Telegram platform ni olish
  export function getTelegramPlatform(): string | null {
    try {
      const webApp = getTelegramWebApp();
      return webApp?.platform || null;
    } catch {
      return null;
    }
  }