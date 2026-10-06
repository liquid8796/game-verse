import type { Game } from "../domain/game";

export interface GameRepository {
  list(): Promise<Game[]>;
  findBySlug(slug: string): Promise<Game | null>;
}
