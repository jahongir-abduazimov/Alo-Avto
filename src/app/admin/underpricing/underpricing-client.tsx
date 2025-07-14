import Container from "@/components/layout/container";
import TypographyH1 from "@/components/ui/typography-h1";
import Link from "next/link";
import React from "react";

export default function UnderpricingClient() {
  const mockArray = Array.from({ length: 20 }, (_, i) => ({
    id: `id-${i + 1}`,
    url: "https://olx.uz/d/obyavlenie/kia-k5-2023-kojinniy-salon-ID43k0B.html",
  }));
  return (
    <Container>
      <TypographyH1>Заниженные цены</TypographyH1>
      <div className="mt-4 space-y-3">
        {mockArray.map((links) => (
          <div
            key={links.id}
            className="border px-4 relative py-2 rounded-2xl overflow-hidden"
          >
            <Link
              href={
                "https://olx.uz/d/obyavlenie/kia-k5-2023-kojinniy-salon-ID43k0B.html"
              }
            >
              www.olx.uz/d/obyavlenie/kia-k5-2023-kojinniy-salon-ID43k0B.html
              <div className="inset-0  w-full h-full absolute"></div>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
}
