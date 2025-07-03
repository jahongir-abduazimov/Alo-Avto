import Script from 'next/script';

export const metadata = {
  title: 'Telegram Web App',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        {/* Telegram WebApp JS SDK */}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="lazyOnload"
        />
        {children}
      </body>
    </html>
  );
}
