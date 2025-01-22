const express = require("express");
const router = express.Router();
const data = require("../data/data.json");

let index = 0;

router.get("/vehicle", (req, res) => {
    const location = data[index];
    index = (index + 1) % data.length;
    res.json(location);
});

module.exports = router;
