// This code does API calls to all of the exchanges and saves the rates into an object called results

var async = require('async')
var request = require('request')

//expose results to other js files
exports.rates = function(coin1, coin2, cb){
    
    // run the API calls in parallel
    async.parallel({

        //API call to poloniex
        poloniex: function(callback){

            // call to get poloniex ticker// This code does API calls to all of the exchanges and saves the rates into an array called lowestAsk

/*

    The flow:
    call out to poloniex and retrieve data1
    call out to Bittrex and retrieve data2
    the data is then stored in an object called results = {data1, data2}
    results is then parsed and pushed into an array called lowestAsk = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
    lowestAsk passed back in a callback for use

    Pros of this structure: 
        - Easy to scale by adding more API calls inside async.parallel
        - (relatively) easy to understand

    Cons of this structure:
        - not performant. Some data structures can be retrieved in one call. This method may call the same data structure multiple times.

*/

//expose results to other js files (server.js)
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
                var object = JSON.parse(body)
                callback(error, object)
            })


        }



        /* 
        ADD ANOTHER API CALL HERE

        exchangeZ : function(callback){
            request(`https://SOME_URL_HERE`, function (error, response, body) {
                callback(error, body)
            })
        }

        */




    },
    // combines all of the api calls into an object called results
    function(error, results) {
        // parse the results into a array called lowestAsk. I'm using an array to get the lowest value in O(n) time. This data structure can be optimized
        var lowestAsk = []
        lowestAsk.push({
            rate: parseFloat(results.poloniex.lowestAsk),
            name: "poloniex"})
        lowestAsk.push({
            rate: parseFloat(results.bittrex.result.Ask),
            name: "bittrex"})
        // lowestAsk = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
        cb(lowestAsk)
    });

}
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
        // parse the results into a array called lowestAsk. I'm using an array to get the lowest value in O(n) time. This data structure can be optimized
        var lowestAsk = []
        lowestAsk.push({
            rate: parseFloat(results.poloniex.lowestAsk),
            name: "poloniex"})
        lowestAsk.push({
            rate: JSON.parse(results.bittrex).result.Ask,
            name: "bittrex"})
        cb(lowestAsk)
    });

}