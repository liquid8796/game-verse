export type GameStatus = "live" | "upcoming" | "released";

export interface Game {
  id: string;
  slug: string;
  title: string;
  deck: string;
  overview?: string;
  genre: string;
  developer: string;
  publisher: string;
  releaseDate: string | null;
  status: GameStatus;
  platforms: string[];
  score: number;
  heat: number;
  accent: string;
  heroVariant: string;
}
