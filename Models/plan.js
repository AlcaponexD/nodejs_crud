const { DataTypes } = require("sequelize");
const connection = require("../database/database");

const Plan = connection.define("plans", {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    AllowNull: false,
  },
  total_wallets: {
    type: DataTypes.INTEGER,
    AllowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE(10,2),
    AllowNull: false,
  }
});


module.exports = Plan;
