// app/clients/page.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Filter,
  Pencil,
  Trash,
  User,
  ArrowUpRight,
} from "lucide-react";
import Container from "@/components/layout/container";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getClients, deleteClient } from "@/lib/api";
import { Client } from "@/types/user";
import { useFinanceStore } from "@/lib/financeStore";

export default function ClientsPage() {
  const router = useRouter();
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const setRentalId = useFinanceStore((state) => state.setRentalId);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const data = await getClients();
        console.log("API dan kelgan data:", data);
        setClients(Array.isArray(data) ? data : data || []);
      } catch (err) {
        setError("Ошибка при загрузке клиентов");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async () => {
    if (!clientToDelete) return;

    try {
      await deleteClient(clientToDelete.id);
      setClients(clients.filter((client) => client.id !== clientToDelete.id));
      setClientToDelete(null);
    } catch (error) {
      console.error("Failed to delete client:", error);
      setError("Ошибка при удалении клиента");
    }
  };

  // Filter clients based on search term
  const filteredClients = clients.filter((client) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      client.first_name?.toLowerCase().includes(searchLower) ||
      client.last_name?.toLowerCase().includes(searchLower) ||
      client.phone_number?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Загрузка клиентов...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Попробовать снова
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Клиенты</h1>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Поиск"
            className="pl-10 w-full rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <Button variant="outline" className="rounded-full flex gap-1 px-4">
            <Filter className="w-4 h-4" />
            Фильтр
          </Button>
          <Button
            className="bg-primary-500 text-white rounded-full flex gap-1 px-4"
            onClick={() => router.push("/admin/clients/add")}
          >
            <Plus className="w-4 h-4" />
            Добавить клиента
          </Button>
        </div>

        {filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm ? "Клиенты не найдены" : "Клиенты отсутствуют"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredClients.map((client) => (
              <div
                key={client.phone_number}
                className="bg-[#F8F8F8] p-4 rounded-2xl flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  {client.first_name && client.last_name ? (
                    <span className="text-sm font-medium text-gray-600">
                      {client.first_name.charAt(0)}
                      {client.last_name.charAt(0)}
                    </span>
                  ) : (
                    <User className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-base">
                        {client.first_name && client.last_name
                          ? `${client.first_name} ${client.last_name}`
                          : "Не указано имя"}
                      </p>
                      <p className="text-gray-400">
                        {client.phone_number || "Телефон не указан"}
                      </p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-8 h-8"
                        onClick={() =>
                          router.push(`/admin/clients/${client.id}`)
                        }
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {client.car && (
                      <div className="text-gray-400">
                        <p>Автомобиль:</p>
                        <p className="text-[#04070D]">
                          {client.car.name} ({client.car.registration_number})
                        </p>
                      </div>
                    )}
                    {client.rental && (
                      <div className="text-gray-400">
                        <p>Дата возврата:</p>
                        <p className="text-[#04070D]">
                          {client.rental.rent_due_date}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
