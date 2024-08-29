// This file contains the API routes for the backend server. It defines the endpoints for
// interacting with the database.

const express = require('express');
const router = express.Router();

const { connectedClientData } = require('./data/database');
require('dotenv').config();
const { ObjectId } = require('mongodb');



// Function to get the required collection from mongodb
const getContentsCollection = () => {

    // Get the data from existing database connection
    const clientData = connectedClientData();
    const contents = clientData.collection('contents');
    return contents;
}

//GET /contents ------------------------

//Get all contents from database and send to client
router.get("/contents", async (req, res) => {
    try {
        const contentsCollection = getContentsCollection();
        const data = await contentsCollection.find({}).toArray();

        // Check if the data is empty
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No contents found" });
        }
        return res.status(200).json(data);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to fetch contents', message: error.message });
    }
});

//POST /contents ------------------------

//Insert contents from client side to database
router.post("/contents", async (req, res) => {
    try {
        const contentsCollection = getContentsCollection();
        let content = req.body;

        // Check if the request body has data to be inserted
        if (!content || Object.keys(content).length < 4) {
            return res.status(400).json({ error: 'Content is empty or required fields are missing' });
        }
        const result = await contentsCollection.insertOne(content);
        console.log("Inserted content: ", content);
        return res.status(201).json({ content });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to add content' });
    }
});

//PUT /contents/:id ---------------------------

//Update contents from database using the content id
router.put("/contents/:id", async (req, res) => {
    try {
        const contentsCollection = getContentsCollection();
        const updatedContent = req.body;

        if (!req.params.id) {
            return res.status(400).json({ error: 'Content ID is required' });
        }
        const result = await contentsCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedContent }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Content not found' });
        }
        res.status(200).json({ result, status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to update content' });
    }
});

//DELETE /contents/:id -------------------------

//Delete a content from database using the content id
router.delete("/contents/:id", async (req, res) => {
    try {
        const contentsCollection = getContentsCollection();
        const result = await contentsCollection.deleteOne({ _id: new ObjectId(req.params.id) });

        // Check if the content is deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Content not found' });
        }
        return res.status(200).json({ message: 'Content deleted', status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to delete content' });
    }
});

module.exports = router;

