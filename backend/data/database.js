require('dotenv').config();
const {MongoClient, ServerApiVersion} = require('mongodb');

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

let client;
const connectToDB = async () => {
    try {
        client = new MongoClient(process.env.MONGO_DB_CONNECT_URI, options);
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

const connectedClient = () => client;

module.exports = {connectToDB, connectedClient}