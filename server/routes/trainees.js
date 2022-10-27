const express = require("express");
const { createTrainee } = require("../controllers/traineeController");

const router = express.Router();

// POST a new administrator
router.post("/", createTrainee);

module.exports = router;
