/*

    The flow:

    call out to poloniex and retrieve data1
    call out to Bittrex and retrieve data2
    call out to yobit and retrieve data3

    the data is then stored in an object called results = {data1, data2, data3}
    results is then parsed and pushed into an array called lowestAsk = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
    lowestAsk passed back in a callback for use

    Pros of this structure: 
        - Easy to scale by adding more API calls inside async.parallel
        - (relatively) easy to understand

    Cons of this structure:
        - not performant. Some data can be retrieved in one API call. This method may call the same data multiple times.
        
*/

const async = require('async')
const request = require('request')

//expose results to other js files (server.js)
exports.rates = function(coin1, coin2, cb){
    
    // run the API calls in parallel
    async.parallel({

        //API call to poloniex using request
        poloniex: function(callback){

            // API call to get poloniex ticker
            request('https://poloniex.com/public?command=returnTicker', function (error, response, body) {
                //convert string to an object
                var object = JSON.parse(body)
                // parse the info for callback. This will be displayed in the results (at the bottom of this page)
                callback(error, object[`${coin1}_${coin2}`])
            });


        },
        
        // API call to Bittrex using request
        bittrex: function(callback){

            // call to get Bittrex ticker
            request(`https://bittrex.com/api/v1.1/public/getticker?market=${coin1}-${coin2}`, function (error, response, body) {
                var object = JSON.parse(body)
                callback(error, object)
            })

        },

        // API call to yobit using request
        yobit: function(callback){

            request(`https://yobit.net/api/3/ticker/${coin2.toString().toLowerCase()}_${coin1.toString().toLowerCase()}`, function (error, response, body) {
                var object = JSON.parse(body)
                callback(error, object[`${coin2.toString().toLowerCase()}_${coin1.toString().toLowerCase()}`])
            });

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
    // combines all of the api calls (above) into an object called results
    function(error, results) {
        // parse the results into a array called lowestAsk. I'm using an array to get the lowest value in O(n) time. This data structure can be optimized
        var lowestAsk = []
        lowestAsk.push({
            rate: parseFloat(results.poloniex.lowestAsk),
            name: 'poloniex'})
        lowestAsk.push({
            rate: parseFloat(results.bittrex.result.Ask),
            name: 'bittrex'})
        lowestAsk.push({
            rate: parseFloat(results.yobit.low),
            name: 'yobit'})        
        // lowestAsk = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
        cb(lowestAsk)
    });

}