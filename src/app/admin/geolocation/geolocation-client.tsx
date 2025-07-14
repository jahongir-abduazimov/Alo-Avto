"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Phone, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getClients } from "@/lib/api";
import { Client } from "@/types/user";

interface Car {
  name: string;
  registration_number: string;
  status: string;
  image?: string;
}

interface Rental {
  rent_due_date: string;
}

interface CarLocation {
  latitude: number;
  longitude: number;
  address?: string | null;
  timestamp?: string;
}

function getYandexMapIframe(lat: number, lng: number) {
  return `https://yandex.com/map-widget/v1/?ll=${lng}%2C${lat}&z=14&pt=${lng},${lat},pm2rdm`;
}

export default function GeolocationClient() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getClients()
      .then((data) => setClients(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredClients = clients.filter(
    (c) =>
      (c.car?.registration_number || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (c.first_name + " " + c.last_name)
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-6">
      {/* Yandex Map View */}
      <div className="relative h-72 overflow-hidden w-full">
        {selectedClient && selectedClient.car_location ? (
          <iframe
            src={getYandexMapIframe(
              selectedClient.car_location.latitude,
              selectedClient.car_location.longitude
            )}
            allowFullScreen={true}
            loading="lazy"
            className="size-full"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            {selectedClient && !selectedClient.car_location
              ? "Lokatsiya mavjud emas"
              : "Mijozni tanlang"}
          </div>
        )}
      </div>
      <p className="text-center text-gray-600 text-xl mt-2 ">
        Bu sahifa test rejimida ishlayapti
      </p>
      {/* Search Bar */}
      <div className="px-4 relative mt-6 z-10">
        <div className="bg-white rounded-full border shadow-md flex items-center px-4 py-2">
          <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
          <Input
            type="text"
            placeholder="Davlat raqami yoki ism orqali qidiring"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none shadow-none focus-visible:ring-0 pl-0 h-9"
          />
        </div>
      </div>

      {/* Client List */}
      <div className="mt-4 px-4 space-y-3">
        {loading && (
          <div className="text-gray-400 text-center">Yuklanmoqda...</div>
        )}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {!loading && !error && filteredClients.length === 0 && (
          <div className="text-gray-400 text-center">Mijozlar topilmadi</div>
        )}
        {filteredClients.map((client, idx) => (
          <div
            key={idx}
            className={`border border-gray-200 rounded-xl overflow-hidden bg-white cursor-pointer transition-shadow ${
              selectedClient === client ? "ring-2 ring-blue-400" : ""
            }`}
            onClick={() => setSelectedClient(client)}
          >
            <VehicleCard client={client} />
          </div>
        ))}
      </div>
    </div>
  );
}

function VehicleCard({ client }: { client: Client }) {
  const avatar = client.car?.image
    ? client.car.image
    : "/images/chris-evan.png";
  const carImage = client.car?.image
    ? client.car.image
    : "/images/car-toyota.png";
  const phone = client.phone_number || "Telefon yo'q";
  const dueDate = client.rental?.rent_due_date || "Noma'lum";
  const carName = client.car?.name || "Avtomobil yo'q";
  const plate = client.car?.registration_number || "Davlat raqami yo'q";
  return (
    <div>
      <div className="flex items-center p-3 border-b border-gray-100">
        <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
          <Image src={carImage} alt={carName} fill className="object-cover" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="font-medium text-gray-800">
            {client.first_name || "Ism yo'q"} {client.last_name}
          </h3>
          <div className="flex items-center mt-1.5 gap-2">
            <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full font-medium">
              {plate}
            </span>
            <span className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
              {client.car?.status === "handed_over"
                ? "Foydalanilmoqda"
                : "Mavjud emas"}
            </span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 relative rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={avatar}
              alt={client.first_name}
              fill
              className="object-cover"
            />
          </div>
          <span className="ml-2 font-medium text-gray-800">
            {client.first_name || "Ism yo'q"}
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500">
              <Phone className="h-4 w-4 mr-2" />
              <span>Telefon raqami</span>
            </div>
            <div className="text-gray-800 font-medium">{phone}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Ijaraning tugash sanasi</span>
            </div>
            <div className="text-gray-800 font-medium">{dueDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// NOTE: You need to create an API route (e.g. /api/proxy/clients) in your Next.js app that proxies the request to your backend with the correct Authorization header, since fetch from the browser cannot send your server token directly.
