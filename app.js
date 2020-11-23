const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const funkoRoutes = require("./routes/funkos");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/funkos", funkoRoutes);
//Routes

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
