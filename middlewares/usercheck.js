require("dotenv").config();
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = async function (req, res, next) {
  //Verifica headers se existe jwt
  if (!req.headers["x-api-token"]) {
    res.status(401).send({
      auth: false,
      message: config.label("token_not_provided"),
    });
    return ;
  }
  //Valida o jwt

  const token = req.headers["x-api-token"];
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: config.label("invalid_token") });
    //Retorna req com userid
    req.user = decoded;
    next();
  });
};
;