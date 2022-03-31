"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("cript_prices", "current_price", {
        type: Sequelize.DECIMAL(17, 8),
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("cript_prices", "current_price", {
        type: Sequelize.DECIMAL(17, 8),
      }),
    ]);
  },
};
