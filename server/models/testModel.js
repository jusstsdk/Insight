const mongoose = require("mongoose");

const Schema = mongoose.Schema;
function func1(myArray){
	this.result = myArray.length;
	return myArray;
}
const testSchema = new Schema(
	{
		username: String,
		myArray: {
			type: [Number],
			set: func1
		},
		result:{
			type: Number,
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);
