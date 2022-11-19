import { z } from "zod";
import { Pokemon } from "./Pokemon";

export const createPokemonInput = z.object({
  name: z.string(),
  types: z.array(z.string()),
  abilities: z.array(z.string()),
  url: z.string().url(),
  file: z.instanceof(File),
});

export type CreatePokemonInput = z.infer<typeof createPokemonInput>;

export type CreatePokemonReq = Pick<
  CreatePokemonInput,
  "name" | "types" | "abilities"
> & {
  imgUrl: string;
};

export type CreatePokemonRes = {
  success: boolean;
  payload: Pokemon;
};
