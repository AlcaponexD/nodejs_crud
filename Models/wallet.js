const { DataTypes, Deferrable } = require("sequelize");
const connection = require("../database/database");
const Payment = require("./payment");
const User = require("./user");

const Wallet = connection.define("wallets", {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
  },
  coin: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  last_total: {
    type: DataTypes.INTEGER,
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
  }
});
//relations
User.hasMany(Payment, {
  foreignKey: "user_id",
});
Payment.belongsTo(User);

Wallet.sync({ force: false }).then(() => {
  console.log("Criou as Wallet");
});

module.exports = Wallet;
