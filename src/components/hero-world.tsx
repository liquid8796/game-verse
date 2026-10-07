import type { CSSProperties } from "react";

export function HeroWorld({ accent, imageSrc }: { accent: string; imageSrc?: string }) {
  const style = {
    "--world-accent": accent,
    ...(imageSrc ? { "--hero-image": `url("${imageSrc}")` } : {}),
  } as CSSProperties;

  return (
    <div
      className={imageSrc ? "hero-world hero-world-has-image" : "hero-world"}
      style={style}
      aria-hidden="true"
    >
      {!imageSrc && (
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
