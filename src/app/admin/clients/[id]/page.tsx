"use client";

import ClientForm from "@/components/Forms/ClientForm";
import { useParams } from "next/navigation";


export default function EditClientPage() {
  const params = useParams();
  const id = params.id as string;
  return <ClientForm id={id} />;
}
