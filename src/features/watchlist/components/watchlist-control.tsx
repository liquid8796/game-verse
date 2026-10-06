import {
  addToWatchlistAction,
  removeFromWatchlistAction,
} from "../actions/watchlist-actions";

export function WatchlistControl({
  gameId,
  slug,
  watched,
  compact = false,
}: {
  gameId: string;
  slug: string;
  watched: boolean;
  compact?: boolean;
}) {
  const action = watched ? removeFromWatchlistAction : addToWatchlistAction;
  return (
    <form
      action={action}
      className={compact ? "watchlist-control watchlist-control-compact" : "watchlist-control"}
    >
      <input type="hidden" name="gameId" value={gameId} />
      <input type="hidden" name="slug" value={slug} />
      <span>
        <i aria-hidden="true">{watched ? "●" : "○"}</i>
        {watched ? "Watching this signal" : "Follow game updates"}
      </span>
      <button type="submit">{watched ? "Unwatch" : "Watch game"}</button>
    </form>
  );
}
