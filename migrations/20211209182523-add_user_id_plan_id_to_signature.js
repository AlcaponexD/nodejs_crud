"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("signatures", "user_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        defaultValue: null,
        after: "expiration_at",
      }),
      queryInterface.addColumn("signatures", "plan_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "plans",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        defaultValue: null,
        after: "user_id",
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("signatures", "user_id"),queryInterface.removeColumn("signatures", "plan_id")]);
  },
};
