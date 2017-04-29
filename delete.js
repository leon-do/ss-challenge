var async = require('async')
var request = require('request')

async.parallel({

    //API call to poloniex
    poloniex: function(callback){

        // call to get poloniex ticker
        request('https://poloniex.com/public?command=returnTicker', function (error, response, body) {
            var object = JSON.parse(body)
            callback(error, object.BTC_ETH)
        });


    },
    // API call to Bittrex
    bittrex: function(callback){

        // call to get Bittrex ticker
        var pair = 'BTC-ETH'
        request(`https://bittrex.com/api/v1.1/public/getticker?market=${pair}`, function (error, response, body) {
            callback(error, body)
        })


    }
},
function(error, results) {
    // combines two api calls into an object called results
    console.log(results)
});