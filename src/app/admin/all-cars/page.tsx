import AllCarsClientPage from "@/components/all-cars";
import Container from "@/components/layout/container";
import React, { Suspense } from "react";

export default function AllCarspage() {
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <AllCarsClientPage />
      </Suspense>
    </Container>
  );
}
