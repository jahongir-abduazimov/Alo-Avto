import ProtectRoute from "@/components/ProtectRoute";
import React from "react";
import LoginPage from "./login/page";

export default function HomePage() {
  return (
    <>
    <ProtectRoute>
        <LoginPage />
    </ProtectRoute>
    </>
  );
}
  