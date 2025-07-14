"use client";
import { ProgressIndicator } from "@/components/progress-indicator";
import TypographyH1 from "@/components/ui/typography-h1";
import { useState, useEffect } from "react";
import { getUserProfile } from "@/lib/api";
import { UserProfileResponse, MonthlyPayment } from "@/types/user";
// import { BottomNavigation } from "@/components/bottom-navigation";

interface PaymentsProps {
  showButton?: boolean;
  showProgress?: boolean;
  className?: string;
}

export default function Payments({
  showButton = true,
  showProgress = true,
  className = "", 
}: PaymentsProps) {
  //   const [activeTab, setActiveTab] = useState("payments");
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

  // Calculate loan data from profile or use defaults
  const calculateLoanData = () => {
    if (
      !userProfile ||
      !userProfile.user.rentals ||
      userProfile.user.rentals.length === 0
    ) {
      // Fallback data when no profile or rentals available
      return {
        fio: "Foydalanuvchi ma'lumotlari",
        totalDebt: 0,
        startDate: "DD.MM-FFFF",
        endDate: "DD.MM-FFFF",
        paymentTerm: 0,
        interestRate: 0,
        currentDebt: 0,
        purchasePrice: 0,
        initialPayment: 0,
        completedPercentage: 0,
        monthlyPayment: 0,
        remainingAmount: 0,
      };
    }

    const rental = userProfile.user.rentals[0]; // Get first rental
    const monthlyPayments = rental.monthly_payments || [];
    const paymentSchedule = rental.payment_schedule || [];
    const userPayments = userProfile.user.payments || [];

    // Check if user has a full and confirmed payment for this rental
    const hasFullConfirmedPayment = userPayments.some(
      (payment) =>
        payment.type === "full" &&
        payment.status === "confirmed" &&
        payment.rental_id === rental.id
    );

    // Calculate total debt based on payment status
    let totalDebt = 0;
    if (hasFullConfirmedPayment) {
      // If full payment is confirmed, total debt is 0
      totalDebt = 0;
    } else {
      // Check payment schedule for pending payments
      const pendingPayments = paymentSchedule.filter((payment) => {
        // Find corresponding monthly payment
        const monthlyPayment = monthlyPayments.find(
          (mp) => mp.date === payment.date
        );
        // If monthly payment exists and is not paid, or if no monthly payment exists
        return (
          !monthlyPayment?.is_paid ||
          monthlyPayment?.payment_status === "pending"
        );
      });

      totalDebt = pendingPayments.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );
    }

    // Calculate current debt based on unpaid monthly payments
    const today = new Date();
    const overduePayments = monthlyPayments.filter(
      (payment: MonthlyPayment) => {
        const paymentDate = new Date(payment.date);
        return paymentDate < today && !payment.is_paid;
      }
    );

    const currentDebt = overduePayments.reduce(
      (sum: number, payment: MonthlyPayment) => sum + payment.amount,
      0
    );

    // Calculate completed percentage based on payment status
    let completedPercentage = 0;

    if (hasFullConfirmedPayment) {
      // If full payment is confirmed, progress is 100%
      completedPercentage = 100;
    } else {
      // Calculate progress based on total amount, initial payment, and paid amounts
      const totalAmount = parseFloat(
        String(rental.total_payment_amount) || "0"
      );
      const initialPayment = parseFloat(rental.initial_payment || "0");

      // Calculate total paid amount (initial payment + all paid monthly payments)
      const paidMonthlyPayments = monthlyPayments.filter(
        (payment) => payment.is_paid && payment.payment_status === "confirmed"
      );
      const paidAmount = paidMonthlyPayments.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );

      const totalPaid = initialPayment + paidAmount;

      // Calculate percentage: (total paid / total amount) * 100
      if (totalAmount > 0) {
        completedPercentage = Math.min(
          100,
          Math.round((totalPaid / totalAmount) * 100)
        );
      }
    }

    // Parse dates from rental - start date is rental creation date
    const startDate = rental.created_at
      ? new Date(rental.created_at).toLocaleDateString("ru-RU")
      : "26.04.2025";

    // End date is the last payment schedule date
    const endDate =
      paymentSchedule.length > 0
        ? new Date(
            paymentSchedule[paymentSchedule.length - 1].date
          ).toLocaleDateString("ru-RU")
        : "26.06.2026";

    // Calculate remaining amount based on payment status
    let remainingAmount = 0;
    if (hasFullConfirmedPayment) {
      // If full payment is confirmed, remaining amount is 0
      remainingAmount = 0;
    } else {
      // Calculate from payment statuses - sum unpaid amounts
      const unpaidPayments = monthlyPayments.filter(
        (payment) => !payment.is_paid || payment.payment_status === "pending"
      );
      remainingAmount = unpaidPayments.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );
    }

    return {
      fio:
        `${userProfile.user.first_name || ""} ${
          userProfile.user.last_name || ""
        }`.trim() || "Foydalanuvchi ma'lumotlari",
      totalDebt,
      startDate,
      endDate,
      paymentTerm: rental.buyout_period_months || paymentSchedule.length || 12,
      interestRate: 30, // This might need to come from rental data if available
      currentDebt,
      purchasePrice:
        parseFloat(String(rental.total_payment_amount) || "0") || 17200,
      initialPayment: parseFloat(rental.initial_payment || "0") || 0,
      completedPercentage,
      monthlyPayment: parseFloat(rental.monthly_payment || "0") || 1266,
      remainingAmount,
    };
  };

  const loanData = calculateLoanData();

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <TypographyH1>Оплаты</TypographyH1>
        <div className="bg-gray-100 rounded-2xl p-4 space-y-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Page Title */}
      <TypographyH1>Оплаты</TypographyH1>

      {/* Loan Overview Card */}
      <div className="bg-gray-100 rounded-2xl p-4 space-y-4">
        {/* Header with FIO and amount */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {loanData.fio}
            </h2>
            <p className="text-sm text-gray-600">Общая Задолженность</p>
          </div>
          <span className="text-green-600 font-bold text-xl">
            ${loanData.totalDebt.toLocaleString()}
          </span>
        </div>

        {/* Date range */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>От {loanData.startDate}</span>
          <span>До {loanData.endDate}</span>
        </div>

        {/* Loan details grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="space-y-1">
            <p className="text-gray-500">
              Срок выплаты — {loanData.paymentTerm} месяцев
            </p>
            <p className="text-red-500 font-medium">
              Текущая задолженность: ${loanData.currentDebt.toLocaleString()}
            </p>
            <p className="text-gray-700">
              Цена выкупа{" "}
              <span className="font-medium">
                ${loanData.purchasePrice.toLocaleString()}
              </span>
            </p>
            <p className="text-gray-700">
              Ежемесячный платеж:{" "}
              <span className="font-medium text-blue-600">
                ${loanData.monthlyPayment.toLocaleString()}
              </span>
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Ставка {loanData.interestRate}%</p>
            <p className="text-gray-700">
              Первоначальный взнос:{" "}
              <span className="text-green-600 font-semibold">
                ${loanData.initialPayment.toLocaleString()}
              </span>
            </p>
            <p className="text-gray-700">
              Остаток к оплате:{" "}
              <span className="font-medium text-orange-600">
                ${loanData.remainingAmount.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {showProgress && (
        <div className="flex justify-start mt-2">
          <ProgressIndicator percentage={loanData.completedPercentage} />
        </div>
      )}

      {/* Spacer to push button to bottom */}
      {!showButton && <div className="flex-1 min-h-[200px]"></div>}
    </div>
  );
}

