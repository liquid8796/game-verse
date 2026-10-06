"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hashPassword, verifyPassword } from "../lib/password";
import { endSession, getCurrentUser, startSession } from "../lib/session";
import {
  normalizeEmail,
  normalizeUsername,
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../lib/validation";
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
  updateUserProfile,
  usernameBelongsToAnotherUser,
} from "../repository/auth-repository";

export interface AuthActionState {
  error?: string;
  success?: string;
}

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

function safeNext(value: string) {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/account";
}

export async function signupAction(
  _previous: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = normalizeEmail(value(formData, "email"));
  const username = normalizeUsername(value(formData, "username"));
  const displayName = value(formData, "displayName").trim();
  const password = value(formData, "password");
  const next = safeNext(value(formData, "next"));

  if (!validateEmail(email)) return { error: "Enter a valid email address." };
  if (!validateUsername(username)) {
    return { error: "Username must be 3–24 lowercase letters, numbers, or underscores." };
  }
  if (!validateDisplayName(displayName)) {
    return { error: "Display name must be between 2 and 40 characters." };
  }
  if (!validatePassword(password)) {
    return { error: "Password must be between 10 and 128 characters." };
  }

  if (await findUserByEmail(email)) return { error: "That email is already registered." };
  if (await findUserByUsername(username)) return { error: "That username is already taken." };

  try {
    const user = await createUser({
      id: randomUUID(),
      email,
      username,
      displayName,
      passwordHash: hashPassword(password),
    });
    await startSession(user.id);
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return { error: "That email or username is already in use." };
    }
    throw error;
  }

  redirect(next);
}

export async function loginAction(
  _previous: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = normalizeEmail(value(formData, "email"));
  const password = value(formData, "password");
  const next = safeNext(value(formData, "next"));
  const user = await findUserByEmail(email);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Email or password is incorrect." };
  }

  await startSession(user.id);
  redirect(next);
}

export async function logoutAction() {
  await endSession();
  redirect("/");
}

export async function updateProfileAction(
  _previous: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Your session expired. Sign in again." };

  const username = normalizeUsername(value(formData, "username"));
  const displayName = value(formData, "displayName").trim();
  const bio = value(formData, "bio").trim();

  if (!validateUsername(username)) {
    return { error: "Username must be 3–24 lowercase letters, numbers, or underscores." };
  }
  if (!validateDisplayName(displayName)) {
    return { error: "Display name must be between 2 and 40 characters." };
  }
  if (bio.length > 240) return { error: "Bio must be 240 characters or fewer." };
  if (await usernameBelongsToAnotherUser(username, currentUser.id)) {
    return { error: "That username is already taken." };
  }

  await updateUserProfile(currentUser.id, { username, displayName, bio });
  revalidatePath("/account");
  return { success: "Profile updated." };
}
