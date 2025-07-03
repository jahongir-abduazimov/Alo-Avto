import Container from "@/components/layout/container";
import React from "react";
import UsersListClient from "./users-list-client";

export default function UsersListPage() {
  return (
    <Container padding={false}>
      <UsersListClient />
    </Container>
  );
}
