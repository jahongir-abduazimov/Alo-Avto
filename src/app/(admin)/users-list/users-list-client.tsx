import ActionCard from "@/components/action-card";
import Container from "@/components/layout/container";
import TypographyH1 from "@/components/ui/typography-h1";
import React from "react";

export default function UsersListClient() {
  return (
    <Container>
      <TypographyH1>Список пользователей</TypographyH1>

      <ActionCard></ActionCard>
    </Container>
  );
}
