"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        displayName: "Lewis Hamilton",
        email: "lewishamilton@gmail.com",
        password: "123456",
        createdAt: new Date("2011-08-01T19:58:00.000Z"),
        updatedAt: new Date("2011-08-01T19:58:51.000Z"),
      },
      {
        id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        displayName: "Michael Schumacher",
        email: "MichaelSchumacher@gmail.com",
        password: "123456",
        createdAt: new Date("2011-08-01T19:58:00.000Z"),
        updatedAt: new Date("2011-08-01T19:58:51.000Z"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
