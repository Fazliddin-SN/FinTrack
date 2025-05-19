"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("SpendingCategories", [
      {
        name: "Kentga Chiqqan Pullar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Enjiga Chiqqan Pullar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Yuk Olib Chiqish Uchun",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ofes Uchun xarajatlar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Xodimlar Oyliklaridan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Yusuf Xarajatlari",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ichki Almashinuvga",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Xijob Raqamdan",
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
    return queryInterface.bulkDelete("SpendingCategories", null, {});
  },
};
