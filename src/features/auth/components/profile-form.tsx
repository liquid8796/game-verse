"use client";

import { useActionState } from "react";
import { updateProfileAction, type AuthActionState } from "../actions/auth-actions";
import type { Member } from "../domain/member";

const initialState: AuthActionState = {};

export function ProfileForm({ member }: { member: Member }) {
  const [state, formAction, pending] = useActionState(updateProfileAction, initialState);

  return (
    <form action={formAction} className="member-profile-form">
      <div className="member-form-grid">
        <label>
          <span>Display name</span>
          <input name="displayName" defaultValue={member.displayName} minLength={2} maxLength={40} required />
        </label>
        <label>
          <span>Username</span>
          <div className="member-input-prefix">
            <i aria-hidden="true">@</i>
            <input
              name="username"
              defaultValue={member.username}
              minLength={3}
              maxLength={24}
              pattern="[a-zA-Z0-9_]+"
              required
            />
          </div>
        </label>
      </div>
      <label>
        <span>Bio</span>
        <textarea name="bio" defaultValue={member.bio} maxLength={240} rows={5} placeholder="What do you play, chase, or master?" />
      </label>
      <div className="member-profile-actions">
        <button className="button-primary member-submit" type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save profile"}
        </button>
        {state.error && <p className="member-form-message member-form-error" role="alert">{state.error}</p>}
        {state.success && <p className="member-form-message member-form-success" role="status">{state.success}</p>}
      </div>
    </form>
  );
}
