const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
		{ _id: this._id, userType: "admin" },
		process.env.SECRET
	);
	return token;
};

administratorSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

module.exports = mongoose.model("Administrator", administratorSchema);