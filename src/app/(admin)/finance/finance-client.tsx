import { Button } from "@/components/button";
import Container from "@/components/layout/container";
import TypographyH1 from "@/components/ui/typography-h1";
import React from "react";

export default function FinanceClient() {
  return (
    <Container>
      <TypographyH1>Финанс</TypographyH1>
      <div className="mt-2 px-4 bg-light-50 space-y-1.5 py-5 rounded-2xl">
        <div className="flex justify-between items-start">
          <span className="text-[#A1A1A1]  text-sm flex-2 pr-4">
            Базовая комплектация
          </span>
          <span className="text-sm font-medium flex-1 text-left">
            Porsche 911GT
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Номер ГОСТ</span>
          <span className="text-sm font-medium text-left flex-1">
            01 A 123 AB
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Цена сухой продаже
          </span>
          <span className="text-sm font-medium text-left flex-1">
            $1 400 000
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Фактически продано
          </span>
          <span className="text-sm font-medium text-left flex-1">
            $1 400 000
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Продажа с выкупом
          </span>
          <span className="text-sm font-medium text-left flex-1">$4000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Первоначальный взнос
          </span>
          <span className="text-sm font-medium text-left flex-1">$2000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Кому сдать</span>
          <span className="text-sm font-medium text-left flex-1">
            Utkir Giyosov
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Период выкупа
          </span>
          <span className="text-sm font-medium text-left flex-1">
            12 месяцев
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Общие выплаты по графику
          </span>
          <span className="text-sm font-medium text-left flex-1">$1600</span>
        </div>
      </div>
      <TypographyH1>Перезадать</TypographyH1>
      <div className="mt-2 px-4 bg-light-50 space-y-1.5 py-5 rounded-2xl">
        <div className="flex justify-between items-start">
          <span className="text-[#A1A1A1]  text-sm flex-2 pr-4">
            Базовая комплектация
          </span>
          <span className="text-sm font-medium flex-1 text-left">
            Porsche 911GT
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Номер ГОСТ</span>
          <span className="text-sm font-medium text-left flex-1">
            01 A 123 AB
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Цена сухой продаже
          </span>
          <span className="text-sm font-medium text-left flex-1">
            $1 400 000
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Фактически продано
          </span>
          <span className="text-sm font-medium text-left flex-1">
            $1 400 000
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Продажа с выкупом
          </span>
          <span className="text-sm font-medium text-left flex-1">$4000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Первоначальный взнос
          </span>
          <span className="text-sm font-medium text-left flex-1">$2000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Кому сдать</span>
          <span className="text-sm font-medium text-left flex-1">
            Utkir <span className="text-green-500 ml-3">+$2000</span>
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Кому перешёл
          </span>
          <span className="text-sm font-medium text-left flex-1">
            Temur <span className="text-red-500 ml-3">-$2000</span>
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Период выкупа
          </span>
          <span className="text-sm font-medium text-left flex-1">
            12 месяцев
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Общие выплаты по графику
          </span>
          <span className="text-sm font-medium text-left flex-1 text-green-500">
            $1600
          </span>
        </div>
      </div>
      <TypographyH1>Продан</TypographyH1>
      <div className="mt-2 px-4 bg-light-50 space-y-1.5 py-5 rounded-2xl">
        <div className="flex justify-between items-start">
          <span className="text-[#A1A1A1]  text-sm flex-2 pr-4">
            Базовая комплектация
          </span>
          <span className="text-sm font-medium flex-1 text-left">
            Porsche 911GT
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Номер ГОСТ</span>
          <span className="text-sm font-medium text-left flex-1">
            01 A 123 AB
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Цена сухой продаже
          </span>
          <span className="text-sm font-medium text-left flex-1">$14 000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Фактически продано
          </span>
          <span className="text-sm font-medium text-left flex-1">$14 000</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Продажа с выкупом
          </span>
          <span className="text-sm font-medium text-left flex-1">$17 200</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Первоначальный взнос
          </span>
          <span className="text-sm font-medium text-left flex-1">$2000</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Кому перешёл
          </span>
          <span className="text-sm font-medium text-left flex-1">Temur</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Период выкупа
          </span>
          <span className="text-sm font-medium text-left flex-1">
            12 месяцев
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Общие выплаты по графику
          </span>
          <span className="text-sm font-medium text-left flex-1 ">$1600</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">Итог</span>
          <span className="text-sm font-medium text-left flex-1">$17 200</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#A1A1A1] text-sm flex-2 pr-4">
            Возврат клиента
          </span>
          <span className="text-sm font-medium text-left flex-1 text-green-500">
            $400
          </span>
        </div>
      </div>
      <div className="mt-3 py-6 flex justify-end gap-4">
        <Button variant={"outline"}>Удалить</Button>
        <Button>Сохранить</Button>
      </div>
    </Container>
  );
}
