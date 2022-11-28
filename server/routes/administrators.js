const express = require("express");
const {
	getAdministrators,
	getAdministrator,
	createAdministrator,
	deleteAdministrator,
	updateAdministrator,
	getRefundRequests,
	refundToWallet,
} = require("../controllers/administratorController");

const router = express.Router();
// Get all Courses with Refunds
router.get("/refunds", getRefundRequests);

// Refund an amount to Trainee's Wallet
router.put("/refunds/:refundId", refundToWallet);

// GET all administrators
router.get("/", getAdministrators);

// GET a single administrator
router.get("/:id", getAdministrator);

// POST a new administrator
router.post("/", createAdministrator);

// DELETE a administrator
router.delete("/:id", deleteAdministrator);

// UPDATE a administrator
router.put("/:id", updateAdministrator);

module.exports = router;
