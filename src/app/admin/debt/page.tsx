import Container from "@/components/layout/container";
import React from "react";
import DebtClient from "./debt-client";

export default function DebtPage() {
  return (
    <Container padding={false}>
      <DebtClient />
    </Container>
  );
}
