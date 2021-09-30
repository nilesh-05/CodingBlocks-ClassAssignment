const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
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

app.post("/formpage", (req, res) => {
	var email = req.body.mail;
	var phoneNumber = Number(req.body.phone);
	var name = req.body.name;
	var checkout = req.body.checkout == undefined ? "no" : "yes";
	console.log(email, phoneNumber, name, checkout);
	res.render("index");
});

app.listen(PORT, () => console.log(`server up and running at ${PORT}`));
