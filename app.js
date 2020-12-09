const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//routes
const funkoRoutes = require("./routes/funkos");
const funkoShopRoutes = require("./routes/funkoshop");
const userRoutes = require("./routes/users");

// Passport Strategies
const { localStrategy, jwtStrategy } = require("./middleware/passport");

//db
const db = require("./db/models");

//path
const path = require("path");

const passport = require("passport");

//app
const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

const mediaPath = path.join(__dirname, "media");

//routes
app.use("/shops", funkoShopRoutes);
app.use("/funkos", funkoRoutes);
app.use("/media", express.static(mediaPath));
app.use(passport.initialize());
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
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
