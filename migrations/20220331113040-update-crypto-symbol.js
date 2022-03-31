"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint("cript_prices", {
        fields : ["symbol"],
        type: "unique",
        name: 'cript_prices_symbol_uk',
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('cript_prices', 'cript_prices_symbol_uk')
    ]);
  },
};
