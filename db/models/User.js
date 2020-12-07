module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Username already exists",
      },
    },

    password: {
      type: DataTypes.STRING,
    },
  });

  return User;
};
