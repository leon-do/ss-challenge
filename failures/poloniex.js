// https://poloniex.com/support/api/

var request = require('request');

    var url = `https://poloniex.com/public?command=returnTicker`

    request(url, function (error, response, body) {
        var object = JSON.parse(body)
        console.log(object.BTC_ETH)
    });



