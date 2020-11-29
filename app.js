const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const funkoRoutes = require("./routes/funkos");
const db = require("./db/models");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
//routes
app.use("/funkos", funkoRoutes);

//path not found
app.use((req, res) => {
  res.status(404).json({ message: "PATH NOT FOUND" });
});

app.use((err, req, res, next) => {
  res.status(err.status ?? 500);
  res.json({ message: err.message ?? "Internal Server Error" });
});

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
