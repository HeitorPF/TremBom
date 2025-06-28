const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const dbName = "TremBom";

async function connect() {

    if (!url) {
        throw new Error("MongoDB connection URL is not defined");
    }
    if (!dbName) {
        throw new Error("Database name is not defined");
    }

    const client = new MongoClient(url);

    await client.connect();

    const db = client.db(dbName);

    return { db, client };
}

module.exports = { connect }