import { MongoClient, Collection, ServerApiVersion } from "mongodb";

const uri: string = process.env.MONGODB_URI as string;

function dbConnect(collectionName: string): Collection {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return client.db(process.env.DB_NAME).collection(collectionName);
}

export default dbConnect;
