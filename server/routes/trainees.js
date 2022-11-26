const express = require("express");
const { createTrainee, requestRefund } = require("../controllers/traineeController");

const router = express.Router();

// POST a new administrator
router.post("/", createTrainee);

router.post("/:traineeId/requestRefund/:courseId", requestRefund);

module.exports = router;
