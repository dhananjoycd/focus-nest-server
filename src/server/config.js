const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER_ADMIN}:${process.env.DB_USER_PASS}@focusnest.e6n18.mongodb.net/?retryWrites=true&w=majority&appName=focusnest`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("focusnest"); // Store the database instance
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  } finally {
    //
  }
}

function getDB() {
  if (!db) throw new Error("❌ Database not initialized!");
  return db;
}

module.exports = { connectDB, getDB };
