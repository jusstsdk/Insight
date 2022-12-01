require("dotenv").config();
const auth = require("./middleware/auth");
const express = require("express");
const mongoose = require("mongoose");
const administratorRoutes = require("./routes/administrators");
const instructorRoutes = require("./routes/instructors");
const traineeRoutes = require("./routes/trainees");
const corporateTrainees = require("./routes/corporateTrainees");
const courseRoutes = require("./routes/courses");
const reportRoutes = require("./routes/reports");
const usersRoute = require("./routes/users");
const cors = require("cors");

// express app
const app = express();

app.use(cors());

// middleware
app.use(express.json());

// routes
app.use("/api/users", usersRoute);
app.use("/api/administrators", administratorRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/trainees", traineeRoutes);
app.use("/api/corprateTrainee", corporateTrainees);
app.use("/api/courses", courseRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/corporateTrainees", corporateTraineeRoutes);

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
