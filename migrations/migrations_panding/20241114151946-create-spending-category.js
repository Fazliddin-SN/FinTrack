'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SpendingCategories', {
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

    // Insert initial spending categories
    await queryInterface.bulkInsert('SpendingCategories', [
      { name: 'Kentga chiqqan Pullar', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Enjiga Chiqqan Pullar', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Yuk olib chiqish uchun', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ofes uchun xarajatlar', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Xodimlar Oyliklaridan', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Yusuf xarajatlari', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ichki almashinuvga', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Xisob Raqamdan', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('SpendingCategories');
  }
};
