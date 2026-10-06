"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  loginAction,
  signupAction,
  type AuthActionState,
} from "../actions/auth-actions";

const initialState: AuthActionState = {};

export function AuthForm({
  mode,
  next = "/account",
}: {
  mode: "login" | "signup";
  next?: string;
}) {
  const action = mode === "signup" ? signupAction : loginAction;
  const [state, formAction, pending] = useActionState(action, initialState);
  const signup = mode === "signup";

  return (
    <form action={formAction} className="member-auth-form">
      <input type="hidden" name="next" value={next} />
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required placeholder="player@example.com" />
      </label>
      {signup && (
        <>
          <label>
            <span>Username</span>
            <input
              name="username"
              type="text"
              autoComplete="username"
              minLength={3}
              maxLength={24}
              pattern="[a-zA-Z0-9_]+"
              required
              placeholder="night_runner"
            />
          </label>
          <label>
            <span>Display name</span>
            <input
              name="displayName"
              type="text"
              autoComplete="name"
              minLength={2}
              maxLength={40}
              required
              placeholder="Vice City Runner"
            />
          </label>
        </>
      )}
      <label>
        <span>Password</span>
        <input
          name="password"
          type="password"
          autoComplete={signup ? "new-password" : "current-password"}
          minLength={10}
          maxLength={128}
          required
          placeholder={signup ? "10+ characters" : "Your password"}
        />
      </label>
      {state.error && <p className="member-form-message member-form-error" role="alert">{state.error}</p>}
      <button className="button-primary member-submit" type="submit" disabled={pending}>
        {pending ? "Working…" : signup ? "Create account" : "Sign in"}
      </button>
      <p className="member-auth-switch">
        {signup ? "Already in the Verse?" : "New to GameVerse?"}{" "}
        <Link href={signup ? `/login?next=${encodeURIComponent(next)}` : `/signup?next=${encodeURIComponent(next)}`}>
          {signup ? "Sign in" : "Create account"}
        </Link>
      </p>
    </form>
  );
}
