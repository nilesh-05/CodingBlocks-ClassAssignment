const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
	express.urlencoded({
		extended: true,
	}),
);

const User = require("./models/schema.js");

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/formpage", (req, res) => {
	res.render("formpage");
});

app.post("/formpage", (req, res) => {
	var email = req.body.mail;
	var checkInorOut = req.body.checkInorOut;

	const result = new User({
		name: req.body.name,
		email: req.body.mail,
		phone: req.body.phone,
		checkInorOut: req.body.checkInorOut,
	});
	result.save();
	const d = new Date();
	const message = {
		to: email,
		from: "nilesh0411.cse19@chitkara.edu.in",
		subject: "Creted By Nilesh",
		html: `<h1>You ${checkInorOut} at The Shopper's Stop at ${d.getHours()}:${d.getMinutes()} </h1>`,
	};

	sgMail
		.send(message)
		.then((res) => {
			console.log("Sent Successfully");
			res.render("index");
		})
		.catch((err) => {
			console.log(err);
		});
});

app.listen(port, () => {
	console.log(`Connected To Port  ${port}`);
});

const DB = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@register.col7h.mongodb.net/register?retryWrites=true&w=majority`;

const connectDB = async () => {
	try {
		await mongoose.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Mongo DB connected");
	} catch (err) {
		console.error(err.message);
	}
};
connectDB();
