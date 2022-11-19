/**
 * @desc - adding an interface until nextjs13 include the default interface for RSC
 */

import Card from "@components/Card";
import { getPokemonByUID } from "@services/api/pokemon";
import Image from "next/image";

interface PokemonDetailsProps {
  params: { uid: string };
}

export default async function PokemonDetails({ params }: PokemonDetailsProps) {
  const { uid } = params;
  const pokemon = await getPokemonByUID(Number(uid));

  if (!pokemon) return null;

  return (
    <div className="container mx-auto px-4 my-5 flex flex-col h-screen justify-center">
      <Card className="flex flex-col mx-auto w-full max-w-[700px] lg:flex-row justify-between gap-4">
        <div className="rounded-md mx-auto text-center flex-shrink-0 flex-grow-0 basis-[300px] w-[300px] h-[300px] border relative overflow-hidden">
          <Image
            className="z-0"
            src={pokemon?.sprites?.front_default}
            alt="img"
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

/**
 * generateStaticParams allow us to generate static pages during build time.
 */
// export async function generateStaticParams() {
//   return Array.from({ length: 150 }, (_, i) => ({
//     uid: (i + 1).toString(),
//   }));
// }
