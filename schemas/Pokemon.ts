import { z } from "zod";

export const pokemonSchema = z.object({
  uid: z.number(),
  name: z.string().min(3).max(20),
  types: z.array(
    z.object({
      type: z.object({
        name: z.string().min(1).max(20),
        url: z.optional(z.string()),
      }),
    })
  ),
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string().min(1),
        url: z.optional(z.string()),
      }),
    })
  ),
  sprites: z.object({
    front_default: z.string().url(),
  }),
});

export type Pokemon = z.infer<typeof pokemonSchema>;
