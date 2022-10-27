require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const administratorRoutes = require("./routes/administrators");
const instructorRoutes = require("./routes/instructors");
const traineeRoutes = require("./routes/trainees");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
	next();
});

// routes
app.use("/api/administrators", administratorRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/trainees", traineeRoutes);
// endpoints
app.get("/test", async (req, res) => {});

// connect to db
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("connected to database");
		// listen to port
		app.listen(process.env.PORT, () => {
			console.log("listening for requests on port", process.env.PORT);
		});
	})
	.catch((err) => {
		console.log(err);
	});
