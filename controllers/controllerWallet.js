const config = require("../config/config");

const wallet = require("../Models/wallet");

module.exports = {
  async create(req, res) {
    if (req.body.name || req.body.coin || req.body.quantity) {
      var data = {};
      if (req.body.name) {
        data.name = req.body.name;
      }

      if (req.body.coin) {
        data.coin = req.body.coin;
      }
      if (req.body.quantity) {
        data.quantity = req.body.quantity;
      }

      data.user_id = req.user.id;
      //save

      try {
        var insert = await wallet.create(data);
        res.send(insert);
      } catch (e) {
        res.status(500).send(e.message);
      }
    }
  },
  async update(req, res) {
    const update = await wallet.findOne({
      where: {
        user_id: req.user.id,
        id: req.params.id,
      },
    });

    if (update) {
      if (req.body.name || req.body.coin || req.body.quantity) {
        var data = {};
        if (req.body.name) {
          data.name = req.body.name;
        }

        if (req.body.coin) {
          data.coin = req.body.coin;
        }
        if (req.body.quantity) {
          data.quantity = req.body.quantity;
        }

        //save

        try {
          update.set(data);
          var upd = await update.save();
          res.send(upd);
        } catch (e) {
          res.status(500).send(e.message);
        }
      } else {
        res.status(422).send({
          message: config.label("input_incorrect"),
          body: req.body,
        });
      }
    } else {
      res.status(404).send({
        message: config.label("404"),
      });
    }
  },
  async coins(req, res) {
    res.send({
      coins: ["BTC", "ETH"],
    });
  },
  async destroy(req, res) {
    const del = await wallet.findOne({
      where: {
        user_id: req.user.id,
        id: req.params.id,
      },
    });

    if(del){
        del.destroy();
        res.send({
            messsage : config.label("success"),
        })
    }else{
        res.status(404).send({
            message : config.label("404")
        })
    }
  },
};
