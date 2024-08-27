const express = require('express');
require('dotenv').config();
const {connectMongoDB } = require('./data/database');

const app = express();
app.use(express.json());

const router = require('./routes');
app.use('/api',router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is Listening on http://localhost:${port}`));

const connectToDB = async () => {
    await connectMongoDB();
}
connectToDB();

