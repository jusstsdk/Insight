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
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-08-01",
  });
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
app.use("/api/corporateTrainees", corporateTrainees);
app.use("/api/courses", courseRoutes);
app.use("/api/reports", reportRoutes);

// endpoints
app.get("/test", async (req, res) => {});


  
  
  
  
  
  app.get("/config", (req, res) => {
	res.send({
	  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	});
  });
  
  app.post("/create-payment-intent", async (req, res) => {
	try {
	  const paymentIntent = await stripe.paymentIntents.create(req.body);
  
	  // Send publishable key and PaymentIntent details to client
	  res.send({
		clientSecret: paymentIntent.client_secret,
	  });
	} catch (e) {
	  return res.status(400).send({
		error: {
		  message: e.message,
		},
	  });
	}
  });

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
