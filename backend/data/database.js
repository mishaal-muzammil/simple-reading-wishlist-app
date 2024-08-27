require('dotenv').config();
const {MongoClient, ServerApiVersion} = require('mongodb');

// MongoDB connection options
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

let client;
let data;

// Function to connect to MongoDB
const connectMongoDB = async () => {
    if (!client) {
        try {
            client = new MongoClient(process.env.MONGODB_CONNECT_URI, options);
            await client.connect();
            console.log('Successfully Connected to MongoDB');

            // code to get the default database
            data = client.db(process.env.DB_NAME);
            console.log('Retrieved Data');
        } catch (error) {
            console.log(error);
        }
    }
    return client;
}

//These variables hold the existing connection of the database, 
//so that they can be used without creating a new connection everytime a request is made.
const connectedClientData = () => data;
const connectedClient = () => client;

module.exports = {connectMongoDB, connectedClient, connectedClientData}