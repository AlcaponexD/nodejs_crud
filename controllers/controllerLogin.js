require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const user = require("../Models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = {
  async login(req, res) {
    //Recebe os params obrigatorios
    if (req.body.password && req.body.email) {
      var email_exist = await user.findOne({
        where: { email: req.body.email },
      });

      if (!email_exist) {
        res.status(404).send({
          error: true,
          message: config.label("email_not_found"),
        });
      }

      //Check hash
      const match = await bcrypt.compare(
        req.body.password,
        email_exist.password
      );

      //Return token jwt to use
      if (match) {
        const id = email_exist.id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: config.jwt_expiration//process.env.JWT_EXPIRATION, // expires in 12hours
        });

        res.send({
          auth: true,
          token: token,
        });
      } else {
        res.status(401).send({
          auth: false,
          message: config.label("password_incorrect"),
        });
      }
    }
  },
};
