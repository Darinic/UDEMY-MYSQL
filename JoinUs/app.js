const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lalaila",
  database: "join_us",
});

app.get("/", function (req, res) {
  //FIND COUNT OF USERS IN DB
  //RESPOND WITH THAT COUNT
  connection.query(
    "SELECT COUNT(*) AS count FROM users",
    function (err, results) {
      if (err) throw err;
      let count = results[0].count;
    //   res.send("We have " + count + " users in our db");
    res.render("home", {data: count});
    }
  );
});

app.get("/joke", function (req, res) {
  let joke =
    "What do you call a dog that does magic tricks? A labracadabrador.";
  res.send(joke);
});

app.get("/random_num", function (req, res) {
  let num = Math.floor(Math.random() * 10) + 1;
  res.send("Your lucky number is " + num);
});

app.post("/register", function (req, res) {
    let person =  {email: req.body.email};
    connection.query("INSERT INTO users SET ?", person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});

app.listen(3000, function () {
  console.log("App listening on port 8080!");
});
