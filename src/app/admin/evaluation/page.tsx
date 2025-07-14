import Container from "@/components/layout/container";
import React from "react";
import EvaluationResultsClient from "./evaluation-results-client";

export default function EvaluationResultsPage() {
  return (
    <Container padding={false}>
      <EvaluationResultsClient />
    </Container>
  );
}
