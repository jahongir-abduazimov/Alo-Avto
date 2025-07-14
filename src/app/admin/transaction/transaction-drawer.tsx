"use client";

import * as React from "react";

import { Button } from "@/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/layout/container";
import { Payment } from "@/types/payment";
import { updatePaymentStatus } from "@/lib/api";
import Image from "next/image";

interface TransactionDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  payment?: Payment | null;
}

export function TransactionDrawer({
  open,
  onOpenChange,
  payment,
}: TransactionDrawerProps) {
  const [loading, setLoading] = React.useState(false);
  const [rejectLoading, setRejectLoading] = React.useState(false);
  const [localPayment, setLocalPayment] = React.useState<Payment | null>(
    payment ?? null
  );
  const [proofModalOpen, setProofModalOpen] = React.useState(false);

  React.useEffect(() => {
    setLocalPayment(payment ?? null);
  }, [payment]);

  const getMethodDisplay = (method: string) => {
    return method === "card" ? "Картой" : "Наличные";
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Принят";
      case "pending":
        return "В ожидании";
      case "cancelled":
        return "Отменен";
      case "rejected":
        return "Не принят";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleConfirm = async () => {
    if (!localPayment) return;
    setLoading(true);
    try {
      // For schedule payments, include month_number
      if (localPayment.type === "schedule" && localPayment.month_number) {
        await updatePaymentStatus(
          localPayment.id,
          "confirmed",
          "schedule",
          localPayment.month_number
        );
      } else {
        // For full payments, only send status
        await updatePaymentStatus(localPayment.id, "confirmed", "full");
      }
      setLocalPayment({ ...localPayment, status: "confirmed" });
      // Optionally close drawer: if (onOpenChange) onOpenChange(false);
    } catch (error) {
      console.error("Ошибка при подтверждении платежа:", error);
      // You can add a toast notification here instead of alert
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!localPayment) return;
    setRejectLoading(true);
    try {
      // For schedule payments, include month_number
      if (localPayment.type === "schedule" && localPayment.month_number) {
        await updatePaymentStatus(
          localPayment.id,
          "rejected",
          "schedule",
          localPayment.month_number
        );
      } else {
        // For full payments, only send status
        await updatePaymentStatus(localPayment.id, "rejected", "full");
      }
      setLocalPayment({ ...localPayment, status: "rejected" });
      // Optionally close drawer: if (onOpenChange) onOpenChange(false);
    } catch (error) {
      console.error("Ошибка при отклонении платежа:", error);
      // You can add a toast notification here instead of alert
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className="flex flex-col custom-drawer-content"
        style={{ top: "", height: "100vh", overflow: "auto" }}
      >
        <div className="mx-auto w-full max-w-sm flex flex-col flex-1 pb-4">
          <DrawerHeader>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-1.5 rounded-full bg-gray-200 mb-2" />
              <DrawerTitle className="text-center">
                Детали транзакции
              </DrawerTitle>
              {localPayment && (
                <>
                  <div className="font-bold text-5xl mt-2">
                    {localPayment.amount}$
                  </div>
                  <Badge
                    className="mt-2 px-4 py-2 text-base rounded-full bg-blue-100 text-blue-600 font-semibold"
                    variant="secondary"
                  >
                    {getMethodDisplay(localPayment.method)}
                  </Badge>
                </>
              )}
            </div>
          </DrawerHeader>
          <Container minHeight={false} className="flex-1 flex flex-col">
            <div className="flex flex-col items-center flex-1">
              {/* Dashed image box */}
              <div className="w-full h-40 border-2 border-dashed border-blue-300 flex justify-center items-center rounded-2xl mt-6 mb-4 text-gray-500 overflow-hidden bg-white relative">
                {localPayment?.proof ? (
                  <Image
                    src={localPayment.proof}
                    alt="Чек оплаты"
                    fill={false}
                    width={300}
                    height={160}
                    className="max-h-full max-w-full object-contain cursor-pointer"
                    onClick={() => setProofModalOpen(true)}
                    style={{ transition: "box-shadow 0.2s" }}
                  />
                ) : (
                  "изображение"
                )}
              </div>
              {/* Info block */}
              <div className="w-full bg-gray-50 px-4 py-3 rounded-2xl text-left mb-4">
                {localPayment ? (
                  <>
                    <div className="font-semibold mb-1">
                      Оплата аренды авто. Клиент:{" "}
                      {localPayment.user_full_name ||
                        `${localPayment.user_first_name} ${localPayment.user_last_name}`}
                    </div>
                    {/* Example period and method, replace with real data if available */}
                    <div className="text-sm text-gray-700">
                      Период: 01.06.2025 — 30.06.2025. Метод:{" "}
                      {getMethodDisplay(localPayment.method)}.
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      ID: {localPayment.id} | Инвойс:{" "}
                      {localPayment.invoice_number}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500">
                    Информация о платеже недоступна.
                  </div>
                )}
              </div>
              {/* Status badge */}
              {localPayment && (
                <div
                  className={`mb-4 self-start ${getStatusColor(
                    localPayment.status
                  )} px-4 py-1 rounded-full text-sm font-medium`}
                >
                  {getStatusDisplay(localPayment.status)}
                </div>
              )}
            </div>
            <div className="flex gap-4 justify-end w-full">
              <Button
                variant="outline"
                className="rounded-full px-8 py-2 border border-gray-300 text-gray-700"
                onClick={handleReject}
                disabled={rejectLoading || localPayment?.status === "rejected"}
              >
                {rejectLoading ? "Отклонение..." : "Не принят"}
              </Button>
              <Button
                className="rounded-full px-8 py-2 bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleConfirm}
                disabled={loading || localPayment?.status === "confirmed"}
              >
                {loading ? "Подтверждение..." : "Принят"}
              </Button>
            </div>
          </Container>
        </div>
        <DrawerFooter></DrawerFooter>
        {localPayment?.proof && proofModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={() => setProofModalOpen(false)}
          >
            <div
              className="bg-white rounded-lg p-4 max-w-2xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={localPayment.proof}
                alt="Чек оплаты"
                fill={false}
                width={600}
                height={480}
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
