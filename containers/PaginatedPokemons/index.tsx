"use client";

import { useQuery } from "@tanstack/react-query";
import { searchPokemons } from "services/api/searchPokemons";

export default function PaginatedPokemon() {
  const { data } = useQuery({ queryKey: ["add"], queryFn: searchPokemons });

  console.log("data", data);
  // tanstack query for pagination on the client side

  return <div>PaginatedPokemon</div>;
}
