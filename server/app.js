const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());
app.use(function (error, request, response, next) {
  console.log("Error handler: ", error);

  // Send an error message to the user.
  response.status(500).json({ error: error.message });

  // Optionally log the request options so you can analyze it later.
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "eggboardDB",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

//CREATE
/* app.get("/throw", function (req, res) {
  throw new Error("BROKEN"); // Express will catch this on its own.
}); */

app.post("/newpost", (req, res) => {
  let post = req.body;
  let sql = "INSERT INTO posts SET ?";
  db.query(sql, post, (err, result, next) => {
    if (err) {
      res.status("400").send(err.sqlMessage);
    } else {
      console.log(result);
      res.send("success in adding post");
    }
  });
});

app.get("/posts", (req, res) => {
  let sql = "SELECT * FROM posts";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(process.env.PORT || "5000", () => {
  console.log(`listening on port:  ${process.env.PORT || "5000"}`);
});
