const express = require("express");
const {
	getInstructors,
	getInstructor,
	createInstructor,
	deleteInstructor,
	updateInstructor,
} = require("../controllers/instructorController");

const {
	createCourse,
	getCourses,
	searchCourses,
} = require("../controllers/courseController");

const router = express.Router();

// GET all Instructors
router.get("/", getInstructors);

// GET a single Instructor
router.get("/:id", getInstructor);

// Create a new Instructor
router.post("/", createInstructor);

// DELETE an Instructor
router.delete("/:id", deleteInstructor);

// UPDATE an Instructor
router.put("/:id", updateInstructor);

// Create a new Course
router.post("/:id/courses", createCourse);

// View all Courses' Titles given by him/her and search/filter.
router.get("/:id/courses", getCourses);

module.exports = router;
