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
let data;
const connectMongoDB = async () => {
    if (!client) {
        try {
            client = new MongoClient(process.env.MONGODB_CONNECT_URI, options);
            await client.connect();
            console.log('Successfully Connected to MongoDB');
            data = client.db(process.env.DB_NAME);
            console.log('Retrieved Data');
        } catch (error) {
            console.log(error);
        }
    }
    return client;
}
const connectedClientData = () => data;
const connectedClient = () => client;

module.exports = {connectMongoDB, connectedClient, connectedClientData}