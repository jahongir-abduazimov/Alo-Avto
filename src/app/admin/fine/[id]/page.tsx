"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
// import { useParams } from "next/navigation";

interface Fine {
  id: string;
  amount: string;
  date: string;
  url: string;
}

const fines: Fine[] = [
  {
    id: "1",
    amount: "1 920 000 UZS",
    date: "13 апреля 2025 года",
    url: "www.olx.uz/d/obyavlenie/kia-k5-2023-kojinniy-salon-ID43k0B.html",
  },
  {
    id: "2",
    amount: "1 920 000 UZS",
    date: "13 апреля 2025 года",
    url: "www.olx.uz/d/obyavlenie/kia-k5-2023-kojinniy-salon-ID43k0B.html",
  },
];

export default function FineDetails() {
  //   const params = useParams();
  //   const userId = params.id;

  const handleUrlClick = (url: string) => {
    window.open(`https://${url}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/fine">
            <Button variant="ghost" size="icon" className="mr-3 p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">
            Штраф Kathryn Murphy
          </h1>
        </div>

        <div className="space-y-4">
          {fines.map((fine) => (
            <Card key={fine.id} className="bg-white shadow-sm border-gray-100">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-red-600 mb-3">
                  {fine.amount}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Дата штрафа —</span> {fine.date}
                </p>
                <div
                  className="flex items-start justify-between cursor-pointer group"
                  onClick={() => handleUrlClick(fine.url)}
                >
                  <p className="text-sm text-gray-700 flex-1 mr-3 leading-relaxed group-hover:text-blue-600 transition-colors">
                    {fine.url}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-blue-600 p-1 flex-shrink-0"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
