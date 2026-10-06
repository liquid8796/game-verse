import { removeRatingAction, setRatingAction } from "../actions/review-actions";

export function RatingControl({
  gameId,
  slug,
  currentRating,
}: {
  gameId: string;
  slug: string;
  currentRating?: number;
}) {
  return (
    <div className="rating-control">
      <div className="rating-control-head">
        <span>Your rating</span>
        <strong>{currentRating ? currentRating + "/10" : "Not rated"}</strong>
      </div>
      <div className="rating-buttons" aria-label="Rate this game from 1 to 10">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((score) => (
          <form action={setRatingAction} key={score}>
            <input type="hidden" name="gameId" value={gameId} />
            <input type="hidden" name="slug" value={slug} />
            <input type="hidden" name="score" value={score} />
            <button
              type="submit"
              className={currentRating === score ? "is-active" : undefined}
              aria-label={"Rate " + score + " out of 10"}
            >
              {score}
            </button>
          </form>
        ))}
      </div>
      {currentRating && (
        <form action={removeRatingAction} className="rating-remove">
          <input type="hidden" name="gameId" value={gameId} />
          <input type="hidden" name="slug" value={slug} />
          <button type="submit">Clear rating</button>
        </form>
      )}
    </div>
  );
}
