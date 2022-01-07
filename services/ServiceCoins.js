const https = require("https");

const config = require("../config/config");

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
          var fbResponse = JSON.parse(body);
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
    var res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?page=1&per_page=500&vs_currency=usd"
    );
    console.log(res);
    if (res.status == "200") {
        console.log(res)
      return res;
    }

    return false;
  },
};
