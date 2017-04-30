/*

poloniex and retrieve data1
Bittrex and retrieve data2
yobit and retrieve data3

*/

var request = require('request');

request('https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_NXT&start=1410158341&end=1410499372', function (error, response, body) {
    var object = JSON.parse(body)
    console.log(object)
});
