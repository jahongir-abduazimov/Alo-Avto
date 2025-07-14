"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, SlidersHorizontal, Plus, Edit2, Trash2 } from "lucide-react";
import { Pagination } from "@/components/pagination";
import { getUsers } from "@/lib/api";
import { User } from "@/types/user";

export default function CustomerClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((err) => {
        setError("Ma'lumotlarni olishda xatolik");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalRecords = users.length;
  const totalPages = Math.ceil(totalRecords / Number.parseInt(itemsPerPage));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Foydalanuvchilarni paginatsiya qilish
  const displayedUsers = users.slice(
    (currentPage - 1) * Number.parseInt(itemsPerPage),
    currentPage * Number.parseInt(itemsPerPage)
  );

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!users.length) return <p>Foydalanuvchilar topilmadi</p>;
  return (
    <div className="py-5 pb-16">
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
        {displayedUsers.map((user) => (
          <Card
            key={user.id}
            className="bg-[#F7F8FA] rounded-2xl p-4 shadow-sm border-none"
          >
            <div className="flex items-center mb-2">
              <div className="flex-grow">
                <p className="font-semibold text-base text-gray-900">
                  {user.first_name || user.last_name
                    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
                    : user.username || "Имя не указано"}
                </p>
                <p className="text-gray-500 text-sm">
                  {user.role || "Роль не указана"}
                </p>
              </div>
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
            <div className="flex gap-6 text-sm mt-2">
              <div>
                <span className="text-gray-400 mr-1">Telegram-ник</span>
                <span className="text-gray-800">
                  {user.telegram_username || "Не указан"}
                </span>
              </div>
              <div>
                <span className="text-gray-400 mr-1">Мобильный номер</span>
                <span className="text-gray-800">
                  {user.phone_number || "Не указан"}
                </span>
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
          onPageChange={handlePageChange}
          onItemsPerPageChange={(items) => setItemsPerPage(items.toString())}
        />
      </div>
    </div>
  );
}
