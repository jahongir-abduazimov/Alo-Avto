"use client";
import React, { useEffect } from "react";
import { Button } from "../button";
import { Plus } from "lucide-react";
import CarMarketplace from "./cars";
import { useRouter, useSearchParams } from "next/navigation";
import { useFilterStore } from "@/lib/filterStore";

function AllCarsClientPage() {
  const route = useRouter();
  const searchParams = useSearchParams();

  // Zustand filter store
  const { search, brand, model, gost_number, setFilters } = useFilterStore();

  // 1. Sahifa ochilganda query params'dagi filterlarni zustand'ga yuklash
  useEffect(() => {
    setFilters({
      search: searchParams.get("search") || "",
      brand: searchParams.get("brand") || "",
      model: searchParams.get("model") || "",
      gost_number: searchParams.get("gost_number") || "",
    });
    // eslint-disable-next-line
  }, []);

  // 2. Filterlar o'zgarganda URL query params'ni yangilash
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (brand) params.set("brand", brand);
    if (model) params.set("model", model);
    if (gost_number) params.set("gost_number", gost_number);
    route.replace(`?${params.toString()}`, { scroll: false });
  }, [search, brand, model, gost_number, route]);

  return (
    <div className="py-4">
      <h1 className="font-bold text-2xl mb-4">Все машины</h1>
      <Button
        onClick={() => route.push("/admin/add-cars")}
        leftIcon={<Plus className="size-4" />}
      >
        Добавить новую машину
      </Button>

      <CarMarketplace />
    </div>
  );
}

export default AllCarsClientPage;
