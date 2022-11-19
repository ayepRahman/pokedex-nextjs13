import { z } from "zod";

const MAX_FILE_SIZE = 8388608;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
  abilities: z
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
  file: z
    .any()
    .refine((file) => {
      return !!file;
    }, "Image is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 8MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export type CreatePokemonFormData = z.infer<typeof createPokemonFormDataSchema>;
export const CreatePokemonFormDataEnum = createPokemonFormDataSchema.keyof();
