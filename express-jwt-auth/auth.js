const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const port = 3000;

const users = [
  {
    username: "terra",
    password: "password123admin",
    role: "admin",
  },
  {
    username: "dave",
    password: "password123member",
    role: "member",
  },
];

app.use(bodyParser.json());
const accessTokenSecret = "youraccesstokensecret";

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    const accessToken = jwt.sign(
      { username: user.username },
      accessTokenSecret
    );
    res.json({
      accessToken,
    });
  } else {
    res.send("Username or password incorrect");
  }
});

app.get("/ping", (req, res) => {
  res.send("server jalan");
});

app.listen(port, () => {
  console.log(`Running in port ${port}`);
});
