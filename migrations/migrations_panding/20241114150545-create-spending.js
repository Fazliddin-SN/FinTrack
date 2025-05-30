"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Spendings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DECIMAL,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      usd_cash: {
        type: Sequelize.DECIMAL,
      },
      uzs_cash: {
        type: Sequelize.DECIMAL,
      },
      card: {
        type: Sequelize.DECIMAL,
      },
      account: {
        type: Sequelize.DECIMAL,
      },
      staff_id: {
        type: Sequelize.INTEGER,
      },
      admin_id: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Spendings");
  },
};
