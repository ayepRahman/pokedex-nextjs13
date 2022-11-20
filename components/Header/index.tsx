"use client";

import Button from "@components/Button";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full border-b shadow-lg py-4 bg-slate-100 h-[74px]">
      <div className="container mx-auto flex items-center justify-between">
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer text-md lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Pokedex | Nextjs13
        </div>

        <Button
          size="sm"
          onClick={() => router.push("/pokemon/create")}
          gradientDuoTone="purpleToPink"
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default Header;
