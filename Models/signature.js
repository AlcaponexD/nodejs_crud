const { DataTypes ,Deferrable } = require("sequelize");
const connection = require("../database/database");
const Plan = require("./plan");
const User = require("./user");

const Signature = connection.define("signatures", {
  expiration_at: {
    type: DataTypes.DATE,
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
      deferrable: Deferrable.INITIALLY_IMMEDIATE
      // Options:
      // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
      // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
      // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
    }
  }
});

//relations
User.hasMany(Signature, {
  foreignKey: "user_id",
});
Plan.hasMany(Signature, {
  foreignKey: "plan_id",
});
Signature.belongsTo(Plan,{
  foreignKey: "plan_id",
});
Signature.belongsTo(User,{
  foreignKey: "user_id",
});

module.exports = Signature;
