"use server";

import { revalidatePath } from "next/cache";
import { requireCurrentUser } from "@/features/auth/lib/session";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../repository/watchlist-repository";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function revalidateWatchlist(slug: string) {
  revalidatePath("/me/watchlist");
  if (slug) revalidatePath("/games/" + slug);
}

export async function addToWatchlistAction(formData: FormData) {
  const member = await requireCurrentUser("/me/watchlist");
  const gameId = field(formData, "gameId");
  const slug = field(formData, "slug");
  if (!gameId) return;
  await addToWatchlist(member.id, gameId);
  revalidateWatchlist(slug);
}

export async function removeFromWatchlistAction(formData: FormData) {
  const member = await requireCurrentUser("/me/watchlist");
  const gameId = field(formData, "gameId");
  const slug = field(formData, "slug");
  if (!gameId) return;
  await removeFromWatchlist(member.id, gameId);
  revalidateWatchlist(slug);
}
