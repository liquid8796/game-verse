"use client";

import { useEffect } from "react";

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("GameVerse route error", error);
  }, [error]);

  return (
    <main id="main" className="error-screen">
      <div className="shell">
        <p className="page-kicker">Signal interrupted</p>
        <h1>Feed offline.</h1>
        <p>
          GameVerse could not load this view. Try the request again; if the
          database is restarting, the signal should recover automatically.
        </p>
        <button className="button-primary" type="button" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
