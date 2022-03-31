const https = require("https");

const config = require("../config/config");
const cript_prices = require("../Models/criptPrice");

const fetch = (url) => {
  // Return a promise
  return new Promise((resolve, reject) => {
    // Call the https.get function
    https
      .get(url, (res) => {
        var body = "";
        res.setEncoding("utf-8");
        // Set the event listener
        res.on("data", function (data) {
          // Here the actual data event is _happening_. Now we have the return value
          body += data;
        });
        res.on("end", function () {
          if (body) {
            try {
              var fbResponse = JSON.parse(body);
            } catch (error) {
              var fbResponse = false;
            }
          }
          resolve({
            data: fbResponse,
            status: res.statusCode,
          });
        });
      })
      .on("error", function (e) {
        console.log(e);
        reject(e);
      });
  });
};

module.exports = {
  async list() {
    var page = 1;
    var pagination = true;
    var data = [];
    var start = new Date();
    while (pagination) {
      try {
        var res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?page${page}&per_page=500&vs_currency=usd`
        );
        if (res.data) {
          if (res.status == "200") {
            console.log(res.data);
            for (var i in res.data) {
              if (res.data[i].market_cap > 400000000) {
                data.push({
                  name: res.data[i].name,
                  symbol: res.data[i].symbol,
                  current_price: res.data[i].current_price,
                });
              } else {
                pagination = false;
              }
            }
            page = page + 1;
          }
        } else {
          pagination = false;
        }
      } catch (e) {
        console.log(e.message);
      }
      //Time slepp to not ultrapassing 50 req/min
      await new Promise((r) => setTimeout(r, 1500));
    }
    //Save to database
    var data_insert = [];
    try {
      //Verify if exists on database
      for (var i in data) {
        const update = await cript_prices.findOne({
          where: {
            symbol: data[i].symbol,
          },
        });
        if (update) {
          update.set(data[i]);
          await update.save();
        } else {
          //create array from builkcreate
          data_insert.push(data[i]);
        }
      }

      var save = await cript_prices.bulkCreate(data_insert, {
        updateOnDuplicate: ["symbol"],
      });
      var end = new Date();

      //Pega diferenca
      var difference = end.getTime() - start.getTime();
      difference = difference != 0 ? difference / 1000 : difference;
      console.log(difference);

      console.log(data.length);

      return data_insert;
    } catch (e) {
      return e.message;
    }
  },
};
