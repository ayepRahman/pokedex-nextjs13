/**
 * scrape 151 of og pokemon and insert in db
 */

import { clientPromise } from "@config/mongodb";
import * as fs from "fs";
import path from "path";

// e.g running $ ts-node -P tsconfig-dev <script name>

(async () => {
  const file = fs.readFileSync(path.join(process.cwd(), "data.json"), {
    encoding: "utf-8",
  });

  const data = JSON.parse(file);
  const mappedData = data.map((ele: any) => {
    return {
      uid: ele?.id,
      name: ele?.name,
      types: ele?.types,
      abilities: ele?.abilities,
      sprites: ele?.sprites,
    };
  });

  const client = await clientPromise;
  const db = client.db("test");
  const doc = db.collection("pokemons");
  const res = await doc.insertMany(mappedData);
})();
