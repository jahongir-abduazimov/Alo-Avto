"use client";

import { useState } from "react";
import { TabNavigation } from "@/components/tab-navigation";
import { Pagination } from "@/components/pagination";
import Image from "next/image";

// Mock data
const mockCars = Array.from({ length: 50 }, (_, i) => ({
  id: `car-${i + 1}`,
  image: "/placeholder.svg?height=64&width=64",
  status: "Актив" as const,
  brand: "Lamborghini",
  model: "Huracan 1.5 Sports",
  type: "Продажа" as const,
}));

export default function CarMarketplace() {
  const [activeTab, setActiveTab] = useState("Закуп");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const tabs = ["Для Выкупа", "Закуп", "Продажа"];

  // Calculate pagination
  const totalItems = mockCars.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = mockCars.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="pt-4">
          {/* Tab Navigation */}
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Car List */}
          <div className="space-y-3 mb-8">
            {currentCars.map((car) => (
              <div key={car.id} className="space-y-6">
                <div className="flex  gap-4">
                  <div className="relative size-28 rounded-2xl overflow-hidden">
                    <Image
                      alt=""
                      src={"/images/lamborghini.png"}
                      fill
                      className="object-cover "
                    />
                  </div>
                  <div className="flex flex-col justify-around items-left space-y-1">
                    <div>
                      <span className="bg-primary-100  px-3 py-1 rounded-full text-[#22C55E]">
                        Актив
                      </span>
                    </div>
                    <p className="text-[#A1A1A1]">Lamborghini</p>
                    <p className="font-medium text-base w-40 line-clamp-1">
                      {" "}
                      Huracan 1.5 Sports
                    </p>
                    <p className="font-bold text-[#04070D]">Продажа</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
}
