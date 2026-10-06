"use client";

import type { CSSProperties, PointerEvent } from "react";

export function HeroWorld({ accent }: { accent: string }) {
  function move(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", (((event.clientX - rect.left) / rect.width) * 100) + "%");
    event.currentTarget.style.setProperty("--pointer-y", (((event.clientY - rect.top) / rect.height) * 100) + "%");
  }
  return (
    <div
      className="hero-world"
      onPointerMove={move}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--pointer-x", "68%");
        event.currentTarget.style.setProperty("--pointer-y", "28%");
      }}
      style={{ "--world-accent": accent } as CSSProperties}
      aria-hidden="true"
    >
      <div className="hero-sun" /><div className="hero-horizon" />
      <div className="hero-city hero-city-back" /><div className="hero-city hero-city-front" />
      <div className="hero-road" /><div className="hero-grid-lines" /><div className="hero-light" />
    </div>
  );
}
