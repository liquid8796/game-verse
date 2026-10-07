import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand-mark" href="/" aria-label="GameVerse home">
      <span>GAME</span><i aria-hidden="true">/</i><span>VERSE</span>
      {!compact && <small>GAMES & STORIES</small>}
    </Link>
  );
}
