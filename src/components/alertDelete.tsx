// components/DeleteAlert.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  loading?: boolean;
}

export function DeleteAlert({
  open,
  onOpenChange,
  onDelete,
  loading = false,
}: DeleteAlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-xl px-6 py-8 text-center">
        <div className="bg-red-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="text-red-500 w-6 h-6" />
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            Вы точно хотите удалить?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-500">
            Клиент был удалён навсегда
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 flex justify-center gap-4">
          <Button
            variant="outline"
            className="rounded-full px-6 bg-white border"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Не сейчас
          </Button>
          <Button
            className="bg-red-500 text-white rounded-full px-6"
            onClick={() => {
              onDelete();
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Удаление...
              </>
            ) : (
              "Да, я хочу удалить"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
