"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
      "Incomes", // name of the table
      "userId", // new column name
      {
        type: Sequelize.INTEGER,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Incomes", "userId");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
