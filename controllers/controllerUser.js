const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const user = require("../Models/user");

module.exports = {
  async create(req, res) {
    //Create

    if (!req.body.password && !req.body.name && !req.body.email) {
      return res.status(422).send({
        error: true,
        message: "The next fields are required -> name,email,password",
      });
    }

    try {
      //Valida email unico
      var email_exist = await user.findOne({
        where: { email: req.body.email },
      });

      if (email_exist) {
        return res.status(422).send({
          error: true,
          message: "The email already exists",
        });
      }

      var salt = bcrypt.genSaltSync(10);
      var pass_hash = bcrypt.hashSync(req.body.password, salt);

      var user_created = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: pass_hash,
      });

      const id = user_created.id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: config.jwt_expiration, // expires in 12hours
      });

      return res.send({
        auth: true,
        token: token,
      });
    } catch (e) {
      return res.status(500).send({
        error: true,
        message: e.message,
      });
    }
  },
  async update(req, res) {
    const update = await user.findOne({
      where: {
        id: req.user.id,
      },
    });

    const data = {};
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.password) {
      if (req.body.old_password) {
        //comparar senha atual/hash e fazer a troca
        //Check hash
        const match = await bcrypt.compare(
          req.body.old_password,
          update.password
        );
        if (!match) {
          res.status(422).send({
            error: true,
            message: config.label("password_incorrect"),
          });
        }
        var salt = bcrypt.genSaltSync(10);
        var pass_hash = bcrypt.hashSync(req.body.password, salt);

        data.password = pass_hash;
      } else {
        //retornar que precisa de confirmation
        res.status(422).send({
          error: true,
          message: config.label("old_password_need"),
        });
      }
    }

    //Save data
    try {
      update.set(data);
      var upd = await update.save();
      upd.password = "*********";
      res.send(upd);
    } catch (error) {
      res.status(422).send({
        error: true,
        message: config.label("error_update"),
      });
    }
  },
  async index(req, res) {
    var result = await user.findOne({
      where: {
        id: req.user.id,
      },
    });
    result.password = "******";
    res.send(result);
  },
};
