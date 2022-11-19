import { z } from "zod";
import { pokemonSchema } from "./Pokemon";

const searchPokemonResSchema = z.object({
  items: z.array(pokemonSchema),
  total: z.number(),
  hasMore: z.boolean(),
});

export type SearchPokemonRes = z.infer<typeof searchPokemonResSchema>;
