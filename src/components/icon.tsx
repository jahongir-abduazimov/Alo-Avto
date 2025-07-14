"use client";

import React, { useEffect, useState } from "react";

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

export function Icon({
  name,
  className = "",
  size = 24,
  color = "currentColor",
}: IconProps) {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch(`/icons/${name}.svg`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load icon: ${name}`);
        }
        return response.text();
      })
      .then((text) => {
        // Replace any fill attributes with fill="currentColor"
        let processed = text.replace(
          /fill="(?!none)[^"]*"/gi,
          'fill="currentColor"'
        );
        setSvgContent(processed);
      })
      .catch((error) => {
        setSvgContent("");
        console.error(error);
      });
  }, [name]);

  return (
    <span
      className={className}
      style={{ color, width: size, height: size, display: "inline-block" }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
