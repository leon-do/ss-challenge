// https://www.npmjs.com/package/node.bittrex.api

var request = require('request');


var pair = 'BTC-ETH'
request(`https://bittrex.com/api/v1.1/public/getticker?market=${pair}`, function (error, response, body) {
    console.log(body)
})