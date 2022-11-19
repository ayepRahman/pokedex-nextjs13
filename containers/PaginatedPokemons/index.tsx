"use client";

import { searchPokemons } from "@services/api/pokemon";
import { useQuery } from "@tanstack/react-query";

export default function PaginatedPokemon() {
  const { data } = useQuery({ queryKey: ["add"], queryFn: searchPokemons });

  console.log("data", data);
  // tanstack query for pagination on the client side

  return <div>PaginatedPokemon</div>;
}
