/* 

    The flow:
    exchange.rates for BTC and ETH will return array = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
    passing the array through the function bestRate will return the best rate out of that array { rate: 0.05247765, name: 'bittrex' }

    exchange is a funciton from exchange.js
    exchange takes in two arguments, coin1 and coin2 and returns an array with different rates from different exchanges.

*/
"use strict";
const async = require('async')
const allRates = require('./allRates.js')
const bestRate = require('./bestRate.js')

//expose results to other js files (server.js)
exports.lowestRate = (cb) => {
    
    // run the API calls in parallel
    async.parallel({

        //first API call
        'BTC-ETH': (callback) => {

            // get all rates for all exchanges
            allRates.rates('BTC','ETH', (arr) => {
                // bestRate calls function from bestRate.js 
                // bestRate takes in an array as an argument and returns the index with the lowest rate
                // arr = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
                bestRate.indexOfLowestVal(arr, (index) => {
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
        'BTC-LTC': (callback) => {

            allRates.rates('BTC','LTC', (arr) => {
                bestRate.indexOfLowestVal(arr, (index) => {
                    console.log(`

                        BTC to LTC exchange rate: ${JSON.stringify(arr)}
                        Between Poloniex, Bittrex and Yobit, the lowest ask is: ${arr[index].name} at ${arr[index].rate}

                    `) 
                callback(null, {exchangeName: arr[index].name, rate: arr[index].rate})
                })
            })

        },

        // third api call
        'BTC-DASH': (callback) => {

            allRates.rates('BTC','DASH', (arr) => {
                bestRate.indexOfLowestVal(arr, (index) => {
                    console.log(`

                        BTC to DASH exchange rate: ${JSON.stringify(arr)}
                        Between Poloniex, Bittrex and Yobit, the lowest ask is: ${arr[index].name} at ${arr[index].rate}

                    `)   
                callback(null, {exchangeName: arr[index].name, rate: arr[index].rate})
                })
            })

        }
    },

        (error, results) => {
            //expose results for another js file
            cb(results)
        }
    )
}
