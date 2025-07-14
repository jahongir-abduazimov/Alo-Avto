"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PaymentMethodCard } from "@/components/payment-method-card";
import Container from "@/components/layout/container";
import { Icon } from "@/components/icon";
import { useRouter } from "next/navigation";
import { useLoanData } from "@/components/payments";
import { useTokenExpiration } from "@/lib/hooks";

export default function PaymentFormPage() {
  // Use token expiration hook
  useTokenExpiration();

  const [paymentId, setPaymentId] = useState("12345678");
  const [amount, setAmount] = useState("0");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("uzcard");
  const [isAmountEditable, setIsAmountEditable] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const route = useRouter();
  const { loanData, monthlyPayments } = useLoanData();

  const commission = 1; // Fixed commission of $1
  const totalAmount = +amount + commission;

  // Generate transaction ID on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTransactionId = localStorage.getItem("transactionId");
      if (storedTransactionId) {
        const nextId = parseInt(storedTransactionId) + 1;
        localStorage.setItem("transactionId", nextId.toString());
        setTransactionId(nextId.toString());
      } else {
        localStorage.setItem("transactionId", "1");
        setTransactionId("1");
      }
    }
  }, []);

  // Set amount based on payment type
  useEffect(() => {
    if (typeof window !== "undefined" && monthlyPayments) {
      const paymentType = localStorage.getItem("paymentType");
      if (paymentType === "schedule") {
        // Next unpaid monthly payment
        const nextUnpaid = monthlyPayments.find(
          (mp) => mp.payment_status !== "confirmed"
        );
        if (nextUnpaid) setAmount(nextUnpaid.amount.toString());
      } else if (paymentType === "full") {
        // Sum of all unconfirmed monthly payments
        const total = monthlyPayments
          .filter((mp) => mp.payment_status !== "confirmed")
          .reduce((sum: number, mp) => sum + Number(mp.amount), 0);
        setAmount(total.toString());
      }
    }
  }, [monthlyPayments]);

  const paymentMethods = [
    {
      id: "humo",
      name: "HUMO",
      logo: "/images/humo.png",
      disabled: true,
      numer: 1321231231231231,
      date: "10/29",
    },
    {
      id: "uzcard",
      name: "UzCard",
      logo: "/images/uzcard.png",
      disabled: false,
      numer: 5614681813270042,
      date: "12/26",
    },
    {
      id: "visa",
      name: "VISA",
      logo: "/images/visa.png",
      disabled: false,
      numer: 4604720007103455,
      date: "10/29",
    },
    {
      id: "mastercard",
      name: "Mastercard",
      logo: "/images/mastercard.png",
      disabled: true,
      numer: 1231231231231231,
      date: "10/29",
    },
  ];

  // Ensure selected payment method is not disabled
  useEffect(() => {
    const currentMethod = paymentMethods.find(
      (method) => method.id === selectedPaymentMethod
    );
    if (currentMethod?.disabled) {
      const firstEnabledMethod = paymentMethods.find(
        (method) => !method.disabled
      );
      if (firstEnabledMethod) {
        setSelectedPaymentMethod(firstEnabledMethod.id);
      }
    }
  }, [selectedPaymentMethod]);

  const handlePayment = () => {
    // Store payment data in localStorage for next steps
    if (typeof window !== "undefined") {
      const selectedCard = paymentMethods.find(
        (method) => method.id === selectedPaymentMethod
      );

      localStorage.setItem("paymentAmount", amount);
      localStorage.setItem(
        "paymentMethod",
        localStorage.getItem("paymentMethod") || "card"
      ); // Use the method from payment-2
      localStorage.setItem("cardType", selectedPaymentMethod); // Store card type separately
      localStorage.setItem("transactionId", transactionId);

      // Store additional card details
      if (selectedCard) {
        localStorage.setItem("cardNumber", String(selectedCard.numer));
        localStorage.setItem("cardName", selectedCard.name);
        localStorage.setItem("cardDate", selectedCard.date);
        localStorage.setItem("cardLogo", selectedCard.logo);
      }
    }

    route.push("/customer/payment-5");
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
                readOnly={
                  typeof window !== "undefined" &&
                  localStorage.getItem("paymentType") === "schedule"
                }
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-gray-900 h-12 indent-4 font-medium border-none outline-none  size-full"
              />
              {typeof window !== "undefined" &&
                localStorage.getItem("paymentType") !== "schedule" && (
                  <button
                    onClick={() => setIsAmountEditable(!isAmountEditable)}
                  >
                    <Icon name="magnit" />
                  </button>
                )}
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
                  disabled={method.disabled}
                  numer={method.numer}
                  date={method.date}
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
