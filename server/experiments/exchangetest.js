// This code does API calls to all of the exchanges and saves the rates into an object called results

var async = require('async')
var request = require('request')

//expose results to other js files
exports.rates = function(pair, cb){
    
    // run the API calls in parallel
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
            request(`https://bittrex.com/api/v1.1/public/getticker?market=${pair}`, function (error, response, body) {
                callback(error, body)
            })


        }
    },
    function(error, results) {
        // combines two api calls into an object called results
        cb(results)
    });

}