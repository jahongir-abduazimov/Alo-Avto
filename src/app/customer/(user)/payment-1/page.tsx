"use client";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/progress-indicator";
import Container from "@/components/layout/container";
import TypographyH1 from "@/components/ui/typography-h1";
import { useRouter } from "next/navigation";
// import { BottomNavigation } from "@/components/bottom-navigation";

export default function LoanOverviewPage() {
  //   const [activeTab, setActiveTab] = useState("payments");
  const route = useRouter();

  // Loan data
  const loanData = {
    totalDebt: 15200,
    startDate: "26.04.2025",
    endDate: "26.06.2026",
    paymentTerm: 12, // months
    interestRate: 30, // percentage
    currentDebt: 0,
    purchasePrice: 17200,
    initialPayment: 2000,
    completedPercentage: 10, // This would be calculated based on payments made
  };

  return (
    <Container>
      <div className=" space-y-6">
        {/* Page Title */}
        <TypographyH1>Оплаты</TypographyH1>

        {/* Loan Overview Card */}
        <div className="bg-gray-100 rounded-2xl p-4 space-y-4">
          {/* Header with amount */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Общая Задолженность
            </h2>
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
                Текущая задолженность: ${loanData.currentDebt}
              </p>
              <p className="text-gray-700">
                Цена выкупа{" "}
                <span className="font-medium">
                  ${loanData.purchasePrice.toLocaleString()}
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
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-start">
          <ProgressIndicator percentage={loanData.completedPercentage} />
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-1 min-h-[200px]"></div>
      </div>

      {/* Fixed Pay Button */}
      <div className=" bottom-20 left-4 right-4">
        <Button
          onClick={() => route.push("/customer/payment-2")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-14 text-lg font-medium"
        >
          Оплатить
        </Button>
      </div>

      {/* Bottom Navigation */}
      {/* <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} /> */}
    </Container>
  );
}
