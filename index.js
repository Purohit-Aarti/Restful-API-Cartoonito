const express = require("express");
const app = express();
const port = 8080;

const path = require("path");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/cartoon", (req, res) => {
    let cartoonData = require("./data.json");
    res.render("index.ejs", {cartoonData});
});

app.get("/cartoon/:username", (req, res) => {
    let cartoonData = require("./data.json");
    let {username} = req.params;
    let data = cartoonData[username];
    res.render("user.ejs", {data});
});

app.listen(port, (req, res) => {
    console.log(`Listening to the port ${port}...`);
});