"use server";

import { revalidatePath } from "next/cache";
import { requireCurrentUser } from "@/features/auth/lib/session";
import {
  saveArticle,
  unsaveArticle,
} from "../repository/saved-repository";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function refresh(slug: string) {
  revalidatePath("/me/saved");
  if (slug) revalidatePath("/articles/" + slug);
}

export async function saveArticleAction(formData: FormData) {
  const member = await requireCurrentUser("/me/saved");
  const articleId = field(formData, "articleId");
  const slug = field(formData, "slug");
  if (!articleId) return;
  await saveArticle(member.id, articleId);
  refresh(slug);
}

export async function unsaveArticleAction(formData: FormData) {
  const member = await requireCurrentUser("/me/saved");
  const articleId = field(formData, "articleId");
  const slug = field(formData, "slug");
  if (!articleId) return;
  await unsaveArticle(member.id, articleId);
  refresh(slug);
}
