import type { CSSProperties } from "react";

export function HeroWorld({ accent, imageSrc }: { accent: string; imageSrc?: string }) {
  const style = {
    "--world-accent": accent,
  } as CSSProperties;

  return (
    <div
      className={imageSrc ? "hero-world hero-world-has-image" : "hero-world"}
      style={style}
      aria-hidden="true"
    >
      {imageSrc && (
        // Keep the hero on a dedicated image element instead of a CSS background.
        // This avoids browser/compositor reuse of stale background-image textures.
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hero-world-image" src={imageSrc} alt="" />
      )}
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
