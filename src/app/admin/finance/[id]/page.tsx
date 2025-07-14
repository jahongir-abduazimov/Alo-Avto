"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FinanceClient from "../finance-client";
import {
  getFinanceSummary,
  getReassignSummary,
  getSoldSummary,
} from "@/lib/api";

// Define the props interface for FinanceClient
interface FinanceClientProps {
  carName?: string;
  gostNumber?: string;
  complectation?: string;
  drySalePrice?: number;
  actualSoldPrice?: number;
  buyoutSalePrice?: number;
  initialPayment?: number;
  remainingAmount?: number;
  monthlyPayment?: number;
  buyoutPeriodMonths?: number;
  totalPaymentAmount?: number;
  handoverToUser?: string;
  status?: string;
  reassignHandoverToUser?: string;
  reassignStatus?: string;
  reassignDescription?: string;
  soldActualSoldPrice?: number;
  soldBuyoutSalePrice?: number;
  soldHandoverToUser?: string;
  soldIsPaid?: boolean;
  soldTotalPaymentAmount?: number;
  soldStatus?: string;
}

// User type for getUserName
type User = { first_name?: string; last_name?: string } | undefined;

// Generic getFirst function
const getFirst = <T,>(...args: (T | undefined | null | "")[]): T | undefined =>
  args.find((v): v is T => v !== undefined && v !== null && v !== "");

export default function FinancePage() {
  const params = useParams();
  const rentalId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [props, setProps] = useState<FinanceClientProps>({});

  useEffect(() => {
    if (!rentalId) {
      setError("ID не найден");
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      getFinanceSummary(rentalId),
      getReassignSummary(rentalId),
      getSoldSummary(rentalId),
    ])
      .then(([finance, reassign, sold]) => {
        // Helper to ensure value is a number or undefined
        const getNumber = (
          ...args: (number | string | undefined | null)[]
        ): number | undefined => {
          for (const v of args) {
            if (typeof v === "number") return v;
            if (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v)))
              return Number(v);
          }
          return undefined;
        };
        // Helper to get user full name
        const getUserName = (user: User) =>
          user && (user.first_name || user.last_name)
            ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
            : undefined;
        setProps({
          carName: getFirst(
            finance?.car?.full_name,
            finance?.car?.brand && finance?.car?.model
              ? `${finance.car.brand} ${finance.car.model}`
              : undefined
          ),
          gostNumber: getFirst(finance?.gost_number, finance?.car?.gost_number),
          complectation: getFirst(
            finance?.complectation,
            finance?.car?.complectation
          ),
          drySalePrice: getNumber(
            finance?.dry_sale_price,
            finance?.car?.dry_sale_price
          ),
          actualSoldPrice: getNumber(
            finance?.actual_sold_price,
            sold?.actual_sold_price,
            finance?.car?.actual_sold_price
          ),
          buyoutSalePrice: getFirst(
            finance?.buyout_sale_price,
            sold?.buyout_sale_price
          ),
          initialPayment: getFirst(finance?.initial_payment),
          remainingAmount: getFirst(finance?.remaining_amount),
          monthlyPayment: getFirst(finance?.monthly_payment),
          buyoutPeriodMonths: getFirst(finance?.buyout_period_months),
          totalPaymentAmount: getFirst(
            finance?.total_payment_amount,
            sold?.total_payment_amount
          ),
          handoverToUser: getFirst(
            getUserName(finance?.handover_to_user),
            getUserName(reassign?.handover_to_user),
            getUserName(sold?.handover_to_user)
          ),
          status: getFirst(finance?.status, reassign?.status, sold?.status),
          reassignHandoverToUser: getUserName(reassign?.handover_to_user),
          reassignStatus: reassign?.status,
          reassignDescription: reassign?.handover_description,
          soldActualSoldPrice: sold?.actual_sold_price,
          soldBuyoutSalePrice: sold?.buyout_sale_price,
          soldHandoverToUser: getUserName(sold?.handover_to_user),
          soldIsPaid: sold?.is_paid,
          soldTotalPaymentAmount: sold?.total_payment_amount,
          soldStatus: sold?.status,
        });
      })
      .catch(() => setError("Ошибка загрузки данных"))
      .finally(() => setLoading(false));
  }, [rentalId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Загрузка...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        {error}
      </div>
    );
  }
  return <FinanceClient {...props} />;
}
