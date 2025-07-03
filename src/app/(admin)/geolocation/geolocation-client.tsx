"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Phone,
  Calendar,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function GeolocationClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("B 3243 ABC");
  const totalPages = 4;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-6">
      {/* Map View */}
      <div className="relative h-72 overflow-hidden w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15793.41623587319!2d69.26670207636502!3d41.3174660716865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1749837912174!5m2!1sru!2s"
          allowFullScreen={true}
          loading="lazy"
          className="size-full"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Search Bar */}
      <div className="px-4 relative mt-6 z-10">
        <div className="bg-white rounded-full border shadow-md flex items-center px-4 py-2">
          <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
          <Input
            type="text"
            placeholder="Search by plate number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none shadow-none focus-visible:ring-0 pl-0 h-9"
          />
        </div>
      </div>

      {/* Vehicle Listings */}
      <div className="mt-4 px-4 space-y-3">
        {[1, 2, 3].map((item) => (
          <VehicleCard key={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </button>

        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              currentPage === page ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="w-8 h-8 flex items-center justify-center rounded-full"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}

function VehicleCard() {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="flex items-center p-3 border-b border-gray-100">
        <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
          <Image
            src="/images/car-toyota.png"
            alt="Toyota Avanza"
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="font-medium text-gray-800">Toyota Avanza 1.5 A/T</h3>
          <div className="flex items-center mt-1.5 gap-2">
            <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full font-medium">
              B 3243 ABC
            </span>
            <span className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
              In use
            </span>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 relative rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/images/chris-evan.png"
              alt="Chris Evan"
              fill
              className="object-cover"
            />
          </div>
          <span className="ml-2 font-medium text-gray-800">Chris Evan</span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500">
              <Phone className="h-4 w-4 mr-2" />
              <span>Phone number</span>
            </div>
            <div className="text-gray-800 font-medium">081273832821</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Rent due date</span>
            </div>
            <div className="text-gray-800 font-medium">24 Jun 2024</div>
          </div>
        </div>
      </div>
    </div>
  );
}
