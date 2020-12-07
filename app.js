const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const funkoRoutes = require("./routes/funkos");
const funkoShopRoutes = require("./routes/funkoshop");
const userRoutes = require("./routes/users");
const db = require("./db/models");
const path = require("path");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

const mediaPath = path.join(__dirname, "media");

//routes
app.use("/shops", funkoShopRoutes);
app.use("/funkos", funkoRoutes);
app.use("/media", express.static(mediaPath));
app.use(userRoutes);

//path not found
app.use((req, res) => {
  res.status(404).json({ message: "PATH NOT FOUND" });
});

//handling errors
app.use((err, req, res, next) => {
  res.status(err.status ?? 500);
  res.json({ message: err.message ?? "Internal Server Error" });
});

const run = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
