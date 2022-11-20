/**
 * @desc - adding an interface until nextjs13 include the default interface for RSC
 */

import Card from "@components/Card";
import { useGetPokemonByUID } from "@hooks/api/pokemon";
import { Pokemon } from "@schemas/Pokemon";
import { getPokemonByUID } from "@services/api/pokemon";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Image from "next/image";

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const queryClient = new QueryClient();
  const uid = 1;

  // @desc - a method that allow us to fetch data on the server
  await queryClient.prefetchQuery(
    ["getPokemonByUID", uid],
    async () => await getPokemonByUID(uid)
  );

  return {
    props: {
      /**
       * @desc we than pass the dehydrate queryClient object as props
       * and than in the _app.tsx we hydrate the object
       */
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function PokemonDetails(props: PokemonDetailsProps) {
  const { data: pokemon } = useGetPokemonByUID(1);

  console.log("PokemonDetails", pokemon);

  if (!pokemon) return null;

  return (
    <div
      key={`${pokemon.name}-details`}
      className="container mx-auto px-4 my-5 flex flex-col h-screen justify-center"
    >
      <Card className="flex flex-col mx-auto w-full max-w-[700px] lg:flex-row justify-between gap-4">
        <div className="rounded-md mx-auto text-center flex-shrink-0 flex-grow-0 basis-[300px] w-[300px] h-[300px] border relative overflow-hidden">
          <Image
            className="z-0"
            src={pokemon?.sprites?.front_default}
            alt={`${pokemon.name}-details-img`}
            fill
          />
        </div>
        <div className="flex-auto">
          <div className="text-2xl mb-8">
            <span className=" font-bold">{pokemon?.name}</span>{" "}
            <span>#{pokemon?.uid}</span>
          </div>

          <div className="text-md font-bold mb-2">Types</div>
          <div className="flex flex-wrap gap-2">
            {pokemon?.types?.map((a) => {
              return (
                <div
                  className=" rounded-full bg-slate-400 px-3 py-1 text-white flex flex-col justify-center align-middle text-[10px]"
                  key={a?.type?.name}
                >
                  {a?.type?.name}
                </div>
              );
            })}
          </div>

          <div className="text-md font-bold mb-2 mt-4">Abilities</div>
          <div className="flex flex-wrap gap-2">
            {pokemon?.abilities?.map((a) => {
              return (
                <div
                  className=" rounded-full bg-slate-400 px-3 py-1 text-white flex flex-col justify-center align-middle text-[10px]"
                  key={a?.ability?.name}
                >
                  {a?.ability?.name}
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
