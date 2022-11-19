"use client";

import Button from "@components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full border-b shadow-lg py-4 bg-slate-100 h-[74px]">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          className="cursor-pointer text-md lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600
        "
          href="/"
        >
          Pokedex | Nextjs13
        </Link>

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
