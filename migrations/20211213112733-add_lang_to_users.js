"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("users", "lang", {
        type: Sequelize.STRING,
        defaultValue: 'pt-br',
        after: "active",
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("users", "lang")]);
  },
};
