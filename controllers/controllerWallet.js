const https = require("https");

const config = require("../config/config");
const Cript = require("../Models/criptPrice");
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
    let pageAsNumber = Number.parseInt(req.query.page);
    let per_pageAsNumber = Number.parseInt(req.query.per_page);

    //Primeira pagina da paginacao
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      //Trata pagina 1 para começar da primeira no banco 0
      if (pageAsNumber == 1) {
        pageAsNumber = 0;
      }
      page = pageAsNumber;
    }

    //Tamanho padrao sem parametros
    let size = 10;
    if (!Number.isNaN(per_pageAsNumber) && per_pageAsNumber > 0) {
      size = per_pageAsNumber;
    }

    //Trata page = 1 transforma no 0 pro db

    const criptos = await Cript.findAndCountAll({
      limit: size,
      offset: page * size,
    });
    res.send({
      content: criptos.rows,
      totalPages: Math.ceil(criptos.count / size),
    });
  },
  async destroy(req, res) {
    const del = await wallet.findOne({
      where: {
        user_id: req.user.id,
        id: req.params.id,
      },
    });

    if (del) {
      del.destroy();
      res.send({
        messsage: config.label("success"),
      });
    } else {
      res.status(404).send({
        message: config.label("404"),
      });
    }
  },
  async totals(req, res) {
    try {
      const wallets = await wallet.findAll({
        where: {
          user_id: req.user.id,
        },
      });

      var total = 0;
      for (const wallet of wallets) {
        const { coin, quantity } = wallet;
        var cript = await Cript.findOne({
          where: {
            symbol: coin,
          },
        });
        total = total + quantity * cript.current_price;
      }
      res.send({ total, type: "USD" });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: config.label("error_sum_wallets"),
      });
    }
  },
  async index(req, res) {
    var results = [];
    const wallts = await wallet.findAll({
      where: { user_id: req.user.id },
    });

    var promises = wallts.map(function (item) {
      // return array of promises
      // return the promise:
      return Cript.findOne({
        where: {
          symbol: item.coin,
        },
      }).then(function (res) {
        console.log(res.dataValues);
        item.total = item.quantity * res.dataValues.current_price;
        results.push(item);
      });
    });
    Promise.all(promises).then(function () {
      //do something with the finalized list of items here
      res.send(results);
    });

    
  },
};
