import { MONGO_DB_URI } from "@config/index";
import { MongoClient, MongoClientOptions } from "mongodb";

const uri: string = MONGO_DB_URI;
const options: MongoClientOptions = {};

export async function getMongoClient() {
  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentiatlly
   * during API Route usage.
   * https://github.com/vercel/next.js/pull/17666
   */

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    // client.connect() returns an instance of MongoClient when resolved
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}

const getMongoDb = async () => {
  const mongoClient = await getMongoClient();
  return mongoClient.db();
};

const getServerMongoDb = async () => {
  const client = new MongoClient(uri, options);
  const clientPromise = await client.connect();
  return clientPromise.db();
};

export { getMongoDb, getServerMongoDb };
