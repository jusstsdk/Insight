const express = require("express");
const auth = require("../middleware/auth");
const {
	getAdministrators,
	getAdministrator,
	createAdministrator,
	deleteAdministrator,
	updateAdministrator,
} = require("../controllers/administratorController");

const router = express.Router();

// middleware
router.use((req, res, next) => {
	auth(req, res, next, 'admin');
});

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
