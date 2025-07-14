"use client";

import Container from "@/components/layout/container";
import TypographyH1 from "@/components/ui/typography-h1";
import { Triangle } from "lucide-react";
import React, { useEffect, useState } from "react";

interface EvaluationResults {
  recommended_price: number;
  low: number;
  mid: number;
  high: number;
  source_url: string;
}

interface CarInfo {
  brand: string;
  model: string;
}

export default function EvaluationResultsClient() {
  const [results, setResults] = useState<EvaluationResults | null>(null);
  const [carInfo, setCarInfo] = useState<CarInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get results from localStorage
    const storedResults = localStorage.getItem("evaluationResults");
    const storedCarInfo = localStorage.getItem("evaluationCarInfo");

    if (storedResults && storedCarInfo) {
      setResults(JSON.parse(storedResults));
      setCarInfo(JSON.parse(storedCarInfo));
    } else {
      // If no results, redirect back to form
      window.location.href = "/admin/evaluation/form";
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Загрузка результатов...</div>
        </div>
      </Container>
    );
  }

  if (!results || !carInfo) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Нет данных для отображения</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <TypographyH1>
        Результаты оценки{" "}
        <span className="text-information-500">
          {carInfo.brand} {carInfo.model}
        </span>
      </TypographyH1>
      <div className="py-4 px-6 bg-light-50 relative rounded-2xl mt-4">
        <p>
          Продажа за
          <b className="text-information-500 font-bold"> 30 </b>
          дней
        </p>
        <h3 className="text-information-500 font-bold text-3xl">
          {results.recommended_price.toLocaleString()}$
        </h3>
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
          Заниженные цены <br /> от {results.low.toLocaleString()} $
        </p>
        <p className="flex-1 text-[10px] text-center">Рыночные цены</p>
        <p className="flex-1 text-[10px] text-end">
          Завышенные цены <br /> до {results.high.toLocaleString()} $
        </p>
      </div>

      <div className="mt-12 space-y-3">
        <div className="bg-gray-50 border-l-2 rounded-2xl border-error-500 px-4 py-3">
          <div className="w-full h-full block">
            <h3 className="font-bold">Заниженные цены</h3>
            <p className="text-[11px]">
              от <b className="font-bold">{results.low.toLocaleString()} $</b>{" "}
              до
              <b className="font-bold">
                {(
                  results.low +
                  (results.mid - results.low) * 0.8
                ).toLocaleString()}{" "}
                $
              </b>
            </p>
          </div>
        </div>
        <div className="bg-gray-50 border-l-2 rounded-2xl border-information-500 px-4 py-3">
          <div className="w-full h-full block">
            <h3 className="font-bold">Рыночные цены</h3>
            <p className="text-[11px]">
              от{" "}
              <b className="font-bold">
                {(
                  results.low +
                  (results.mid - results.low) * 0.8
                ).toLocaleString()}{" "}
                $
              </b>{" "}
              до
              <b className="font-bold">
                {(
                  results.mid +
                  (results.high - results.mid) * 0.8
                ).toLocaleString()}{" "}
                $
              </b>
            </p>
          </div>
        </div>
        <div className="bg-gray-50 border-l-2 rounded-2xl border-gray-100 px-4 py-3">
          <div className="w-full h-full block">
            <h3 className="font-bold">Завышенные цены</h3>
            <p className="text-[11px]">
              от{" "}
              <b>
                {(
                  results.mid +
                  (results.high - results.mid) * 0.8
                ).toLocaleString()}{" "}
                $
              </b>
              до <b> {results.high.toLocaleString()} $</b>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
