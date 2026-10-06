"use client";

import { useActionState } from "react";
import {
  deleteReviewAction,
  saveReviewAction,
  type ReviewActionState,
} from "../actions/review-actions";
import type { MemberReview } from "../domain/review";

const initialState: ReviewActionState = {};

export function ReviewForm({
  gameId,
  slug,
  review,
}: {
  gameId: string;
  slug: string;
  review?: MemberReview;
}) {
  const [state, formAction, pending] = useActionState(saveReviewAction, initialState);

  return (
    <div className="review-editor">
      <form action={formAction}>
        <input type="hidden" name="gameId" value={gameId} />
        <input type="hidden" name="slug" value={slug} />
        <label>
          <span>Review headline</span>
          <input
            name="headline"
            minLength={3}
            maxLength={80}
            defaultValue={review?.headline}
            placeholder="What defines your take?"
            required
          />
        </label>
        <label>
          <span>Your review</span>
          <textarea
            name="body"
            minLength={40}
            maxLength={2000}
            defaultValue={review?.body}
            rows={7}
            placeholder="Tell other players what worked, what did not, and who this game is for."
            required
          />
        </label>
        <div className="review-editor-actions">
          <button className="button-primary" type="submit" disabled={pending}>
            {pending ? "Publishing…" : review ? "Update review" : "Publish review"}
          </button>
          {state.error && <p className="member-form-message member-form-error" role="alert">{state.error}</p>}
          {state.success && <p className="member-form-message member-form-success" role="status">{state.success}</p>}
        </div>
      </form>
      {review && (
        <form action={deleteReviewAction} className="review-delete">
          <input type="hidden" name="gameId" value={gameId} />
          <input type="hidden" name="slug" value={slug} />
          <button type="submit">Delete review</button>
        </form>
      )}
    </div>
  );
}
