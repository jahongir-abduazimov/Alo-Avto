import Container from "./container";
import Link from "next/link";
import { Icon } from "../icon";
import { usePathname } from "next/navigation";

export default function AppBar() {
  const pathname = usePathname();
  return (
    <Container
      minHeight={false}
      bg="bg-black"
      className="py-2 sticky bottom-0 w-full"
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {[
          {
            href: "/admin",
            icon: "home-2",
            label: "Главный",
          },
          {
            href: "/admin/evaluation/form",
            icon: "favorite-chartIc",
            label: "Оценка",
          },
          {
            href: "/admin/transaction",
            icon: "money-time",
            label: "Дата оплаты",
          },
          {
            href: "/admin/carreturn",
            icon: "undo",
            label: "Cдать",
          },
        ].map((item) => {
          let isActive = false;
          if (item.href === "/admin") {
            isActive = pathname === "/admin";
          } else {
            isActive = pathname.startsWith(item.href);
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center"
            >
              <div className="px-2 rounded-2xl">
                <Icon
                  name={item.icon}
                  color={isActive ? "white" : "gray"}
                  className="w-6 h-6"
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
