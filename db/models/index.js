"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//relations
//Shop has many funkos
db.FunkoShop.hasMany(db.Funko, {
  as: "funkos",
  foreignKey: { fieldName: "funkoShopId", allowNull: false },
});
//funko belong to one shop only
db.Funko.belongsTo(db.FunkoShop, {
  as: "funkoShop",
  foreignKey: { fieldName: "funkoShopId" },
});

db.User.hasMany(db.Order, { as: "orders", foreignKey: "userId" });
db.FunkoShop.belongsTo(db.User, { as: "user" });

db.Order.belongsToMany(db.Funko, {
  through: db.OrderItem,
  foreignKey: "orderId",
});
db.Funko.belongsToMany(db.Order, {
  through: db.OrderItem,
  foreignKey: "funkoId",
});

module.exports = db;
