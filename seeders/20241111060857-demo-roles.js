"use strict";
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert("Roles", [
      { role_name: "OWNER", createdAt: new Date(), updatedAt: new Date() },
      { role_name: "USER", createdAt: new Date(), updatedAt: new Date() },
      { role_name: "MANAGER", createdAt: new Date(), updatedAt: new Date() },
      {
        role_name: "ADMINISTRATOR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
