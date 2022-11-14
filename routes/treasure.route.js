const express = require("express");
const {verifyToken} = require("../middleware/authentication");
const {findTreasureBoxes, addTreasureBoxes} = require("../controller/treasure.controller");
const router = new express.Router();


router.get("/geolocation", verifyToken, findTreasureBoxes); // get treasure boxes within range and optional value worth more than the parameter
router.post("/add", verifyToken, addTreasureBoxes); // get treasure boxes within range and optional value worth more than the parameter

module.exports = router