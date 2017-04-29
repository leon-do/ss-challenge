// https://poloniex.com/support/api/

var request = require('request');


var date = new Date();
var startDate = Math.floor(date.getTime()/1000) - 100;
var endDate = Math.floor(date.getTime()/1000)
var pair = 'BTC_DASH'

var url = `https://poloniex.com/public?command=returnTradeHistory&currencyPair=${pair}&start=${startDate}&end=${endDate}`

request(url, function (error, response, body) {
    var object = JSON.parse(body)
    var rate = object[0].rate
    console.log(rate)
});
