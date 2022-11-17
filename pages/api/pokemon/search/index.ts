// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getMongoDb } from "@config/mongodb";
import { handler } from "@utils/api";

export default handler.get<{
  qs?: string;
  limit?: number;
  offset?: number;
  order?: string; // asc | desc
}>(async (req, res) => {
  const query = req?.query || {};
  const qs = query?.qs || "";
  const limit = query?.limit || 10;
  const offset = query?.offset || 0;
  const order = query?.order || "asc";

  const db = await getMongoDb();
  const collection = db.collection("pokemons");
  const total = await collection.countDocuments();

  // .find({ $text: {$search: serachText}})

  let filter: any = {};
  if (!!qs) {
    filter = {
      $text: { $search: qs },
    };
  }

  console.log("filter", filter);

  const data = await collection
    .find(filter)
    .sort({ _id: order === "asc" ? 1 : -1 })
    .skip(+offset)
    .limit(+limit)
    .toArray();

  // console.log("[data]", data);

  return res.json({ items: data, total });
});
