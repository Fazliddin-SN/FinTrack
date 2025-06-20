"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

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

// Read all model files and initialize them
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Define associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Set up relationships here
db.Role.hasMany(db.User, { foreignKey: "role_id", as: "users" });
db.User.belongsTo(db.Role, { foreignKey: "role_id", as: "role" });

// Define associations here
db.Income.belongsTo(db.IncomeCategory, {
  foreignKey: "category_id",
  as: "category",
});
db.IncomeCategory.hasMany(db.Income, { foreignKey: "category_id" });

db.Spending.belongsTo(db.SpendingCategory, {
  foreignKey: "category_id",
  as: "category",
});
db.SpendingCategory.hasMany(db.Spending, { foreignKey: "category_id" });

// Define associations here
db.Income.belongsTo(db.IncomeCheck, {
  foreignKey: "checked",
  as: "checkedStatus",
});
db.IncomeCheck.hasMany(db.Income, { foreignKey: "checked" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
