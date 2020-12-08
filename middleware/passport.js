const LocalStrategy = require("passport-local").Strategy;

//db
const { User } = require("../db/models");

//hash
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username: username } });
    const userAuthenticate =
      user && (await bcrypt.compare(password, user.password));

    if (userAuthenticate) return done(null, user);
    //done (null << no error)
    else return done(null, false);
  } catch (error) {
    done(error);
  }
});
