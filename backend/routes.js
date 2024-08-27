const express = require('express');

const router = express.Router();

//GET /wishlists
router.get("/wishlists", (req, res ) => { 
    res.status(200).json({msg: "GET REQ to /api/wishlists"});
});

//POST /wishlists
router.get("/wishlists", (req, res ) => { 
    res.status(201).json({msg: "POST REQ to /api/wishlists"});
});

//PUT /wishlists/:id
router.get("/wishlists/:id", (req, res ) => { 
    res.status(200).json({msg: "PUT REQ to /api/wishlists"});
});

//DELETE /wishlists/:id
router.get("/wishlists/:id", (req, res ) => { 
    res.status(200).json({msg: "DELETE REQ to /api/wishlists"});
});


module.exports = router;

