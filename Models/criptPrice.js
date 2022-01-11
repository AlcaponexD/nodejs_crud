const { DataTypes } = require("sequelize");
const connection = require("../database/database");

const Job = connection.define("cript_prices", {
  // Model attributes are defined here
  symbol: {
    type: DataTypes.STRING
  },
  current_price: {
    type: DataTypes.INTEGER,
  }
});


module.exports = Job;
