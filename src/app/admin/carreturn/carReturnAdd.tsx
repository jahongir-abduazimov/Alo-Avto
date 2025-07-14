// app/carreturn/carReturnAdd.tsx
"use client";

import CarReturnForm from "@/components/Forms/carReturnForm";

export default function CarReturnAddPage() {
  return (
    <div className="max-w-xl mx-auto p-4 h-[calc(100vh-100px)]">
      <h1 className="text-2xl font-bold mb-4">Добавить сдачу авто</h1>
      <CarReturnForm  />
    </div>
  );
}
