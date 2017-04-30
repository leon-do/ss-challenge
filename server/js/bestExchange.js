/* 

    The flow:
    exchange.rates for BTC and ETH will return array = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
    passing the array through the function bestRate will return the best rate out of that array { rate: 0.05247765, name: 'bittrex' }

    exchange is a funciton from exchange.js
    exchange takes in two arguments, coin1 and coin2 and returns an array with different rates from different exchanges.

*/


var async = require('async')
var allRates = require('./allRates.js')
var bestRate = require('./bestRate.js')

//expose results to other js files (server.js)
exports.lowestRate = function(cb){
    
    // run the API calls in parallel
    async.parallel({

        //first API call
        'BTC-ETH': function(callback){

            // get all rates for all exchanges
            allRates.rates('BTC','ETH', function(arr){
                // bestRate calls function from bestRate.js 
                // bestRate takes in an array as an argument and returns the index with the lowest rate
                // arr = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
                bestRate.indexOfLowestVal(arr, function(index){
                    //index from the callback is the index with the lowest rate
                    console.log(`

                        BTC to ETH exchange rate: ${JSON.stringify(arr)}
                        Between Poloniex, Bittrex and Yobit, the lowest ask is: ${arr[index].name} at ${arr[index].rate}

                    `)

                //store data back into results (at the bottom)
                callback(null, {exchangeName: arr[index].name, rate: arr[index].rate})
                })
            })

        },


        //second api call
        'BTC-LTC': function(callback){

            allRates.rates('BTC','LTC', function(arr){
                bestRate.indexOfLowestVal(arr, function(index){
                    console.log(`

                        BTC to LTC exchange rate: ${JSON.stringify(arr)}
                        Between Poloniex, Bittrex and Yobit, the lowest ask is: ${arr[index].name} at ${arr[index].rate}

                    `) 
                callback(null, {exchangeName: arr[index].name, rate: arr[index].rate})
                })
            })

        },

        // third api call
        'BTC-DASH': function(callback){

            allRates.rates('BTC','DASH', function(arr){
                bestRate.indexOfLowestVal(arr, function(index){
                    console.log(`

                        BTC to DASH exchange rate: ${JSON.stringify(arr)}
                        Between Poloniex, Bittrex and Yobit, the lowest ask is: ${arr[index].name} at ${arr[index].rate}

                    `)   
                callback(null, {exchangeName: arr[index].name, rate: arr[index].rate})
                })
            })

        }
    },

        function(error, results){
            //expost results for another js file
            cb(results)
        }
    )
}
