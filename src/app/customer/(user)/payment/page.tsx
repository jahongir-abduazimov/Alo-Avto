"use client";
import Container from "@/components/layout/container";
import Payments from "@/components/payments";
import { ChartColumnBig, CircleAlert, WalletMinimal } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useLoanData } from "@/components/payments";
import { getUserProfile } from "@/lib/api";
import { UserProfileResponse, MonthlyPayment } from "@/types/user";

export default function PaymentPage() {
  const { loanData, monthlyPayments } = useLoanData();
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Get monthly payments from profile
  const getMonthlyPayments = () => {
    if (
      !userProfile ||
      !userProfile.user.rentals ||
      userProfile.user.rentals.length === 0
    ) {
      return [];
    }

    const rental = userProfile.user.rentals[0];
    return rental.monthly_payments || [];
  };

  const monthlyPaymentsList = getMonthlyPayments();

  return (
    <Container className="pb-24">
      <Payments showButton={true} showProgress={false} />
      <div className="grid h-[90px] grid-cols-3 gap-3 mt-2">
        <Link
          href={"/customer/payment-1"}
          className="relative text-white rounded-xl px-2 bg-[radial-gradient(88.46%_78.57%_at_67.53%_72.08%,_#074446_17.49%,_#48CD44_100%)]"
        >
          <span className="text-[9px] font-semibold">Оплатить</span>
          <WalletMinimal className="absolute bottom-4 right-4" />
        </Link>
        <div className="relative text-white rounded-xl px-2 bg-[radial-gradient(63.25%_56.19%_at_69.59%_68.04%,_#224462_17.49%,_#2CB391_100%)]">
          <span className="text-[9px] font-semibold">Инфо</span>
          <CircleAlert className="absolute bottom-4 right-4" />
        </div>
        <div className="w-full relative text-white rounded-xl px-2 bg-[radial-gradient(63.25%_56.19%_at_69.59%_68.04%,_#F4BB34_17.49%,_#EC6B1D_100%)]">
          <span className="text-[9px] font-semibold">График</span>
          <ChartColumnBig className="absolute bottom-4 right-4" />
        </div>
      </div>
      <div className="space-y-3 mt-2">
        {loading ? (
          // Loading state
          Array.from({ length: 5 }, (_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))
        ) : monthlyPaymentsList.length > 0 ? (
          // Display actual monthly payments from profile
          monthlyPaymentsList.map((payment, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="text-sm text-gray-500 mb-2">
                {new Date(payment.date).toLocaleDateString("ru-RU")}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 text-lg">
                  ${payment.amount.toLocaleString()}
                </span>
                <span
                  className={`font-semibold ${
                    payment.is_paid
                      ? "text-green-600"
                      : payment.payment_status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {payment.is_paid
                    ? "Оплачено"
                    : payment.payment_status === "pending"
                    ? "В ожидании"
                    : "Не оплачено"}
                </span>
              </div>
            </div>
          ))
        ) : (
          // Fallback when no payments available
          <div className="text-center py-8 text-gray-500">
            Нет данных о платежах
          </div>
        )}
      </div>
    </Container>
  );
}
