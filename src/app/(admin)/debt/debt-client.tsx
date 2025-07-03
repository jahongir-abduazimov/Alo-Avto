"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Container from "@/components/layout/container";
import TypographyH1 from "@/components/ui/typography-h1";

export default function PaymentTracker() {
  const [payments] = useState([
    { amount: 800, missed: 300, status: "не оплачено" },
    { amount: 800, missed: 100, status: "не оплачено" },
    { amount: 800, missed: 100, status: "не оплачено" },
    { amount: 800, missed: 100, status: "не оплачено" },
  ]);

  return (
    <Container className="pb-6">
      <TypographyH1>Зодолжность</TypographyH1>
      <div className="flex flex-col gap-6">
        {[1, 2].map((index) => (
          <div key={index} className="">
            <div className=" rounded-2xl p-4 bg-light-50 mt-5">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Kathryn Murphy"
                  />
                  <AvatarFallback>KM</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-base">Kathryn Murphy</h3>
                  <p className="text-gray-500 text-sm">Задержка: 40 дней</p>
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <p className="text-sm">
                  3200 долларов в рассрочку на 24 месяца
                </p>
                <p className="text-sm">
                  <span className="text-red-500 font-medium">
                    Текущая задолженность: 600$
                  </span>
                </p>
                <div className="flex gap-3 text-xs text-gray-500">
                  <p>Гост номер: 01X254YZ</p>
                  <p>Chevrolet Cobalt</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">График выплат</p>
              <div className="space-y-2">
                {payments.map((payment, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white rounded-lg p-3 border "
                  >
                    <span className="font-medium">{payment.amount}$</span>
                    <span className="text-xs bg-red-100 rounded-2xl text-red-500 px-2 py-1">
                      {payment.missed}$ не {payment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
