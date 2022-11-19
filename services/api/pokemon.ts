import { BASE_API_URL } from "@config/index";
import {
  CreatePokemonReq,
  CreatePokemonRes,
} from "@schemas/CreatePokemonInput";
import { Pokemon } from "@schemas/Pokemon";
import { SearchPokemonsArgs } from "@schemas/SearchPokemonsArgs";
import axios from "axios";

export const getPokemonByUID = async (uid: number): Promise<Pokemon> => {
  const res = await axios({
    url: `${BASE_API_URL}/pokemon/${uid}`,
    method: "GET",
  });

  return res?.data;
};

export const searchPokemons = async ({
  qs = "",
  limit = 10,
  offset = 0,
  order = "asc",
}: SearchPokemonsArgs) => {
  const res = await axios({
    url: `${BASE_API_URL}/pokemon/search?qs=${qs}&limit=${limit}&offset=${offset}&order=${order}`,
    method: "GET",
  });

  return res?.data;
};

export const getPokemonTypes = async () => {
  return await axios({
    url: "https://pokeapi.co/api/v2/type?offset=0&limit=100",
    method: "GET",
  });
};

export const getPokemonAbilities = async () => {
  return await axios({
    url: "https://pokeapi.co/api/v2/ability?offset=0&limit=100",
    method: "GET",
  });
};

export const createPokemon = async (
  args: CreatePokemonReq
): Promise<CreatePokemonRes> => {
  const { name, types, abilities, imgUrl } = args;

  const res = await axios({
    url: `${BASE_API_URL}/pokemon`,
    method: "POST",
    data: {
      name,
      types,
      abilities,
      imgUrl,
    },
  });

  return {
    success: res?.data?.success,
    payload: res?.data?.payload,
  };
};
