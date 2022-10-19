import { MongoClient } from "mongodb";
require("dotenv").config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

const dbName = "test";

async function getDodream() {
  await client.connect();

  const db = client.db(dbName);
  const collection = await db.collection("DoDream").find({}).toArray();
  client.close();
  return collection;
}

async function getCpi(id) {
  await client.connect();

  const db = client.db(dbName);
  const collection = await db.collection("GreenCrew").find({ id: id }).toArray();
  client.close();
  return collection;
}

export { getDodream, getCpi };
