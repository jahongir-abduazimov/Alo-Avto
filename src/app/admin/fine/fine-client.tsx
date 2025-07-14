"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  name: string;
  brand: string;
  model: string;
  plateNumber: string;
  phone: string;
  telegram: string;
  avatar: string;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    name: "Kathryn Murphy",
    brand: "Chevrolet",
    model: "Spark",
    plateNumber: "01 A 123 AB",
    phone: "+998 90 694 87 17",
    telegram: "@gulomjon",
    avatar: "/placeholder.svg?height=40&width=40&text=KM",
  },
  {
    id: "2",
    name: "Kathryn Murphy",
    brand: "Chevrolet",
    model: "Spark",
    plateNumber: "01 A 123 AB",
    phone: "+998 90 694 87 17",
    telegram: "@gulomjon",
    avatar: "/placeholder.svg?height=40&width=40&text=KM",
  },
  {
    id: "3",
    name: "Kathryn Murphy",
    brand: "Chevrolet",
    model: "Spark",
    plateNumber: "01 A 123 AB",
    phone: "+998 90 694 87 17",
    telegram: "@gulomjon",
    avatar: "/placeholder.svg?height=40&width=40&text=KM",
  },
  {
    id: "4",
    name: "Kathryn Murphy",
    brand: "Chevrolet",
    model: "Spark",
    plateNumber: "01 A 123 AB",
    phone: "+998 90 694 87 17",
    telegram: "@gulomjon",
    avatar: "/placeholder.svg?height=40&width=40&text=KM",
  },
  {
    id: "5",
    name: "Kathryn Murphy",
    brand: "Chevrolet",
    model: "Spark",
    plateNumber: "01 A 123 AB",
    phone: "+998 90 694 87 17",
    telegram: "@gulomjon",
    avatar: "/placeholder.svg?height=40&width=40&text=KM",
  },
  {
    id: "6",
    name: "Kathryn Murphy",
    brand: "Chevrolet",
    model: "Spark",
    plateNumber: "01 A 123 AB",
    phone: "+998 90 694 87 17",
    telegram: "@gulomjon",
    avatar: "/placeholder.svg?height=40&width=40&text=KM",
  },
];

export default function TrafficFinesApp() {
  const [selectedBrand, setSelectedBrand] = useState<string>("chevrolet");
  const [selectedModel, setSelectedModel] = useState<string>("spark");
  const [selectedPlate, setSelectedPlate] = useState<string>("01A123AB");
  const [showResults, setShowResults] = useState(true);
  const router = useRouter();

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleClear = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedPlate("");
    setShowResults(false);
  };

  const handleCheck = (userId: string) => {
    router.push(`/fine/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Штраф</h1>

        {/* Search Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Марка
            </label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-full bg-white border-gray-200 h-12">
                <SelectValue placeholder="Выберите марку" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chevrolet">Chevrolet</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="hyundai">Hyundai</SelectItem>
                <SelectItem value="kia">Kia</SelectItem>
                <SelectItem value="nissan">Nissan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Модель
            </label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full bg-white border-gray-200 h-12">
                <SelectValue placeholder="Выберите модель" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spark">Spark</SelectItem>
                <SelectItem value="cruze">Cruze</SelectItem>
                <SelectItem value="malibu">Malibu</SelectItem>
                <SelectItem value="tahoe">Tahoe</SelectItem>
                <SelectItem value="cobalt">Cobalt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ГОСТ номер
            </label>
            <Select value={selectedPlate} onValueChange={setSelectedPlate}>
              <SelectTrigger className="w-full bg-white border-gray-200 h-12">
                <SelectValue placeholder="Выберите номер" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01A123AB">01 A 123 AB</SelectItem>
                <SelectItem value="02B456CD">02 B 456 CD</SelectItem>
                <SelectItem value="03C789EF">03 C 789 EF</SelectItem>
                <SelectItem value="04D012GH">04 D 012 GH</SelectItem>
                <SelectItem value="05E345IJ">05 E 345 IJ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 bg-gray-100 text-gray-700 border-gray-200 h-12 hover:bg-gray-200"
              onClick={handleClear}
            >
              Очистить
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 h-12 text-white font-medium"
              onClick={handleSearch}
            >
              Найти
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="space-y-3">
            {mockResults.map((result) => (
              <Card
                key={result.id}
                className="bg-white shadow-sm border-gray-100"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Avatar className="h-12 w-12 mt-1">
                        <AvatarImage
                          src={result.avatar || "/placeholder.svg"}
                          alt={result.name}
                        />
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-medium">
                          KM
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-base mb-1">
                          {result.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {result.brand} {result.model} {result.plateNumber}
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Phone className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{result.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <MessageCircle className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">
                              Telegram Ник: {result.telegram}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 ml-3 flex-shrink-0"
                      onClick={() => handleCheck(result.id)}
                    >
                      Проверить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
