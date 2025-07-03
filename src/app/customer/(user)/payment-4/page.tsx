"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PaymentMethodCard } from "@/components/payment-method-card";
import Container from "@/components/layout/container";
import { Icon } from "@/components/icon";
import { useRouter } from "next/navigation";

export default function PaymentFormPage() {
  const [paymentId, setPaymentId] = useState("12345678");
  const [amount, setAmount] = useState("100");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("humo");
  const [isAmountEditable, setIsAmountEditable] = useState(false);
  const route = useRouter();

  const commission = 1; // Fixed commission of $1
  const totalAmount = +amount + commission;

  const paymentMethods = [
    { id: "humo", name: "HUMO", logo: "/images/humo.png" },
    { id: "uzcard", name: "UzCard", logo: "/images/uzcard.png" },
    { id: "visa", name: "VISA", logo: "/images/visa.png" },
    { id: "mastercard", name: "Mastercard", logo: "/images/mastercard.png" },
  ];

  const handlePayment = () => {
    // Payment processing logic would go here
    console.log("Processing payment:", {
      paymentId,
      amount,
      paymentMethod: selectedPaymentMethod,
      commission,
      total: totalAmount,
    });
    route.push("/customer/payment-5"); // Redirect to next page after payment
  };

  return (
    <Container>
      <div className="px-4 py-4 space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900">Оплаты</h1>

        {/* Payment Form */}
        <div className="space-y-4">
          {/* Payment ID */}
          <div className="space-y-2">
            <Label
              htmlFor="payment-id"
              className="text-sm font-medium text-gray-700"
            >
              ID оплаты
            </Label>
            <div className="bg-gray-100 rounded-2xl">
              <input
                readOnly
                type="number"
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
                className="text-gray-900 h-8 indent-4 font-medium border-none outline-none  size-full"
              />
            </div>
          </div>

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
                onChange={(e) => setAmount(e.target.value)}
                className="text-gray-900 h-12 indent-4 font-medium border-none outline-none  size-full"
              />
              <button onClick={() => setIsAmountEditable(!isAmountEditable)}>
                <Icon name="magnit" />
              </button>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Выбрать карту
            </Label>
            <div className="grid grid-cols-4 gap-3">
              {paymentMethods.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  id={method.id}
                  name={method.name}
                  logo={method.logo}
                  isSelected={selectedPaymentMethod === method.id}
                  onSelect={setSelectedPaymentMethod}
                />
              ))}
            </div>
          </div>

          {/* Amount Summary */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Сумма</Label>
            <div className="bg-gray-100 rounded-xl p-4">
              <span className="text-gray-900 font-medium">${amount}</span>
            </div>
          </div>

          {/* Commission */}
          <div className="text-sm text-gray-600">Комиссия: ${commission}</div>

          {/* Total Amount */}
          <div className="text-lg font-semibold text-green-600">
            Общая оплата: ${totalAmount}
          </div>
        </div>

        {/* Spacer */}
        {/* <div className="h-20"></div> */}
      </div>

      {/* Fixed Pay Button */}
      <div className="">
        <Button
          onClick={handlePayment}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-14 text-lg font-medium"
        >
          Оплатить
        </Button>
      </div>

      {/* Bottom Navigation */}
    </Container>
  );
}
