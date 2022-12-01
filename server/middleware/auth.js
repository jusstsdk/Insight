const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next, userType) {
	//get the token from the header if present
	let token = req.headers["x-access-token"] || req.headers["authorization"];
	//if no token found, return response (without going to the next middelware)
	if (!token)
		return res.status(401).send("Access denied. No token provided.");

	token = token.substring(7);

	try {
		//if can verify the token, set req.user and pass to next middleware
		const decoded = jwt.verify(token, process.env.SECRET);
		if (decoded.userType != userType)
			throw new Error("You are not authorized to do this action");
		next();
	} catch (ex) {
		//if invalid token
		res.status(400).send(ex.message);
	}
};
