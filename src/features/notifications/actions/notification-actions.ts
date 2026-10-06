"use server";

import { revalidatePath } from "next/cache";
import { requireCurrentUser } from "@/features/auth/lib/session";
import {
  markAllNotificationsRead,
  markNotificationRead,
} from "../repository/notification-repository";

export async function markNotificationReadAction(formData: FormData) {
  const member = await requireCurrentUser("/me/notifications");
  const notificationId = String(formData.get("notificationId") ?? "");
  if (!notificationId) return;
  await markNotificationRead(member.id, notificationId);
  revalidatePath("/me/notifications");
  revalidatePath("/", "layout");
}

export async function markAllNotificationsReadAction() {
  const member = await requireCurrentUser("/me/notifications");
  await markAllNotificationsRead(member.id);
  revalidatePath("/me/notifications");
  revalidatePath("/", "layout");
}
