"use client";
import Container from "@/components/layout/container";
import TypographyH1 from "@/components/ui/typography-h1";

interface FinanceClientProps {
  carName?: string;
  gostNumber?: string;
  complectation?: string;
  drySalePrice?: string | number;
  actualSoldPrice?: string | number;
  buyoutSalePrice?: string | number;
  initialPayment?: string | number;
  remainingAmount?: string | number;
  monthlyPayment?: string | number;
  buyoutPeriodMonths?: string | number;
  totalPaymentAmount?: string | number;
  handoverToUser?: string;
  status?: string;
  reassignHandoverToUser?: string;
  reassignStatus?: string;
  reassignDescription?: string;
  soldActualSoldPrice?: string | number;
  soldBuyoutSalePrice?: string | number;
  soldHandoverToUser?: string;
  soldIsPaid?: boolean | string;
  soldTotalPaymentAmount?: string | number;
  soldStatus?: string;
}

export default function FinanceClient(props: FinanceClientProps) {
  return (
    <Container>
      <TypographyH1>Финанс</TypographyH1>
      <div className="mt-2 px-4 bg-light-50 space-y-1.5 py-5 rounded-2xl">
        <div className="flex justify-between items-start">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Автомобиль</span>
          <span className="text-sm font-medium flex-1 text-left">
            {props.carName || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Гос. номер</span>
          <span className="text-sm font-medium text-left flex-1">
            {props.gostNumber || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Комплектация
          </span>
          <span className="text-sm font-medium text-left flex-1">
            {props.complectation || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Цена сухой продаже
          </span>
          <span className="text-sm font-medium text-left flex-1">
            {props.drySalePrice || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Фактически продано
          </span>
          <span className="text-sm font-medium text-left flex-1">
            {props.actualSoldPrice || "—"}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Продажа с выкупом
          </span>
          <span className="text-sm font-medium text-left flex-1">
            {props.buyoutSalePrice || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Первоначальный взнос
          </span>
          <span className="text-sm font-medium text-left flex-1">
            {props.initialPayment || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Остаток</span>
          <span className="text-sm font-medium text-left flex-1">
            {props.remainingAmount || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Ежемесячный платеж
          </span>
          <span className="text-sm font-medium text-left flex-1">
            {props.monthlyPayment || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Период выкупа
          </span>
          <span className="text-sm font-medium text-left flex-1">
            {props.buyoutPeriodMonths || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Общая сумма
          </span>
          <span className="text-sm font-medium text-left flex-1">
            {props.totalPaymentAmount || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Кому сдать</span>
          <span className="text-sm font-medium text-left flex-1">
            {props.handoverToUser || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Статус</span>
          <span className="text-sm font-medium text-left flex-1">
            {props.status === "handed_over" ? "Сдан" : props.status || "—"}
          </span>
        </div>
      </div>

      {/* Перезадать */}
      <TypographyH1>Перезадать</TypographyH1>
      <div className="mt-2 px-4 bg-light-50 space-y-1.5 py-5 rounded-2xl">
        <div className="flex justify-between items-start">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Кому сдать</span>
          <span className="text-sm font-medium flex-1 text-left">
            {props.reassignHandoverToUser || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Статус</span>
          <span className="text-sm font-medium text-left flex-1">
            {props.reassignStatus || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Описание передачи
          </span>
          <span className="text-sm font-medium text-left flex-1">
            {props.reassignDescription || "—"}
          </span>
        </div>
      </div>

      {/* Продан */}
      <TypographyH1>Продан</TypographyH1>
      <div className="mt-2 px-4 bg-light-50 space-y-1.5 py-5 rounded-2xl">
        <div className="flex justify-between items-start">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Фактически продано
          </span>
          <span className="text-sm font-medium flex-1 text-left">
            {props.soldActualSoldPrice ?? "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Продажа с выкупом
          </span>
          <span className="text-sm font-medium text-left flex-1">
            {props.soldBuyoutSalePrice ?? "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Кому сдать</span>
          <span className="text-sm font-medium text-left flex-1">
            {props.soldHandoverToUser || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Оплачен</span>
          <span className="text-sm font-medium text-left flex-1">
            {props.soldIsPaid === true
              ? "Да"
              : props.soldIsPaid === false
              ? "Нет"
              : "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Общая сумма
          </span>
          <span className="text-sm font-medium text-left flex-1">
            {props.soldTotalPaymentAmount ?? "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Статус</span>
          <span className="text-sm font-medium text-left flex-1">
          {props.status === "handed_over" ? "Сдан" : props.status || "—"}
          </span>
        </div>
      </div>
    </Container>
  );
}
