import Container from "@/components/layout/container";
import React from "react";
import FinanceClient from "./finance-client";

export default function FinancePage() {
  return (
    <Container padding={false}>
      <FinanceClient />
    </Container>
  );
}
