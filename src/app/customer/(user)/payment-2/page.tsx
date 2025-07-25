"use client";
import Container from "@/components/layout/container";
import TypographyH1 from "@/components/ui/typography-h1";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const handleMethodSelect = (method: "card" | "office") => {
    // Store method in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("paymentMethod", method);
    }
    router.push("/customer/payment-3");
  };

  return (
    <Container>
      <TypographyH1>Оплаты</TypographyH1>

      <div className="w-full space-y-3 flex flex-col">
        <button
          onClick={() => handleMethodSelect("card")}
          className="bg-secondary-500 rounded-2xl py-4 text-white cursor-pointer font-bold text-xl "
        >
          Оплата картой
        </button>
        <button
          onClick={() => handleMethodSelect("office")}
          className="bg-secondary-50 rounded-2xl py-4  font-bold text-xl text-secondary-500"
        >
          Оплата в офисе
        </button>
      </div>
    </Container>
  );
}
