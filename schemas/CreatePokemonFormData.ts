import { z } from "zod";

export const createPokemonFormDataSchema = z.object({
  name: z.string().min(4).max(20),
  types: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .nonempty({
      message: "Please select at least 1 type.",
    }),
  abilties: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .nonempty({
      message: "Please select at least 1 ability.",
    }),
  url: z.string().min(1).url(),
  file: z.instanceof(File),
});

export type CreatePokemonFormData = z.infer<typeof createPokemonFormDataSchema>;
export const CreatePokemonFormDataEnum = createPokemonFormDataSchema.keyof();
