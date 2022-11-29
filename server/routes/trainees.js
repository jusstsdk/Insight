const express = require("express");

const {
	createTrainee,
	getTrainees,
	getTrainee,
	updateTrainee,
	deleteTrainee,
	subscribeTraineeToCourse,
	requestRefund,
} = require("../controllers/traineeController");

const router = express.Router();

router.post("/", createTrainee);

router.get("/", getTrainees);

router.get("/:id", getTrainee);

router.put("/:id", updateTrainee);

router.delete("/:id", deleteTrainee);

router.post("/:traineeId/requestRefund/courses/:courseId", requestRefund);

module.exports = router;
