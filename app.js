const express = require("express");
let funkos = require("./funkos");
const cors = require("cors");

const app = express();
app.use(cors());

//Routes
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/funkos", (req, res) => {
  try {
    res.json(funkos);
  } catch (error) {
    console.error("FunkoStore -> fetchFunkos -> error", error);
  }
});

app.delete("/funkos/:funkoId", (req, res) => {
  const { funkoId } = req.params;
  const foundFunko = funkos.find((funko) => funko.id === +funkoId);
  if (foundFunko) {
    funkos = funkos.filter((funko) => funko.id !== +funkoId);
    res.status(204).end();
    console.log("funkos", funkos);
  } else {
    res.status(404).json({ message: "Funko not found" });
  }
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
