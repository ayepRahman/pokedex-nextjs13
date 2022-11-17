// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getMongoDb } from "@config/mongodb";
import { pokemonSchema } from "@schemas/Pokemon";
import { handler } from "@utils/api";

export default handler.post(async (req, res) => {
  const body = req?.body || {};
  const name = body?.name;
  const types = body?.types?.map((t: string) => ({ type: { name: t } })) || [];
  const abilities =
    body?.abilities?.map((a: string) => ({ ability: { name: a } })) || [];
  const imgUrl = body?.imgUrl;

  const db = await getMongoDb();
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

  const result = await collection.insertOne(payload);

  return res.json({ success: true, payload });
});
