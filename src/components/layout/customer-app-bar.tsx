"use client";

import Link from "next/link";
import { Icon } from "../icon";
import { usePathname } from "next/navigation";

export default function CustomerAppBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800">
      <div className="max-w-md mx-auto">
        <div className="flex items-start justify-between px-0 py-3">
          {[
            {
              href: "/customer",
              icon: "home-2",
              label: "Главный",
            },  
            {
              href: "/customer/payment",
              icon: "money-send",
              label: "Оплата",
            },
            {
              href: "/customer/transaction",
              icon: "money-time",
              label: "Транзакции",
            },
            {
              href: "/customer/",
              icon: "file",
              label: "Штрафы",
            },
          ].map((item) => {
            let isActive = false;
            if (item.href === "/customer") {
              isActive = pathname === "/customer";
            } else {
              isActive = pathname.startsWith(item.href);
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 flex flex-col items-center justify-center min-w-0 overflow-hidden"
              >
                <div className="p-2 rounded-2xl flex items-center justify-center">
                  <Icon
                    name={item.icon}
                    color={isActive ? "white" : "#9CA3AF"}
                    className="w-6 h-6"
                  />
                </div>
                <span
                  className={`block text-xs font-medium truncate ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
