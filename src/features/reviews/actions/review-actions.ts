"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/features/auth/lib/session";
import { isValidRating, validateReview } from "../domain/review";
import {
  deleteMemberReview,
  removeMemberRating,
  setMemberRating,
  upsertMemberReview,
} from "../repository/review-repository";

export interface ReviewActionState {
  error?: string;
  success?: string;
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

function gamePath(slug: string) {
  return "/games/" + slug;
}

export async function setRatingAction(formData: FormData) {
  const member = await getCurrentUser();
  if (!member) return;
  const gameId = text(formData, "gameId");
  const slug = text(formData, "slug");
  const score = Number(text(formData, "score"));
  if (!gameId || !slug || !isValidRating(score)) return;
  await setMemberRating(member.id, gameId, score);
  revalidatePath(gamePath(slug));
}

export async function removeRatingAction(formData: FormData) {
  const member = await getCurrentUser();
  if (!member) return;
  const gameId = text(formData, "gameId");
  const slug = text(formData, "slug");
  if (!gameId || !slug) return;
  await removeMemberRating(member.id, gameId);
  revalidatePath(gamePath(slug));
}

export async function saveReviewAction(
  _previous: ReviewActionState,
  formData: FormData,
): Promise<ReviewActionState> {
  const member = await getCurrentUser();
  if (!member) return { error: "Sign in to publish a review." };
  const gameId = text(formData, "gameId");
  const slug = text(formData, "slug");
  const headline = text(formData, "headline").trim();
  const body = text(formData, "body").trim();
  if (!gameId || !slug) return { error: "Game context is missing." };
  const error = validateReview(headline, body);
  if (error) return { error };

  await upsertMemberReview(member.id, gameId, { headline, body });
  revalidatePath(gamePath(slug));
  return { success: "Review published." };
}

export async function deleteReviewAction(formData: FormData) {
  const member = await getCurrentUser();
  if (!member) return;
  const gameId = text(formData, "gameId");
  const slug = text(formData, "slug");
  if (!gameId || !slug) return;
  await deleteMemberReview(member.id, gameId);
  revalidatePath(gamePath(slug));
}
