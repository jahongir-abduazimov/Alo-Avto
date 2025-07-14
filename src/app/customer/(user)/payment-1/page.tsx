"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/container";
import { useRouter } from "next/navigation";
import Payments from "@/components/payments";

export default function LoanOverviewPage() {
  const route = useRouter();

  return (
    <Container>
      <Payments showButton={true} showProgress={true} />

      {/* Fixed Pay Button */}
      <div className="bottom-20 left-4 right-4">
        <Button
          onClick={() => route.push("/customer/payment-2")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-14 text-lg font-medium"
        >
          Оплатить
        </Button>
      </div>
    </Container>
  );
}
