'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('IncomeCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Insert initial income categories
    await queryInterface.bulkInsert('IncomeCategories', [
      { name: 'K Mijozlardan Tushgan', createdAt: new Date(), updatedAt: new Date() },
      { name: 'N Mijozlardan Tushgan', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Boshqa Mijozlardan Tushgan', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ichki Almashinuvdan', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Boshqa tushimlar', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('IncomeCategories');
  }
};
