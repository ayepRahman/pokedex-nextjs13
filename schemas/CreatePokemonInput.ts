import { z } from "zod";
import { Pokemon } from "./Pokemon";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createPokemonInput = z.object({
  name: z.string(),
  types: z.array(z.string()),
  abilities: z.array(z.string()),
  url: z.string().url(),
  file: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
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
