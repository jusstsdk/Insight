const express = require("express");
const {
	getCorporateTrainees,
	getCorporateTrainee,
	createCorporateTrainee,
	deleteCorporateTrainee,
	updateCorporateTrainee,
} = require("../controllers/corporate-traineeController");

const router = express.Router();

// GET all Corporate_trainees
router.get("/", getCorporateTrainees);

// GET a single Corporate_trainee
router.get("/:id", getCorporateTrainee);

// POST a new Corporate_trainee
router.post("/", createCorporateTrainee);

// DELETE a Corporate_trainee
router.delete("/:id", deleteCorporateTrainee);

// UPDATE a  Corporate_trainee
router.put("/:id", updateCorporateTrainee);

module.exports = router;
