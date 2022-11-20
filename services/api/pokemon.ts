import { BASE_API_URL } from "@config/index";
import {
  CreatePokemonReq,
  CreatePokemonRes,
} from "@schemas/CreatePokemonInput";
import { Pokemon } from "@schemas/Pokemon";
import { SearchPokemonsArgs } from "@schemas/SearchPokemonsArgs";
import axios from "axios";

export const getPokemonByUID = async (uid: number): Promise<Pokemon> => {
  const res = await axios.get(`${BASE_API_URL}/pokemon/${uid}`);
  return res.data;
};

export const searchPokemons = async ({
  qs = "",
  limit = 10,
  offset = 0,
  order = "asc",
}: SearchPokemonsArgs) => {
  const res = await axios.get(
    `${BASE_API_URL}/search?qs=${qs}&limit=${limit}&offset=${offset}&order=${order}`
  );

  return res.data;
};

export const getPokemonTypes = async () => {
  const res = await axios.get(
    "https://pokeapi.co/api/v2/type?offset=0&limit=100"
  );

  return res.data;
};

export const getPokemonAbilities = async () => {
  const res = axios.get("https://pokeapi.co/api/v2/ability?offset=0&limit=100");
};

export const createPokemon = async (
  args: CreatePokemonReq
): Promise<CreatePokemonRes> => {
  const { name, types, abilities, imgUrl } = args;

  const res = await axios.post(`${BASE_API_URL}/create`, {
    method: "POST",
    body: JSON.stringify({ name, types, abilities, imgUrl }),
  });

  return res.data;
};
