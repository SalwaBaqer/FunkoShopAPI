const express = require("express");
const funkos = require("./funkos");
const cors = require("cors");

const app = express();
app.use(cors());

//Routes
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/funkos", (req, res) => {
  console.log("HELLO");
  res.json(funkos);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
