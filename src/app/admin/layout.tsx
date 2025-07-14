"use client";
import AppBar from "@/components/layout/app-bar";
import Container from "@/components/layout/container";
import Navbar from "@/components/layout/navbar";
import React from "react";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // Only show Navbar if not on /admin (home page)
  const showNavbar = pathname !== "/admin";
  return (
    <Container padding={false}>
      {showNavbar && <Navbar />}
      {children}
      <AppBar />
    </Container>
  );
}
