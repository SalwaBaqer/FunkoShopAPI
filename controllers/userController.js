//db
const { User } = require("../db/models");

const bcrypt = require("bcrypt");

//jwt
const jwt = require("jsonwebtoken");

//keys
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

//Add new user
exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token }); //inside {} aby ashouf something like this {token: jndmdl,dqw,}
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const user = req.user;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token }); //inside {} aby ashouf something like this {token: jndmdl,dqw,}
};
