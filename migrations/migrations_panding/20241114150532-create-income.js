"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Incomes", {
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
      comment: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      part_num: {
        type: Sequelize.INTEGER,
      },
      staff_id: {
        type: Sequelize.INTEGER,
      },
      admin_id: {
        type: Sequelize.INTEGER,
      },
      checked: { type: Sequelize.INTEGER },
      date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Incomes");
  },
};
