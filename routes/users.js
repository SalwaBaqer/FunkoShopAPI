const { signup } = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/singup", signup);

module.exports = router;
