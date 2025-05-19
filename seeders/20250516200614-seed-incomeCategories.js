"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("IncomeCategories", [
      {
        name: "K Mijozlardan Tushgan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "N Mijozlardan Tushgan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Boshqa Mijozlardan Tushgan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ichki Almashinuvdan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Boshqa Tushimlar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("IncomeCategories", null, {});
  },
};
