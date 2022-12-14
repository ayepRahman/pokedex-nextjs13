"use client";

import Card from "@components/Card";
import { useSearchPokemons } from "@hooks/api/pokemon";
import { useDebounce } from "@hooks/utils/useDebounce";
import { Pokemon } from "@schemas/Pokemon";
import { TextInput } from "flowbite-react";
import { flatMap } from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

export default function PaginatedPokemon() {
  const [qs, setQs] = useState<string>("");
  const router = useRouter();

  const debounceQS = useDebounce(qs, 600);

  const { data, fetchNextPage, isLoading } = useSearchPokemons({
    qs: debounceQS,
  });

  const pokemons: Pokemon[] = useMemo(() => {
    return flatMap(data?.pages, (page: any) => page?.items);
  }, [data]);

  const hasMore = useMemo(
    () => data?.pages[data?.pages?.length - 1]?.hasMore,
    [data]
  );

  return (
    <div className="container mx-auto h-[calc(100vh_-_100px)] mt-4 overflow-auto">
      <TextInput
        className=" w-[342px] mb-4"
        placeholder="Search by name"
        value={qs}
        onChange={(e) => setQs(e.target.value)}
      />

      <InfiniteScroll
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4"
        pageStart={0}
        loadMore={() => fetchNextPage()}
        hasMore={hasMore}
        useWindow={false}
        loader={
          <>
            {Array.from({ length: 10 }, (_, i) => {
              return (
                <Card
                  key={`${i}-loader`}
                  className="animate-pulse  h-[240px] w-full relative flex flex-col justify-center text-center !p-0 hover:shadow-xl overflow-hidden"
                >
                  <div className=" bg-slate-400 h-[300px] lg:h-[240px] w-full relative"></div>
                </Card>
              );
            })}
          </>
        }
      >
        {!pokemons?.length && isLoading && (
          <>
            {Array.from({ length: 20 }, (_, i) => {
              return (
                <Card
                  key={`${i}-loader`}
                  className="animate-pulse  h-[240px] w-full relative flex flex-col justify-center text-center !p-0 hover:shadow-xl overflow-hidden"
                >
                  <div className=" bg-slate-400 h-[300px] lg:h-[240px] w-full relative"></div>
                </Card>
              );
            })}
          </>
        )}

        {!pokemons?.length && !isLoading && (
          <Card className="h-[240px] w-full relative flex flex-col justify-center text-center !p-0 hover:shadow-xl">
            Not Found
          </Card>
        )}
        {!!pokemons?.length &&
          pokemons.map((poke) => {
            return (
              <Card
                onClick={() => router.push(`/pokemon/${poke?.uid}`)}
                className="relative !p-0 hover:shadow-xl cursor-pointer"
                key={poke?.name}
              >
                <div className="h-[300px] lg:h-[240px] w-full relative">
                  <Image
                    src={poke?.sprites?.front_default}
                    alt={poke?.name}
                    fill
                  />
                </div>
                <div className="p-4 text-center">
                  {poke?.name} #{poke?.uid}
                </div>
              </Card>
            );
          })}
      </InfiniteScroll>
    </div>
  );
}
