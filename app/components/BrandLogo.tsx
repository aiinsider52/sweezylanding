"use client";

import { useState } from "react";

type Props = {
  className?: string;
  alt?: string;
  variant?: "mark" | "lockup";
};

export function BrandLogo({
  className = "",
  alt = "Sweezy",
  variant = "lockup",
}: Props) {
  const [idx, setIdx] = useState(0);

  const srcCandidates =
    variant === "mark"
      ? [
          "/brand/sweezy-mark.svg",
          "/brand/sweezy-mark.png",
          "/brand/sweezy-logo.svg",
          "/brand/sweezy-logo.png",
          "/brand/logo.svg",
          "/brand/logo.png",
        ]
      : ["/brand/sweezy-logo.svg", "/brand/sweezy-logo.png", "/brand/logo.svg", "/brand/logo.png"];

  const src = srcCandidates[idx];

  if (!src) {
    return (
      <div
        aria-label={alt}
        className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-accent-green to-accent-emerald ${className}`}
      >
        <span className="text-sm font-bold text-white">S</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setIdx((v) => v + 1)}
      draggable={false}
      loading="eager"
    />
  );
}

