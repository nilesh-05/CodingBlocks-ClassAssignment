const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/db");
const User = require("./models/User");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/formpage", (req, res) => {
	res.render("formpage");
});

app.post("/formpage", async (req, res) => {
	var email = await req.body.mail;
	var phone = await Number(req.body.phone);
	var name = await req.body.name;
	var checkInorOut = await req.body.checkInorOut;
	var newCustomer = new User({ name, email, phone, checkInorOut });
	await newCustomer
		.save()
		.then(() => {
			console.log("user saved");
			sendMail(email, checkInorOut);
			return res.redirect("/");
		})
		.catch((err) => console.log(err));
});

const sendMail = (email, checkInorOut) => {
	const sgMail = require("@sendgrid/mail");
	const apiKey = `${process.env.SENDGRID_API_KEY}`;
	// console.log("apiKey -> " + apiKey);
	sgMail.setApiKey(apiKey);
	const msg = {
		to: email, // Change to your recipient
		from: "nilesh0411.cse19@chitkara.edu.in", // Change to your verified sender
		subject: "Sending with SendGrid is Fun",
		text: `Thank you for chosing us. You just ${checkInorOut}. `,
		html: "<strong>and easy to do anywhere, even with Node.js</strong>",
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log("Email sent");
		})
		.catch((error) => {
			console.error(error);
		});
};

app.listen(PORT, () => console.log(`server up and running at ${PORT}`));
