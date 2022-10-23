const express = require("express");
const {
	getInstructors,
	getInstructor,
	createInstructor,
	deleteInstructor,
	updateInstructor,
	createCourse,
	viewTitles,
	filterCourses,
	searchCourses,
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

// Create a new Course
router.post("/:id/courses", createCourse);

// View all Courses' Titles given by him/her.
router.get("/:id/courses/titles", viewTitles);

// Filter the courses given by him/her based on a subject or price
router.get("/:id/courses", filterCourses);

// Search for a course given by him/her based on course title or subject or instructor
router.get("/:id/courses/search", searchCourses);

module.exports = router;
