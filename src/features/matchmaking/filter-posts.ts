/** Filters only actual open listings passed in from the server. No synthetic match scores. */
export type SquadFilters = {
  game: string;
  region: string;
  vibe: string;
  skill: string;
  platform: string;
  voice: "all" | "preferred" | "optional";
  minSpots: number;
  search: string;
  sort: "newest" | "oldest" | "openings";
};

type SquadListing = {
  id: string;
  gameId: string;
  game: string;
  title: string;
  description: string;
  owner: string;
  mode: string;
  region: string;
  vibe: string;
  skill: string;
  platform: string;
  mic: boolean;
  slotsLeft: number;
  createdAt: Date | string;
};

export const ALL_SQUADS = "All";

export const DEFAULT_SQUAD_FILTERS: SquadFilters = {
  game: ALL_SQUADS,
  region: ALL_SQUADS,
  vibe: ALL_SQUADS,
  skill: ALL_SQUADS,
  platform: ALL_SQUADS,
  voice: "all",
  minSpots: 1,
  search: "",
  sort: "newest",
};

export function filterSquads<T extends SquadListing>(
  posts: readonly T[],
  filters: SquadFilters,
): T[] {
  const term = filters.search.trim().toLocaleLowerCase();
  return posts
    .filter((post) => {
      if (filters.game !== ALL_SQUADS && post.gameId !== filters.game) return false;
      if (filters.region !== ALL_SQUADS && post.region !== filters.region) return false;
      if (filters.vibe !== ALL_SQUADS && post.vibe !== filters.vibe) return false;
      if (filters.skill !== ALL_SQUADS && post.skill !== filters.skill) return false;
      // A cross-play lobby is accessible from any selected device.
      if (filters.platform !== ALL_SQUADS && post.platform !== filters.platform && post.platform !== "Cross-play") return false;
      if (filters.voice === "preferred" && !post.mic) return false;
      if (filters.voice === "optional" && post.mic) return false;
      if (post.slotsLeft < filters.minSpots) return false;
      if (!term) return true;
      return [post.title, post.game, post.description, post.mode, post.platform, post.owner]
        .some((field) => field.toLocaleLowerCase().includes(term));
    })
    .sort((a, b) => {
      if (filters.sort === "openings" && a.slotsLeft !== b.slotsLeft) {
        return b.slotsLeft - a.slotsLeft;
      }
      const dateDiff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      const ordering = filters.sort === "oldest" ? -dateDiff : dateDiff;
      return ordering || a.id.localeCompare(b.id);
    });
}
