/*
https://yobit.net/api/3/ticker/dash_btc
*/


var request = require('request');

var coin1 = 'BTC'
var coin2 = 'ETH'

request(`https://yobit.net/api/3/ticker/${coin2.toString().toLowerCase()}_${coin1.toString().toLowerCase()}`, function (error, response, body) {
    var object = JSON.parse(body)
    console.log(object[`${coin2.toString().toLowerCase()}_${coin1.toString().toLowerCase()}`])
});
