const { DataTypes } = require("sequelize");
const connection = require("../database/database");

const Job = connection.define("jobs", {
  // Model attributes are defined here
  type: {
    type: DataTypes.STRING
  },
  data: {
    type: DataTypes.TEXT,
  },
  priority: {
    type: DataTypes.INTEGER,
  },
  date_start: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM(["w", "p", "f", "d"]),
  }
});


module.exports = Job;
