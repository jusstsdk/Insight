const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Schema = mongoose.Schema;

const administratorSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

administratorSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, userType: "Administrator" },
		process.env.SECRET
	);
	return token;
};

module.exports = mongoose.model("Administrator", administratorSchema);