import { z } from "zod";

const searchPokemonsArgs = z.object({
  qs: z.string(),
  limit: z.number(),
  offset: z.number(),
  order: z.enum(["asc", "desc"]),
});

export type SearchPokemonsArgs = z.infer<typeof searchPokemonsArgs>;
