"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentFormPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the original payment flow
    router.push("/customer/payment-1");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-64">
      <p>Перенаправление...</p>
    </div>
  );
}
