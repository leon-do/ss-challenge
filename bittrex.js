// https://www.npmjs.com/package/node.bittrex.api

var request = require('request');

request('https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-DASH&type=both&depth=1', function (error, response, body) {
  var object = JSON.parse(body);
  var rate = object.result.buy[0].Rate
  console.log(rate);
});

