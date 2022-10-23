const express = require("express");
const {
	getInstructors,
	getInstructor,
	createInstructor,
	deleteInstructor,
	updateInstructor,
} = require("../controllers/instructorController");

const router = express.Router();

// GET all Instructors
router.get("/", getInstructors);

// GET a single Instructor
router.get("/:id", getInstructor);

// POST a new Instructor
router.post("/", createInstructor);

// DELETE an Instructor
router.delete("/:id", deleteInstructor);

// UPDATE an Instructor
router.put("/:id", updateInstructor);

module.exports = router;
