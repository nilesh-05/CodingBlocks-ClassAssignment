const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/db");
const User = require("./models/User");

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
			return res.redirect("/");
		})
		.catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server up and running at ${PORT}`));
