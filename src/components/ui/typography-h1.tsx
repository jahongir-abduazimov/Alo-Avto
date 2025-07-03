import React from "react";

export default function TypographyH1({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h1 className="font-bold text-3xl mt-6">{children}</h1>;
}
