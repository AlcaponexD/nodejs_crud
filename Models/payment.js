const { DataTypes, Deferrable  } = require("sequelize");
const connection = require("../database/database");
const Plan = require("./plan");
const User = require("./user");

const Payment = connection.define("payments", {
  // Model attributes are defined here
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
    type: DataTypes.ENUM(["paid","failed","pending"]),
  },
  user_id: {
    type: DataTypes.INTEGER,

    references: {
      // This is a reference to another model
      model: User,

      // This is the column name of the referenced model
      key: 'id',

      // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
      deferrable: Deferrable.INITIALLY_IMMEDIATE
      // Options:
      // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
      // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
      // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
    }
  },
  plan_id: {
    type: DataTypes.INTEGER,

    references: {
      // This is a reference to another model
      model: Plan,

      // This is the column name of the referenced model
      key: 'id',

      // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
      //deferrable: Deferrable.INITIALLY_IMMEDIATE
      // Options:
      // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
      // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
      // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
    }
  }
});

//relations
User.hasMany(Payment, {
  foreignKey: "user_id",
});
Plan.hasMany(Payment, {
  foreignKey: "plan_id",
});
Payment.belongsTo(Plan,{
  foreignKey: "plan_id",
});
Payment.belongsTo(User,{
  foreignKey: "user_id",
});

module.exports = Payment;
