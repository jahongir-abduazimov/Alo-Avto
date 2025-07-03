"use client";
import React from "react";
import { Button } from "../button";
import { Plus } from "lucide-react";
import CarMarketplace from "./cars";
import { useRouter } from "next/navigation";
// import Button from "../button";
// import { Plus } from "lucide-react";

function AllCarsClientPage() {
  const route = useRouter();
  return (
    <div className="py-4">
      <h1 className="font-bold text-2xl mb-4">Все машины</h1>
      <Button
        onClick={() => route.push("/add-cars")}
        leftIcon={<Plus className="size-4" />}
      >
        Добавить новую машину
      </Button>

      <CarMarketplace />
    </div>
  );
}

export default AllCarsClientPage;
