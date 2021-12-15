"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("payments", "user_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        defaultValue: null,
        after: "status",
      }),
      queryInterface.addColumn("payments", "plan_id", {
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
    return Promise.all([queryInterface.removeColumn("payments", "user_id"),queryInterface.removeColumn("payments", "plan_id")]);
  },
};
