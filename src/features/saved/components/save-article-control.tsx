import {
  saveArticleAction,
  unsaveArticleAction,
} from "../actions/saved-actions";

export function SaveArticleControl({
  articleId,
  slug,
  saved,
}: {
  articleId: string;
  slug: string;
  saved: boolean;
}) {
  return (
    <form action={saved ? unsaveArticleAction : saveArticleAction} className="save-article-control">
      <input type="hidden" name="articleId" value={articleId} />
      <input type="hidden" name="slug" value={slug} />
      <button type="submit" aria-pressed={saved}>
        <span aria-hidden="true">{saved ? "◆" : "◇"}</span>
        {saved ? "Saved to library" : "Save for later"}
      </button>
    </form>
  );
}
