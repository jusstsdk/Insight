const express = require("express");
const auth = require("../middleware/auth");
const {
	getAdministrators,
	getAdministrator,
	createAdministrator,
	deleteAdministrator,
	updateAdministrator,
	getRefundRequests,
	refundToWallet,
	getAllCoursesRequests,
	handleCourseRequest,
} = require("../controllers/administratorController");

const router = express.Router();

// middleware
router.use((req, res, next) => {
	auth(req, res, next, 'admin');
});

// Get all Courses with Refunds
router.get("/refunds", getRefundRequests);

// Refund an amount to Trainee's Wallet
router.put("/refunds/:refundId", refundToWallet);

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
