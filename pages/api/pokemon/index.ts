// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { clientPromise } from "@config/mongodb";
import { CreatePokemonRes } from "@schemas/CreatePokemonInput";
import { pokemonSchema } from "@schemas/Pokemon";
import { handler } from "@utils/api";
import { NextApiRequest } from "next";

/**
 * A POST endpoint to create pokemon
 * @body { name: string, type: string[], abilities: string[], imgUrl: string  }
 * @returns { success: boolean, payload: Pokemon }
 */
export default handler.post<NextApiRequest, CreatePokemonRes>(
  async (req, res) => {
    const body = req?.body || {};
    const name = body?.name;
    const types =
      body?.types?.map((t: string) => ({ type: { name: t } })) || [];
    const abilities =
      body?.abilities?.map((a: string) => ({ ability: { name: a } })) || [];
    const imgUrl = body?.imgUrl;

    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("pokemons");
    const total = await collection.countDocuments();

    const payload = {
      uid: total + 1,
      name,
      types,
      abilities,
      sprites: {
        front_default: imgUrl,
      },
    };

    /**
     * @dev - validating incoming data
     */
    pokemonSchema.parse(payload);

    await collection.insertOne(payload);

    return res.json({ success: true, payload });
  }
);
