const express = require("express");
const {
	createTrainee,
	getTrainees,
	getTrainee,
	updateTrainee,
	deleteTrainee,
	payCourse,
	addPaymentMethod,
	deletePaymentMethod,
} = require("../controllers/traineeController");

const router = express.Router();

// POST a new administrator
router.post("/", createTrainee);
// POST a new administrator
router.get("/", getTrainees);
// POST a new administrator
router.get("/:id", getTrainee);
// POST a new administrator
router.put("/:id", updateTrainee);
// POST a new administrator
router.delete("/:id", deleteTrainee);
//pay for a course
router.post("/:tId/courses/:cId/payment", payCourse);
//add a new card to a trainee's payment methods
router.post("/:id/payment", addPaymentMethod);
//delete a card
router.delete("/:id/payment", deletePaymentMethod);

module.exports = router;
