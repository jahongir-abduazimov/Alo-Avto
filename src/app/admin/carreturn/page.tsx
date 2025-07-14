// components/pages/CarReturnListPage.tsx
"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Plus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/pagination";
import { DeleteAlert } from "@/components/alertDelete";
import { fetchRentals, deleteRental } from "@/lib/api";
import { toast } from "sonner";

interface CarReturnItem {
  id: number;
  brand: string;
  model: string;
  complectation: string;
  clientName: string;
  clientUsername: string;
  startDate: string;
  endDate: string;
  slug: string;
  car: {
    brand: string;
    model: string;
    complectation: string;
  };
  handover_to_user: {
    first_name: string;
    last_name: string;
  };
  payment_date: string;
}

export default function CarReturnListPage() {
  const [items, setItems] = useState<CarReturnItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const totalPages = Math.ceil(totalRecords / Number(itemsPerPage));
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = (itemId: number) => {
    setSelectedItemId(itemId);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItemId) return;

    setDeleteLoading(true);
    try {
      await deleteRental(selectedItemId);
      toast.success("Mashina muvaffaqiyatli qaytarildi");

      // Refresh the list
      fetchRentals({ page: currentPage, pageSize: Number(itemsPerPage) })
        .then((data) => {
          setItems(data.results || []);
          setTotalRecords(data.count || 0);
        })
        .catch(() => setItems([]));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Mashinani qaytarishda xatolik yuz berdi");
    } finally {
      setDeleteLoading(false);
      setDeleteOpen(false);
      setSelectedItemId(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchRentals({ page: currentPage, pageSize: Number(itemsPerPage) })
      .then((data) => {
        setItems(data.results || []);
        setTotalRecords(data.count || 0);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [currentPage, itemsPerPage]);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 h-[100vh]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Список сдачи авто</h1>
        <Button
          variant="ghost"
          className="text-gray-500"
          onClick={() => router.push("/admin/carreturn/create")}
        >
          <Plus className="mr-1 w-4 h-4" /> Добавить
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input placeholder="Поиск" className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-1 text-sm">
          <SlidersHorizontal size={16} /> Фильтр
        </Button>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 rounded-lg p-4 flex justify-between items-start text-sm"
            >
              <div>
                <div className="font-semibold">
                  {item.car.brand} {item.car.model}
                </div>
                <div className="text-muted-foreground">
                  {item.car.complectation}
                </div>
                <div className="mt-1">
                  {item.handover_to_user?.first_name}{" "}
                  {item.handover_to_user?.last_name}
                </div>
                <div className="mt-1 text-xs">
                  <div>Дата выплаты: {item.payment_date}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => router.push(`/admin/carreturn/${item.id}`)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                  variant="ghost"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination only if there are items */}
      {totalRecords > 0 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={Number(itemsPerPage)}
            onPageChange={handlePageChange}
            onItemsPerPageChange={(items) => setItemsPerPage(items.toString())}
          />
        </div>
      )}

      <DeleteAlert
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDelete={handleConfirmDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
