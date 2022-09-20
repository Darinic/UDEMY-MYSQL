const mysql = require("mysql");
const express = require("express");
const { faker } = require("@faker-js/faker");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lalaila",
  database: "join_us",
});

// INSERTING DATA
// var q = 'INSERT INTO users (email) VALUES ("wyatt_the_dog2@gmail.com")';

//   SELECTING DATA
//   var q = 'SELECT COUNT(*) AS total FROM users';

// connection.query( q, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// });

let data = [];
for (let i = 0; i < 500; i++) {
  data.push([faker.internet.email(), faker.date.past()]);
}

let q = "INSERT INTO users (email, created_at) VALUES ?";

connection.query(q, [data], function (err, result) {
  if (err) throw err;
  console.log(result);
});
connection.end();

// console.log(faker.internet.email());

// console.log(faker.date.past());

// console.log(faker.address.city());

// console.log(faker.address.streetAddress());
// console.log(faker.address.city());
// console.log(faker.address.state());

// function generateAddress() {
//     console.log(faker.address.streetAddress());
//     console.log(faker.address.city());
//     console.log(faker.address.state());
// }

// generateAddress();
// generateAddress();
// generateAddress();
