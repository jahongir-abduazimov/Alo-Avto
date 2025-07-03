import { Home, TrendingUp, CreditCard, CircleX } from "lucide-react";
import Container from "./container";
import Link from "next/link";

export default function AppBar() {
  return (
    <Container
      minHeight={false}
      bg="bg-black"
      className="py-2 sticky bottom-0 w-full"
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Главный (Main) */}
        <Link
          href={"/customer"}
          className="flex flex-col items-center space-y-2"
        >
          <div className=" px-2 py-1 rounded-2xl">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Главный</span>
        </Link>

        {/* Оценка (Rating) */}
        <Link
          href={"/customer/debt"}
          className="flex flex-col items-center space-y-2"
        >
          <div className=" px-2 py-1 rounded-2xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Помощь</span>
        </Link>

        {/* Дата оплаты (Payment Date) */}
        <Link
          href={"/customer/payment"}
          className="flex flex-col items-center space-y-2"
        >
          <div className=" px-2 py-1 rounded-2xl">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Оплаты</span>
        </Link>

        {/* Сдать (Submit) */}
        <Link
          href={"/customer/fine"}
          className="flex flex-col items-center space-y-2"
        >
          <div className=" px-2 py-1 rounded-2xl">
            <CircleX className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Штрафы</span>
        </Link>
      </div>
    </Container>
  );
}
