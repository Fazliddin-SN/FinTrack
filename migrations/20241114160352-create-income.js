"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Incomes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "IncomeCategories", // Foreign key to IncomeCategories
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      usd_cash: Sequelize.DECIMAL,
      uzs_cash: Sequelize.DECIMAL,
      card: Sequelize.DECIMAL,
      account: Sequelize.DECIMAL,
      comment: Sequelize.STRING,
      staff_id: Sequelize.INTEGER,
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Foreign key to SpendingCategories
          key: "id",
        },
      },
      part_num: Sequelize.STRING,
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Incomes");
  },
};
