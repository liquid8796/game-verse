import type { CSSProperties } from "react";

export function HeroWorld({ accent, imageSrc }: { accent: string; imageSrc?: string }) {
  return (
    <div
      className={imageSrc ? "hero-world hero-world-has-image" : "hero-world"}
      style={{ "--world-accent": accent } as CSSProperties}
      aria-hidden="true"
    >
      {imageSrc ? (
        <img
          className="hero-world-image"
          src={imageSrc}
          alt=""
          decoding="async"
          fetchPriority="high"
        />
      ) : (
        <>
          <div className="hero-sun" /><div className="hero-horizon" />
          <div className="hero-city hero-city-back" /><div className="hero-city hero-city-front" />
          <div className="hero-road" />
        </>
      )}
      <div className="hero-grid-lines" /><div className="hero-light" />
    </div>
  );
}
