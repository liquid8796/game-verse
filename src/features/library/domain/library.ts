import type { Game } from "@/features/games/domain/game";

export const libraryStatuses = [
  "playing",
  "completed",
  "backlog",
  "wishlist",
  "dropped",
] as const;

export type LibraryStatus = (typeof libraryStatuses)[number];

export interface LibraryEntry {
  game: Game;
  status: LibraryStatus;
  addedAt: Date;
  updatedAt: Date;
}

export function isLibraryStatus(value: string): value is LibraryStatus {
  return libraryStatuses.includes(value as LibraryStatus);
}

export function formatLibraryStatus(status: LibraryStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
