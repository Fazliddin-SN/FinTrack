"use strict";
const { Model, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Income.init(
    {
      amount: DataTypes.DECIMAL,
      category_id: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      usd_cash: DataTypes.DECIMAL,
      uzs_cash: DataTypes.DECIMAL,
      card: DataTypes.DECIMAL,
      account: DataTypes.DECIMAL,
      adminId: DataTypes.INTEGER,
      staff_id: DataTypes.INTEGER,
      part_num: DataTypes.STRING,
      comment: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Income",
    }
  );
  return Income;
};
