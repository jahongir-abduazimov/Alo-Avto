"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CountdownTimer } from "@/components/countdown-timer";
import Container from "@/components/layout/container";
import { Icon } from "@/components/icon";
import { PaymentMethodCard } from "@/components/payment-method-card";
import { useRouter } from "next/navigation";
import { fetchSavedCards } from "@/lib/api";
import { SavedCard } from "@/types/payment";
import { AlertCircle, Copy, Check } from "lucide-react";
import { useTokenExpiration } from "@/lib/hooks";

export default function PaymentConfirmPage() {
  // Use token expiration hook
  useTokenExpiration();

  const [cardNumber, setCardNumber] = useState("0000 0000 0000 0000");
  const [amount, setAmount] = useState<number>(0);
  const [fullName, setFullName] = useState("Андрей Петрович");
  const [isAmountEditable, setIsAmountEditable] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCardType, setSelectedCardType] = useState<string>("uzcard");
  const [selectedCardName, setSelectedCardName] = useState<string>("");
  const [selectedCardDate, setSelectedCardDate] = useState<string>("");
  const [selectedCardLogo, setSelectedCardLogo] = useState<string>("");
  const [selectedCardNumber, setSelectedCardNumber] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const route = useRouter();

  // Load amount and card details from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAmount = localStorage.getItem("paymentAmount");
      const savedCardType = localStorage.getItem("cardType");
      const savedCardName = localStorage.getItem("cardName");
      const savedCardDate = localStorage.getItem("cardDate");
      const savedCardLogo = localStorage.getItem("cardLogo");
      const savedCardNumber = localStorage.getItem("cardNumber");

      if (savedAmount) {
        setAmount(Number(savedAmount));
      }

      if (savedCardType) {
        setSelectedCardType(savedCardType);
      }

      if (savedCardName) {
        setSelectedCardName(savedCardName);
      }

      if (savedCardDate) {
        setSelectedCardDate(savedCardDate);
      }

      if (savedCardLogo) {
        setSelectedCardLogo(savedCardLogo);
      }

      if (savedCardNumber) {
        // Format the card number with spaces
        const formattedNumber = savedCardNumber.replace(
          /(\d{4})(?=\d)/g,
          "$1 "
        );
        setSelectedCardNumber(formattedNumber);
        setCardNumber(formattedNumber);
      }
    }
  }, []);

  // Copy card number to clipboard
  const copyCardNumber = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // useEffect(() => {
  //   const loadSavedCards = async () => {
  //     try {
  //       setIsLoading(true);
  //       setError(null);
  //       const data = await fetchSavedCards();
  //       setSavedCards(data.results || []);
  //       if (data.results && data.results.length > 0) {
  //         setSelectedCardId(data.results[0].id);
  //         setCardNumber(data.results[0].card_number_masked);
  //         // If we have card holder name, use it
  //         if (data.results[0].card_holder_full_name) {
  //           setFullName(data.results[0].card_holder_full_name);
  //         }
  //       }
  //     } catch (e) {
  //       console.error("Error fetching saved cards:", e);
  //       setError("Не удалось загрузить сохраненные карты");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   loadSavedCards();
  // }, []);

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
    if (!cardNumber || cardNumber.replace(/\s/g, "").length !== 16) {
      setError("Пожалуйста, введите корректный номер карты");
      return;
    }

    if (!fullName) {
      setError("Пожалуйста, введите имя владельца карты");
      return;
    }

    // Clear any previous errors
    setError(null);

    // Store payment details in localStorage for payment-6 page
    localStorage.setItem("paymentCardNumber", cardNumber);
    localStorage.setItem("paymentCardHolder", fullName);
    localStorage.setItem("paymentAmount", amount.toString());

    route.push("/customer/payment-6"); // Redirect to next page after confirmation

    console.log("Confirming payment:", {
      cardNumber,
      amount,
      fullName,
    });
  };

  const handleTimeUp = () => {
    console.log("Payment session expired");
    setError("Время сессии истекло. Пожалуйста, начните сначала.");
    // Handle session timeout
  };

  const handleSelectCard = (card: SavedCard) => {
    setSelectedCardId(card.id);
    setCardNumber(card.card_number_masked);
    if (card.card_holder_full_name) {
      setFullName(card.card_holder_full_name);
    }
    setError(null); // Clear errors when user selects a card
  };

  // Helper function to determine card logo based on category code
  const getCardLogo = (card: SavedCard) => {
    return card.category.code || "humo"; // Default to humo if no code
  };

  return (
    <Container>
      <div className="px-4 py-4 space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900">Оплаты</h1>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="text-center py-6">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Загрузка карт...</p>
          </div>
        )}

        {/* Selected Card Information */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icon name={selectedCardType} size={32} />
              <h3 className="font-medium text-lg">{selectedCardName}</h3>
            </div>
            <div className="text-gray-500">Срок: {selectedCardDate}</div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="font-mono text-lg tracking-wider">
                {selectedCardNumber}
              </div>
              <button
                onClick={copyCardNumber}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                title="Копировать номер карты"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          {/* Saved Cards */}
          {!isLoading && savedCards.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Сохраненные карты
              </Label>
              <div className="flex gap-2 flex-wrap">
                {savedCards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    className={`px-4 py-2 rounded-xl border text-base font-medium flex items-center gap-2 ${
                      selectedCardId === card.id
                        ? "bg-blue-100 border-blue-500"
                        : "bg-gray-100 border-gray-300"
                    }`}
                    onClick={() => handleSelectCard(card)}
                  >
                    <Icon name={getCardLogo(card)} />
                    <span>{card.display_name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Card Number */}
          <div className="space-y-2">
            <Label
              htmlFor="card-number"
              className="text-sm font-medium text-gray-700"
            >
              Номер карты
            </Label>
            <div className="relative">
              <Input
                id="card-number"
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="0000 0000 0000 0000"
                className="bg-gray-100 border-0 rounded-xl h-14 text-base font-medium pr-12"
              />
              <button
                onClick={copyCardNumber}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 transition-colors"
                title="Копировать номер карты"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-500" />
                )}
              </button>
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
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="text-gray-900 h-12 indent-4 font-medium border-none outline-none size-full"
                min="1"
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

          {/* Selected Card Type Display */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Выбранный тип карты
            </Label>
            <div className="grid grid-cols-4 gap-3">
              <PaymentMethodCard
                id={selectedCardType}
                name={selectedCardType}
                logo={selectedCardLogo || `/images/${selectedCardType}.png`}
                isSelected={true}
                onSelect={() => {}}
                disabled={false}
                numer={
                  parseInt(selectedCardNumber.replace(/\s/g, "")) ||
                  4604720007103455
                }
                date={selectedCardDate || "10/29"}
              />
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="py-8">
          <CountdownTimer initialMinutes={5} onTimeUp={handleTimeUp} />
        </div>
      </div>

      {/* Fixed Pay Button */}
      <div>
        <Button
          onClick={handleConfirmPayment}
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-14 text-lg font-medium disabled:bg-blue-300"
        >
          {isLoading ? "Загрузка..." : "Подтвердите оплату"}
        </Button>
      </div>
    </Container>
  );
}
