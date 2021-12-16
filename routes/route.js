const express = require("express");

const router = express.Router();
const userController = require("../controllers/controllerUser");
const loginController = require("../controllers/controllerLogin");
const usercheck = require("../middlewares/usercheck");
const walletController = require("../controllers/controllerWallet");

/*
 * public routes
 */
router.post("/user", userController.create);

router.post("/login", loginController.login);

/*
 * private routes
 */

router.put("/user", usercheck, userController.update);

//Carteiras
router.post("/wallet", usercheck, walletController.create);
router.put("/wallet/:id", usercheck, walletController.update);
router.delete("/wallet/:id", usercheck, walletController.destroy);
router.get("/wallet/coins/public", usercheck, walletController.coins);
router.get("/wallet/total/all", usercheck, walletController.totals);

module.exports = router;
