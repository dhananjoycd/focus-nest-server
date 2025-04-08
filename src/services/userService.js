const { ObjectId } = require("mongodb");
const { getDB } = require("../server/config");

// datbase create by collection name
async function createDB(user, dbCollection) {
  try {
    const db = getDB();
    const dataCollection = db.collection(dbCollection);

    const result = await dataCollection.insertOne(user);
    return result;
  } catch (error) {
    throw error;
  }
}

async function findDB(dbCollection, condition) {
  const db = getDB();
  return await db.collection(dbCollection).find(condition).toArray();
}

async function findOneDB(dbCollection, id, condition) {
  const db = getDB();
  return await db
    .collection(dbCollection)
    .findOne({ _id: new ObjectId(id), transactionType: condition });
}
async function updateDB(dbCollection, id, updates) {
  const db = getDB();
  const result = await db
    .collection(dbCollection)
    .updateOne({ _id: new ObjectId(id) }, { $set: updates });
  return result;
}

async function deleteDB(dbCollection, id, condition) {
  const db = getDB();
  return db
    .collection(dbCollection)
    .deleteOne({ _id: new ObjectId(id), transactionType: condition });
}

async function dbSearch(dbCollection, query, userID, transactionType) {
  const db = getDB();
  query = query ? query.toLowerCase() : "";
  return await db
    .collection(dbCollection)
    .find({
      uid: userID,
      transactionType: transactionType,
      $or: [
        { source: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
      ],
    })
    .toArray();
}
module.exports = {
  createDB,
  findDB,
  findOneDB,
  updateDB,
  deleteDB,
  dbSearch,
};
