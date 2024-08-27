//This is the entry point of the backend server.

const express = require('express');
require('dotenv').config();
const {connectMongoDB } = require('./data/database');

const app = express();

//A Middleware is used here to convert json data from requests
app.use(express.json());

const router = require('./routes');
app.use('/api',router);

//The server listens to requests on port 5000 or the port mentioned in the .env file.
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is Listening on http://localhost:${port}`));

//An async function that uses connectMongoDB function to connect to the database.
const connectToDB = async () => {
    await connectMongoDB();
}
connectToDB();