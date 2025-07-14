import Container from "@/components/layout/container";
import React from "react";
import GeolocationClient from "./geolocation-client";

export default function page() {
  return (
    <Container padding={false}>
      <GeolocationClient />
    </Container>
  );
}
