"use client";

import Card from "@components/Card";
import { useSearchPokemons } from "@hooks/api/pokemon";
import { useDebounce } from "@hooks/utils/useDebounce";
import { Pokemon } from "@schemas/Pokemon";
import { TextInput } from "flowbite-react";
import { flatMap } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

export default function PaginatedPokemon() {
  const [qs, setQs] = useState<string>("");
  const debounceQS = useDebounce(qs, 600);
  const router = useRouter();

  const { data, fetchNextPage } = useSearchPokemons(
    { qs: debounceQS },
    {
      refetchOnMount: "always",
    }
  );

  const pokemons: Pokemon[] = useMemo(() => {
    return flatMap(data?.pages, (page: any) => page?.items);
  }, [data]);

  const hasMore = useMemo(
    () => data?.pages?.[data?.pages?.length - 1]?.hasMore || false,
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
      >
        {!pokemons?.length && (
          <Card
            key="not found"
            className="h-[240px] w-full relative flex flex-col justify-center text-center !p-0 hover:shadow-xl"
          >
            Not Found
          </Card>
        )}
        {!!pokemons?.length &&
          pokemons.map((poke, i) => {
            return (
              <Card
                onClick={() => router.push(`/pokemon/${poke?.uid}`)}
                className="relative !p-0 hover:shadow-xl cursor-pointer"
                key={`${poke?.name}+i`}
              >
                <div className="h-[300px] lg:h-[240px] w-full relative">
                  <Image
                    src={poke?.sprites?.front_default}
                    alt={`${poke?.name}+i`}
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
