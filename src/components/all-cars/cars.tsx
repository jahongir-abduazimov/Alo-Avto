"use client";

import { useEffect, useState } from "react";
import { TabNavigation } from "@/components/tab-navigation";
import { Pagination } from "@/components/pagination";
import Image from "next/image";
import { fetchCars } from "@/lib/api";
import { Car } from "@/types/car";
import { useFilterStore } from "@/lib/filterStore";

// Mock data
const mockCars = Array.from({ length: 50 }, (_, i) => ({
  id: `car-${i + 1}`,
  image: "/placeholder.svg?height=64&width=64",
  status: "Свободно" as const,
  brand: "Lamborghini",
  model: "Huracan 1.5 Sports",
  type: "Продажа" as const,
}));

export default function CarMarketplace() {
  const tabs = [
    { label: "Для Выкупа", value: "redemption" },
    { label: "Закуп", value: "purchase" },
    { label: "Продажа", value: "dry_sale" },
  ];

  const [activeTab, setActiveTab] = useState("dry_sale");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const { search, brand, model, gost_number } = useFilterStore();

  useEffect(() => {
    setLoading(true);
    fetchCars(activeTab, { search, brand, model, gost_number })
      .then((data) => setCars(data.results))
      .catch((err) => {
        console.error(err);
        // Removed unused error state
      })
      .finally(() => setLoading(false));
  }, [activeTab, search, brand, model, gost_number]);

  // Calculate pagination
  const totalItems = mockCars.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
            tabs={tabs.map((t) => t.label)}
            activeTab={tabs.find((t) => t.value === activeTab)?.label || ""}
            onTabChange={(label) => {
              const found = tabs.find((t) => t.label === label);
              if (found) setActiveTab(found.value);
            }}
          />
          {/* Car List */}
          {loading ? (
            <p>Yuklanmoqda...</p>
          ) : (
            <div className="space-y-3 mb-8">
              {cars.map((car) => (
                <div key={car.id} className="space-y-6">
                  <div className="flex  gap-4">
                    <div className="relative size-28 rounded-2xl overflow-hidden">
                      <Image
                        alt={car.brand || "car"}
                        src={car.image ? car.image : "/placeholder.png"}
                        fill
                        priority
                        className="object-cover "
                      />
                    </div>
                    <div className="flex flex-col justify-around items-left space-y-1">
                      <div>
                        {(() => {
                          let statusLabel = "";
                          let statusClass = "";
                          switch (car.status) {
                            case "active":
                              statusLabel = "Свободно";
                              statusClass = "bg-[#DCFCE7] text-[#22C55E]";
                              break;
                            case "sold":
                              statusLabel = "Пересдача";
                              statusClass = "bg-[#FEF2F2] text-[#EF4444]";
                              break;
                            case "reserved":
                              statusLabel = "Возврат";
                              statusClass = "bg-[#FEF9C3] text-[#EAB308]";
                              break;
                            case "maintenance":
                              statusLabel = "На продажу";
                              statusClass = "bg-[#DBEAFE] text-[#2563EB]";
                              break;
                            case "hand_over":
                              statusLabel = "Сдан";
                              statusClass = "bg-[#E9D5FF] text-[#9333EA]";
                              break;
                            default:
                              statusLabel = car.status;
                              statusClass = "bg-gray-200 text-gray-600";
                          }
                          return (
                            <span
                              className={`px-3 py-1 rounded-full ${statusClass}`}
                            >
                              {statusLabel}
                            </span>
                          );
                        })()}
                      </div>
                      <p className="text-[#A1A1A1]">{car.brand}</p>
                      <p className="font-medium text-base w-40 line-clamp-1 capitalize">
                        {car.model}
                      </p>
                      <p className="font-bold text-[#04070D]">Продажа</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && !cars.length && <p>Hech qanday mashina topilmadi</p>}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
}
