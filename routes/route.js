const express = require("express");

const router = express.Router();
const userController = require("../controllers/controllerUser");
const loginController = require("../controllers/controllerLogin");
const usercheck = require("../middlewares/usercheck");
const walletController = require("../controllers/controllerWallet");
const controllerService = require("../controllers/controllerService")
const { Router } = require("express");

/*
 * public routes
 */
router.post("/user", userController.create);

router.post("/login", loginController.login);

router.get("/coin/list",controllerService.list);
/*
* private routes
*/

router.put("/user", usercheck, userController.update);
router.get("/user", usercheck, userController.index);

//Carteiras
router.post("/wallet", usercheck, walletController.create);
router.put("/wallet/:id", usercheck, walletController.update);
router.delete("/wallet/:id", usercheck, walletController.destroy);
router.get("/wallet/coins/public", usercheck, walletController.coins);
router.get("/wallet/total/all", usercheck, walletController.totals);
router.get("/wallet", usercheck, walletController.index);




module.exports = router;
