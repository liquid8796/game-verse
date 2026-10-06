"use server";

import { revalidatePath } from "next/cache";
import { requireCurrentUser } from "@/features/auth/lib/session";
import { isLibraryStatus } from "../domain/library";
import {
  removeLibraryEntry,
  setLibraryStatus,
} from "../repository/library-repository";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function revalidateLibrary(slug: string) {
  revalidatePath("/me/library");
  if (slug) revalidatePath("/games/" + slug);
}

export async function setLibraryStatusAction(formData: FormData) {
  const member = await requireCurrentUser("/me/library");
  const gameId = field(formData, "gameId");
  const slug = field(formData, "slug");
  const status = field(formData, "status");
  if (!gameId || !isLibraryStatus(status)) return;

  await setLibraryStatus(member.id, gameId, status);
  revalidateLibrary(slug);
}

export async function removeLibraryEntryAction(formData: FormData) {
  const member = await requireCurrentUser("/me/library");
  const gameId = field(formData, "gameId");
  const slug = field(formData, "slug");
  if (!gameId) return;

  await removeLibraryEntry(member.id, gameId);
  revalidateLibrary(slug);
}
