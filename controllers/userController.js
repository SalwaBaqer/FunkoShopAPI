const { User } = require("../db/models");
const bcrypt = require("bcrypt");

//Add new user
exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