// Export the loan data calculation function for use in other components
export const useLoanData = () => {
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

  const calculateLoanData = () => {
    if (
      !userProfile ||
      !userProfile.user.rentals ||
      userProfile.user.rentals.length === 0
    ) {
      return {
        fio: "Foydalanuvchi ma'lumotlari",
        totalDebt: 0,
        startDate: "26.04.2025",
        endDate: "26.06.2026",
        paymentTerm: 12,
        interestRate: 30,
        currentDebt: 0,
        purchasePrice: 17200,
        initialPayment: 2000,
        completedPercentage: 10,
        monthlyPayment: 1266,
        remainingAmount: 0,
      };
    }

    const rental = userProfile.user.rentals[0];
    const monthlyPayments = rental.monthly_payments || [];
    const paymentSchedule = rental.payment_schedule || [];
    const userPayments = userProfile.user.payments || [];

    // Check if user has a full and confirmed payment for this rental
    const hasFullConfirmedPayment = userPayments.some(
      (payment) =>
        payment.type === "full" &&
        payment.status === "confirmed" &&
        payment.rental_id === rental.id
    );

    // Calculate total debt based on payment status
    let totalDebt = 0;
    if (hasFullConfirmedPayment) {
      // If full payment is confirmed, total debt is 0
      totalDebt = 0;
    } else {
      // Check payment schedule for pending payments
      const pendingPayments = paymentSchedule.filter((payment) => {
        // Find corresponding monthly payment
        const monthlyPayment = monthlyPayments.find(
          (mp) => mp.date === payment.date
        );
        // If monthly payment exists and is not paid, or if no monthly payment exists
        return (
          !monthlyPayment?.is_paid ||
          monthlyPayment?.payment_status === "pending"
        );
      });

      totalDebt = pendingPayments.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );
    }

    const today = new Date();
    const overduePayments = monthlyPayments.filter(
      (payment: MonthlyPayment) => {
        const paymentDate = new Date(payment.date);
        return paymentDate < today && !payment.is_paid;
      }
    );

    const currentDebt = overduePayments.reduce(
      (sum: number, payment: MonthlyPayment) => sum + payment.amount,
      0
    );

    // Calculate completed percentage based on payment status
    let completedPercentage = 0;

    if (hasFullConfirmedPayment) {
      // If full payment is confirmed, progress is 100%
      completedPercentage = 100;
    } else {
      // Calculate progress based on total amount, initial payment, and paid amounts
      const totalAmount = parseFloat(
        String(rental.total_payment_amount) || "0"
      );
      const initialPayment = parseFloat(rental.initial_payment || "0");

      // Calculate total paid amount (initial payment + all paid monthly payments)
      const paidMonthlyPayments = monthlyPayments.filter(
        (payment) => payment.is_paid && payment.payment_status === "confirmed"
      );
      const paidAmount = paidMonthlyPayments.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );

      const totalPaid = initialPayment + paidAmount;

      // Calculate percentage: (total paid / total amount) * 100
      if (totalAmount > 0) {
        completedPercentage = Math.min(
          100,
          Math.round((totalPaid / totalAmount) * 100)
        );
      }
    }

    // Parse dates from rental - start date is rental creation date
    const startDate = rental.created_at
      ? new Date(rental.created_at).toLocaleDateString("ru-RU")
      : "26.04.2025";

    // End date is the last payment schedule date
    const endDate =
      paymentSchedule.length > 0
        ? new Date(
            paymentSchedule[paymentSchedule.length - 1].date
          ).toLocaleDateString("ru-RU")
        : "26.06.2026";

    // Calculate remaining amount based on payment status
    let remainingAmount = 0;
    if (hasFullConfirmedPayment) {
      // If full payment is confirmed, remaining amount is 0
      remainingAmount = 0;
    } else {
      // Calculate from payment statuses - sum unpaid amounts
      const unpaidPayments = monthlyPayments.filter(
        (payment) => !payment.is_paid || payment.payment_status === "pending"
      );
      remainingAmount = unpaidPayments.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );
    }

    return {
      fio:
        `${userProfile.user.first_name || ""} ${
          userProfile.user.last_name || ""
        }`.trim() || "Foydalanuvchi ma'lumotlari",
      totalDebt,
      startDate,
      endDate,
      paymentTerm: rental.buyout_period_months || paymentSchedule.length || 12,
      interestRate: 30,
      currentDebt,
      purchasePrice:
        parseFloat(String(rental.total_payment_amount) || "0") || 17200,
      initialPayment: parseFloat(rental.initial_payment || "0") || 0,
      completedPercentage,
      monthlyPayment: parseFloat(rental.monthly_payment || "0") || 1266,
      remainingAmount,
    };
  };

  return {
    userProfile,
    loanData: calculateLoanData(),
    rental: userProfile?.user.rentals?.[0],
    paymentSchedule: userProfile?.user.rentals?.[0]?.payment_schedule || [],
    monthlyPayments: userProfile?.user.rentals?.[0]?.monthly_payments || [],
    loading,
  };
};
