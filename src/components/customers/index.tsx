"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Search, SlidersHorizontal, Plus, Edit2, Trash2 } from "lucide-react";
import { Pagination } from "@/components/pagination";

interface Client {
  id: string;
  name: string;
  avatarUrl: string;
  phone: string;
  telegram: string;
  address: string;
  email: string;
}

const mockClients: Client[] = Array(4)
  .fill(null)
  .map((_, index) => ({
    id: (index + 1).toString(),
    name: "Kathryn Murphy",
    avatarUrl: `/placeholder.svg?width=40&height=40&query=woman+profile+${index}`,
    phone: "(270) 555-0117",
    telegram: "@gulomjon",
    address: "ул. Ранчвью, 3891, Ричардсон, Калифорния, 62639",
    email: "kathryn.murphy@example.com",
  }));

export default function CustomerClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const totalRecords = 50; // Example total records
  const totalPages = Math.ceil(totalRecords / Number.parseInt(itemsPerPage));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Placeholder for client data based on pagination
  const displayedClients = mockClients.slice(
    (currentPage - 1) * Number.parseInt(itemsPerPage),
    currentPage * Number.parseInt(itemsPerPage)
  );

  return (
    <div className="">
      {" "}
      {/* Changed to white bg for page, max-w-md */}
      <header className="mb-5">
        <h1 className="text-3xl font-bold text-gray-900">Клиенты</h1>
      </header>
      <div className="mb-5 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        <Input
          type="search"
          placeholder="Поиск"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-full focus:ring-1 focus:ring-blue-500 focus:border-blue-500 h-12"
        />
      </div>
      <div className="mb-6 flex items-center gap-3">
        <Button
          variant="outline"
          className="flex-1 bg-gray-50 border-gray-200 text-gray-700 rounded-full hover:bg-gray-100 h-11 text-sm font-medium"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Фильтр
        </Button>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full h-11 text-sm font-medium">
          <Plus className="mr-2 h-5 w-5" />
          Добавить клиента
        </Button>
      </div>
      <div className="space-y-3">
        {displayedClients.map((client) => (
          <Card
            key={client.id}
            className="bg-[#F7F8FA] rounded-2xl p-4 shadow-sm border-none"
          >
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage
                  src={client.avatarUrl || "/placeholder.svg"}
                  alt={client.name}
                />
                <AvatarFallback>{client.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <h3 className="flex-grow text-lg font-medium text-gray-900">
                {client.name}
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                >
                  <Edit2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-2 text-sm">
                <p className="text-gray-800">{client.phone}</p>
                <div>
                  <p className="text-gray-500">Telegram-ник:</p>
                  <p className="text-gray-800">{client.telegram}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-800 break-words">
                <p>{client.address}</p>
                <p>{client.email}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={Number.parseInt(itemsPerPage)}
          totalItems={totalRecords}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(items) => setItemsPerPage(items.toString())}
        />
      </div>
    </div>
  );
}
