"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchContractDocuments } from "@/lib/api";
import type { ContractDocument } from "@/types/document";

const CONTRACT_TYPE_LABELS: Record<string, string> = {
  sale: "Договор купли продажи",
  power_of_attorney: "Генеральная доверенность",
  closing: "Закрывающий",
};
const CONTRACT_TYPES = ["sale", "power_of_attorney", "closing"];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<ContractDocument[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    fetchContractDocuments()
      .then((data) => setDocuments(data.results))
      .catch(() => setDocuments([]));
  }, []);

  const filteredDocs = selectedType
    ? documents.filter((doc) => doc.contract_type === selectedType)
    : documents;

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 h-[80vh]">
      <h1 className="text-2xl font-bold">Документ</h1>

      <div className="flex items-center gap-2">
        <Button className="rounded-full bg-[#3563E9]">Добавить документ</Button>
        <Button variant="outline" className="rounded-full ">
          <Link
            href={"/admin/documents/add"}
            className="flex gap-1 items-center w-full h-full"
          >
            <Plus size={16} /> Создать
          </Link>
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap pt-2">
        {CONTRACT_TYPES.map((type) => (
          <Badge
            key={type}
            variant={selectedType === type ? "default" : "secondary"}
            onClick={() =>
              setSelectedType((prev) => (prev === type ? null : type))
            }
            className="cursor-pointer"
          >
            {CONTRACT_TYPE_LABELS[type]}
          </Badge>
        ))}
      </div>

      <ScrollArea className="h-[300px] pr-2">
        <div className="space-y-3 pt-4">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded w-16 h-16 flex items-center justify-center">
                {doc.images && doc.images.length > 0 ? (
                  <Image
                    src={doc.images[0].image}
                    alt="document image"
                    width={56}
                    height={56}
                    className="object-contain rounded"
                  />
                ) : (
                  <span className="text-gray-400">No image</span>
                )}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {doc.title}
              </div>
            </div>
          ))}
          {filteredDocs.length === 0 && (
            <p className="text-sm text-gray-400">Нет документов</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
