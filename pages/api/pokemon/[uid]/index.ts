// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getMongoDb } from "@config/mongodb";
import { handler } from "@utils/api";
import { z } from "zod";

const pokemonUID = z.number();

/**
 * A POST endpoint to create pokemon
 * @body { name: string, type: string[], abilities: string[], imgUrl: string  }
 * @returns { success: boolean, payload: Pokemon }
 */
export default handler.get(async (req, res) => {
  const query = req?.query || {};
  const uid = query?.uid ? Number(query?.uid) : undefined;
  pokemonUID.parse(uid);

  const db = await getMongoDb();
  const collection = db.collection("pokemons");
  const pokemonRes = await collection.findOne({
    uid: uid,
  });

  return res.json(pokemonRes);
});
