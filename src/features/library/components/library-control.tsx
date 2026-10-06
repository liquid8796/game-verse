import {
  removeLibraryEntryAction,
  setLibraryStatusAction,
} from "../actions/library-actions";
import {
  formatLibraryStatus,
  libraryStatuses,
  type LibraryStatus,
} from "../domain/library";

export function LibraryControl({
  gameId,
  slug,
  status,
  compact = false,
}: {
  gameId: string;
  slug: string;
  status?: LibraryStatus;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "library-control library-control-compact" : "library-control"}>
      <div className="library-control-head">
        <span>My library</span>
        <strong>{status ? formatLibraryStatus(status) : "Not added"}</strong>
      </div>
      <div className="library-status-actions">
        {libraryStatuses.map((option) => (
          <form action={setLibraryStatusAction} key={option}>
            <input type="hidden" name="gameId" value={gameId} />
            <input type="hidden" name="slug" value={slug} />
            <input type="hidden" name="status" value={option} />
            <button
              type="submit"
              className={status === option ? "is-active" : ""}
              aria-pressed={status === option}
            >
              {formatLibraryStatus(option)}
            </button>
          </form>
        ))}
        {status && (
          <form action={removeLibraryEntryAction}>
            <input type="hidden" name="gameId" value={gameId} />
            <input type="hidden" name="slug" value={slug} />
            <button type="submit" className="library-remove">Remove</button>
          </form>
        )}
      </div>
    </div>
  );
}
