"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import AddDocument from "@/components/documents/addDocument";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function AddDocumentPage() {
  const [docType, setDocType] = useState("closing");
  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Добавить документ</h1>

      <div>
        <Label className="text-sm">Тип документа</Label>
        <Select onValueChange={setDocType}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Закрывающий" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="closing">Закрывающий</SelectItem>
            <SelectItem value="sale">Договор купли продажи</SelectItem>
            <SelectItem value="power_of_attorney">
              Генеральная доверенность
            </SelectItem>
          </SelectContent>
        </Select>
        <AddDocument docType={docType} />
      </div>
    </div>
  );
}
