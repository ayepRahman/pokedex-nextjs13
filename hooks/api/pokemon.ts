import {
  CreatePokemonInput,
  CreatePokemonRes,
} from "@schemas/CreatePokemonInput";
import { sumBy } from "lodash";

import { SearchPokemonRes } from "@schemas/SearchPokemonRes";
import { SearchPokemonsArgs } from "@schemas/SearchPokemonsArgs";
import {
  createPokemon,
  getPokemonAbilities,
  getPokemonTypes,
  searchPokemons,
} from "@services/api/pokemon";
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { removeAllSpacing } from "@utils/string";
import axios from "axios";

/**
 * @desc - A hook query function to fetch pokemon abilities
 * @returns { name: string, url: string }[]
 */
export const useGetPokemonAbilities = (
  options?: UseQueryOptions<{ name: string; url: string }[]>
) => {
  return useQuery({
    queryKey: ["getPokemonAbilities"],
    queryFn: async () => {
      const res = await getPokemonAbilities();
      return res?.data?.results || [];
    },
    ...options,
  });
};

/**
 * @desc - A hook query function to fetch pokemon types
 * @returns { name: string, url: string }[]
 */
export const useGetPokemonTypes = (
  options?: UseQueryOptions<{ name: string; url: string }[]>
) => {
  return useQuery({
    queryKey: ["getPokemonTypes"],
    queryFn: async () => {
      const res = await getPokemonTypes();
      return res?.data?.results || [];
    },
    ...options,
  });
};

/**
 * @desc - A hook mutation function to create pokemon
 * @returns { success: boolean }
 */
export const useCreatePokemon = (
  options?: UseMutationOptions<CreatePokemonRes, Error, CreatePokemonInput>
) => {
  return useMutation({
    mutationKey: ["createPokemon"],
    mutationFn: async ({ name, types, abilities, url, file }) => {
      const fileName = removeAllSpacing(file?.name || "");

      const options = {
        headers: {
          "Content-Type": file.type,
          "Access-Control-Allow-Origin": "*",
        },
      };

      await axios.put(url, file, options);

      const imgUrl = `https://pokedex-nextjs13.s3.amazonaws.com/${fileName}`;

      const createPokemonRes = await createPokemon({
        name,
        types,
        abilities,
        imgUrl,
      });

      return {
        success: !!createPokemonRes?.success,
        payload: createPokemonRes?.payload,
      };
    },
    ...options,
  });
};

/**
 * @desc - A hook query function to search pokemon
 * @returns { success: boolean }
 */
export const useSearchPokemons = (
  args: Partial<SearchPokemonsArgs>,
  options?: UseInfiniteQueryOptions<SearchPokemonRes>
) => {
  return useInfiniteQuery({
    queryKey: ["searchPokemons", args],
    queryFn: async ({ pageParam = 0 }) => {
      return await searchPokemons({
        qs: args?.qs || "",
        limit: args?.limit || 10,
        offset: pageParam,
        order: args?.order || "asc",
      });
    },
    // ...options,
    getNextPageParam: (_, allPages) => {
      const dataLength = sumBy(allPages, (page) => page?.items?.length);
      return dataLength;
    },

    ...options,
  });
};
