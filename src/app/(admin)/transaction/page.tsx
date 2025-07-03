import Container from "@/components/layout/container";
import React from "react";
import TransactionClient from "./transaction-client";

export default function TransactionPage() {
  return (
    <Container padding={false}>
      <TransactionClient />
    </Container>
  );
}
