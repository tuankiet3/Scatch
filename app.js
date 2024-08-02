const express = require("express");
const app = express();
const port = 3000;

// import
const path = require("path");
const cookieParser = require("cookie-parser");
// use
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);
app.set("view engine", "ejs");

// [GET] /
app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port);
