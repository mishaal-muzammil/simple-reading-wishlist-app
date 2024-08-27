require('dotenv').config();
const express = require('express');
const {connectToDB, connectedClient } = require('./data/database');
const app = express();
const router = require('./routes');
const port = process.env.PORT || 5000;

app.use('/api', router);

app.listen(port, () => console.log(`Server is Listening on http://localhost:${port}`));

const connectMongoDB = async () => {
    await connectToDB();
    console.log('Successfully Connected to MongoDB');
}
connectMongoDB();





