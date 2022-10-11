const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

const dbName = "test";

async function dodream() {
  await client.connect();

  const db = client.db(dbName);
  const collection = await db.collection("DoDream").find({}).toArray();
  client.close();
  return collection;
}

module.exports = dodream;
