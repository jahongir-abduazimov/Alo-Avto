import Container from "@/components/layout/container";
import TypographyH1 from "@/components/ui/typography-h1";
import { Triangle } from "lucide-react";
import React from "react";

export default function EvaluationResultsClient() {
  return (
    <Container>
      <TypographyH1>
        Результаты оценки <span className="text-information-500">Lacetti</span>
      </TypographyH1>
      <div className="py-4 px-6 bg-light-50 relative rounded-2xl mt-4">
        <p>
          Продажа за
          <b className="text-information-500 font-bold"> 30 </b>
          дней
        </p>
        <h3 className="text-information-500 font-bold text-3xl">1 800 000$</h3>
        <p>Рекомендованная рыночная цена</p>

        <div className="w-full absolute left-0 flex justify-center items-center">
          <Triangle
            className="size-12 rotate-[60deg] text-light-50"
            fill="#f5f5f6"
          />
        </div>
      </div>
      <div className="flex  mt-12 rounded-full h-5 overflow-hidden">
        <div className="flex-1 bg-error-500"></div>
        <div className="flex-1 bg-primary-500"></div>
        <div className="flex-1 bg-light-100"></div>
      </div>
      <div className="flex px-1.5 mt-2">
        <p className="flex-1 text-[10px]">
          Заниженные цены <br /> от 1 260 000 $
        </p>
        <p className="flex-1 text-[10px] text-center">Рыночные цены</p>
        <p className="flex-1 text-[10px] text-end">
          Завышенные цены <br /> до 1 990 000 ₽
        </p>
      </div>

      <div className="mt-12 space-y-3">
        <div className="bg-gray-50 border-l-2 rounded-2xl border-error-500 px-4 py-3">
          <h3 className="font-bold">Заниженные цены</h3>
          <p className="text-[11px]">
            от <b className="font-bold">1 260 000 $</b> до
            <b className="font-bold">1 715 000 $</b> Количество авто на рынке:
            <b className="font-bold">12</b>
          </p>
        </div>
        <div className="bg-gray-50 border-l-2 rounded-2xl border-information-500 px-4 py-3">
          <h3 className="font-bold">Рыночные цены</h3>
          <p className="text-[11px]">
            от <b className="font-bold">1 715 000 ₽</b> до
            <b className="font-bold">1 950 000 ₽</b> Количество авто на рынке:
            <b className="font-bold">24</b>
          </p>
        </div>
        <div className="bg-gray-50 border-l-2 rounded-2xl border-gray-100 px-4 py-3">
          <h3 className="font-bold">Завышенные цены</h3>
          <p className="text-[11px]">
            от <b>1 950 000 ₽</b>
            до <b> 1 990 000 ₽</b> Количество авто на рынке: <b>12</b>
          </p>
        </div>
      </div>
    </Container>
  );
}
