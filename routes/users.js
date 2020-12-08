const { signup, signin } = require("../controllers/userController");
const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/singup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
