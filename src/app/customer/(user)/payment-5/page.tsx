"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CountdownTimer } from "@/components/countdown-timer";
import Container from "@/components/layout/container";
import { Icon } from "@/components/icon";
import { PaymentMethodCard } from "@/components/payment-method-card";
import { useRouter } from "next/navigation";

export default function PaymentConfirmPage() {
  const [cardNumber, setCardNumber] = useState("0000 0000 0000 0000");
  const [amount, setAmount] = useState(100);
  const [fullName, setFullName] = useState("Андрей Петрович");
  const [isAmountEditable, setIsAmountEditable] = useState(false);
  const route = useRouter();

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      // Max length: 16 digits + 3 spaces
      setCardNumber(formatted);
    }
  };

  const handleConfirmPayment = () => {
    route.push("/customer/payment-6"); // Redirect to next page after confirmation
    // Payment confirmation logic would go here
    console.log("Confirming payment:", {
      cardNumber,
      amount,
      fullName,
    });
  };

  const handleTimeUp = () => {
    console.log("Payment session expired");
    // Handle session timeout
  };

  return (
    <Container>
      <div className="px-4 py-4 space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900">Оплаты</h1>

        {/* Payment Form */}
        <div className="space-y-4">
          {/* Card Number */}
          <div className="space-y-2">
            <Label
              htmlFor="card-number"
              className="text-sm font-medium text-gray-700"
            >
              Номер карты
            </Label>
            <Input
              id="card-number"
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              className="bg-gray-100 border-0 rounded-xl h-14 text-base font-medium"
            />
          </div>

          {/* Payment Amount */}
          {/* Payment Amount */}
          <div className="space-y-2">
            <Label
              htmlFor="amount"
              className="text-sm font-medium text-gray-700"
            >
              Сумма оплаты
            </Label>
            <div className="bg-gray-100 flex items-center rounded-2xl">
              <input
                // readOnly
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="text-gray-900 h-12 indent-4 font-medium border-none outline-none  size-full"
              />
              <button onClick={() => setIsAmountEditable(!isAmountEditable)}>
                <Icon name="magnit" />
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label
              htmlFor="full-name"
              className="text-sm font-medium text-gray-700"
            >
              Ф.И.О
            </Label>
            <Input
              id="full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Введите полное имя"
              className="bg-gray-100 border-0 rounded-xl h-14 text-base font-medium"
            />
          </div>

          {/* Payment Method Selection */}
          <div className="grid grid-cols-4 gap-3">
            <PaymentMethodCard
              id={""}
              name={"humo"}
              logo={"humo"}
              isSelected={true}
              onSelect={() => {}}
            />
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="py-8">
          <CountdownTimer initialMinutes={20} onTimeUp={handleTimeUp} />
        </div>

        {/* Spacer */}
        {/* <div className="h-20"></div> */}
      </div>

      {/* Fixed Confirm Button */}
      <div className="">
        <Button
          onClick={handleConfirmPayment}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-14 text-lg font-medium"
        >
          Подтвердите оплату
        </Button>
      </div>
    </Container>
  );
}
