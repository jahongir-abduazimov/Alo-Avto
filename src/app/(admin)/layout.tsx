import Container from "@/components/layout/container";
import Navbar from "@/components/layout/navbar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container padding={false}>
      <Navbar />
      {children}
    </Container>
  );
}
