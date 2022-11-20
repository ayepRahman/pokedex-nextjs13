import Card from "@components/Card";
import { useSearchPokemons } from "@hooks/api/pokemon";
import { useDebounce } from "@hooks/utils/useDebounce";
import { Pokemon } from "@schemas/Pokemon";
import { searchPokemons } from "@services/api/pokemon";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { TextInput } from "flowbite-react";
import { flatMap } from "lodash";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "no-cache");

  const queryClient = new QueryClient();

  // @desc - a method that allow us to fetch data on the server
  await queryClient.prefetchQuery(
    ["searchPokemons", { qs: "" }],
    async () =>
      await searchPokemons({
        qs: "",
        limit: 20,
        offset: 0,
        order: "asc",
      })
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

export default function HomePage() {
  const [qs, setQs] = useState<string>("");
  const debounceQS = useDebounce(qs, 600);
  const router = useRouter();

  /**
   * @desc - if the key queryKey matches both on the server & client. React-query will
   * use the cache data instead hence reducing the bandwith on calling an API on the client-side.
   */
  const { data, fetchNextPage, isLoading } = useSearchPokemons(
    {
      qs: debounceQS,
    },
    { refetchOnMount: "always" }
  );

  const pokemons: Pokemon[] = useMemo(() => {
    return flatMap(data?.pages, (page: any) => page?.items);
  }, [data]);

  const hasMore = useMemo(
    () => data?.pages?.[data?.pages?.length - 1]?.hasMore || false,
    [data]
  );

  // console.log("HomePage data", data);
  console.log("HomePage pokemons", pokemons);
  console.log("LOADING", isLoading);

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
