const { DataTypes } = require("sequelize");
const connection = require("../database/database");

const Job = connection.define("cript_prices", {
  // Model attributes are defined here
  symbol: {
    type: DataTypes.STRING,
    unique: true,
  },
  current_price: {
    type: DataTypes.INTEGER,
  },
  name: { 
    type : DataTypes.STRING
  }
});


module.exports = Job;
