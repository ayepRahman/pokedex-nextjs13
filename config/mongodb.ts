import { MONGO_DB_URI } from "@config/index";
import { MongoClient } from "mongodb";

const uri: string = MONGO_DB_URI;

const getMongoDb = async () => {
  const client = new MongoClient(uri);
  const clientPromise = await client.connect();
  return clientPromise.db();
};

export { getMongoDb };
