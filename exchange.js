// This code does API calls to all of the exchanges and saves the rates into an object called results

var async = require('async')
var request = require('request')

//expose results to other js files
exports.rates = function(coin1, coin2, cb){
    
    // run the API calls in parallel
    async.parallel({

        //API call to poloniex
        poloniex: function(callback){

            // call to get poloniex ticker
            request('https://poloniex.com/public?command=returnTicker', function (error, response, body) {
                var object = JSON.parse(body)
                callback(error, object[`${coin1}_${coin2}`])
            });


        },
        // API call to Bittrex
        bittrex: function(callback){

            // call to get Bittrex ticker
            request(`https://bittrex.com/api/v1.1/public/getticker?market=${coin1}-${coin2}`, function (error, response, body) {
                callback(error, body)
            })


        }
    },
    // combines two api calls into an object called results
    function(error, results) {
        // parse the results into a array called currentAsk. I'm using an array to get the lowest value in O(n) time. This data structure can be optimized
        var currentAsk = []
        currentAsk.push({
            rate: parseFloat(results.poloniex.lowestAsk),
            name: "poloniex"})
        currentAsk.push({
            rate: JSON.parse(results.bittrex).result.Ask,
            name: "bittrex"})
        cb(currentAsk)
    });

}