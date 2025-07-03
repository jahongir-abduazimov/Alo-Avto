import Container from "@/components/layout/container";
import React from "react";
import MarketPricingClient from "./market-pricing-client";

export default function MarketPricingPage() {
  return (
    <Container padding={false}>
      <MarketPricingClient />
    </Container>
  );
}
