const { DataTypes } = require("sequelize");
const connection = require("../database/database");

const User = connection.define(
  "users",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
    },
    fb_code: {
      type: DataTypes.STRING,
    },
    google_code: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.ENUM("1", "0"),
    },
    
  }
);

User.findOne({
  attributes: {
      exclude: ['password']
  }
});

module.exports = User;