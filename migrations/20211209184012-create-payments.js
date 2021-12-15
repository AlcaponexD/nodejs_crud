"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("payments", {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      price: {
        type: DataTypes.DOUBLE(10, 2),
      },
      method: {
        type: DataTypes.STRING,
      },
      payload: {
        type: DataTypes.TEXT,
      },
      log: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM(["paid", "failed", "pending"]),
      },
      updatedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("payments");
  },
};
