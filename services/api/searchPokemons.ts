import { BASE_API_URL } from "@config/index";
import { fetcher } from "@utils/fetcher";

export const searchPokemons = async () => {
  return fetcher(`${BASE_API_URL}/searchPokemons`);
};
