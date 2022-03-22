'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("cript_prices", "name", {
        type: Sequelize.STRING,
        after: "id",
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("cript_prices", "name")]);
  },
};
