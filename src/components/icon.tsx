"use client";

import { useState, useEffect } from "react";

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
    // Fetch the SVG file
    fetch(`/icons/${name}.svg`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load icon: ${name}`);
        }
        return response.text();
      })
      .then((text) => {
        // Process the SVG content to add custom properties
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, "image/svg+xml");
        const svgElement = svgDoc.documentElement;

        // Apply color and size
        svgElement.setAttribute("width", `${size}`);
        svgElement.setAttribute("height", `${size}`);
        svgElement.setAttribute("fill", color);

        // Convert back to string
        const serializer = new XMLSerializer();
        const processedSvg = serializer.serializeToString(svgElement);

        setSvgContent(processedSvg);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [name, size, color]);

  return (
    <span
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      style={{ width: size, height: size }}
    />
  );
}
