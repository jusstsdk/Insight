const express = require("express");
const {
	getAdministrators,
	getAdministrator,
	createAdministrator,
	deleteAdministrator,
	updateAdministrator,
	getAllCoursesRequests,
	handleCourseRequest,
} = require("../controllers/administratorController");

const router = express.Router();

//GET all access requests of all courses
router.get("/requests", getAllCoursesRequests);

//UPDATE request status
router.put("/requests", handleCourseRequest);

//GET all administrators
router.get("/", getAdministrators);

//GET a single administrator
router.get("/:id", getAdministrator);

//POST a new administrator
router.post("/", createAdministrator);

//DELETE a administrator
router.delete("/:id", deleteAdministrator);

//UPDATE a administrator
router.put("/:id", updateAdministrator);

module.exports = router;
