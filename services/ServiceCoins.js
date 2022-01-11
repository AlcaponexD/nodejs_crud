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
  var page = 1;
  var pagination = true;
  var data = [];
  var start = new Date();
  while (pagination) {
    try {
      var res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?page${page}&per_page=500&vs_currency=usd`
      );
      if (res.status == "200") {
        console.log(res.data)
        for (var i in res.data) {
          if(res.data[i].market_cap > 400000000){
            data.push(res.data[i]);
          }else{
            pagination = false;
          }
          
        }
        page = page + 1;
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  var end = new Date();

  //Pega diferenca
  var difference = end.getTime() - start.getTime();
  difference = difference != 0 ? difference / 1000 : difference;
  console.log(difference);

  console.log(data.length)
  return data;
},
};
