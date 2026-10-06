import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="error-screen">
      <div className="shell">
        <p className="page-kicker">404 · Signal lost</p>
        <h1>Out of bounds.</h1>
        <p>
          That page is not in the current GameVerse map. Jump back to the
          game index and pick up a live signal.
        </p>
        <Link className="button-primary" href="/games">
          Browse games
        </Link>
      </div>
    </main>
  );
}
