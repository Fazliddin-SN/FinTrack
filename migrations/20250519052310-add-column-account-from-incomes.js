"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Incomes", "account", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Incomes", "account");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
