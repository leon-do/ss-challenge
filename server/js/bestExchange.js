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
    
    const BTC_ETC = new Promise((resolve, reject) => {
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
            resolve({exchangeName: arr[index].name, rate: arr[index].rate})
            })
        })        
    })



    const BTC_LTC = new Promise((resolve, reject) => {
        allRates.rates('BTC','LTC', (arr) => {
            bestRate.indexOfLowestVal(arr, (index) => {
                console.log(`

                    BTC to LTC exchange rate: ${JSON.stringify(arr)}
                    Between Poloniex, Bittrex and Yobit, the lowest ask is: ${arr[index].name} at ${arr[index].rate}

                `) 
            resolve({exchangeName: arr[index].name, rate: arr[index].rate})
            })
        })
    })


    const BTC_DASH = new Promise((resolve, reject) => {
        allRates.rates('BTC','DASH', (arr) => {
            bestRate.indexOfLowestVal(arr, (index) => {
                console.log(`

                    BTC to DASH exchange rate: ${JSON.stringify(arr)}
                    Between Poloniex, Bittrex and Yobit, the lowest ask is: ${arr[index].name} at ${arr[index].rate}

                `)   
            resolve({exchangeName: arr[index].name, rate: arr[index].rate})
            })
        })
    })


    Promise.all([BTC_ETC, BTC_LTC, BTC_DASH])
    .then(results => {
        // results = [ { exchangeName: 'yobit', rate: 0.05726615 },{ exchangeName: 'yobit', rate: 0.0157702 }, { exchangeName: 'yobit', rate: 0.061504 } ]
        // bestExchange = { 'BTC_LTC': { exchangeName: 'yobit', rate: 0.0157702 }, 'BTC-DASH': { exchangeName: 'yobit', rate: 0.061504 }, 'BTC-ETH': { exchangeName: 'yobit', rate: 0.05726615 } }
        const bestExchange = {
            BTC_ETH: results[0],
            BTC_LTC: results[1],
            BTC_DASH: results[2]
        }
        cb(bestExchange)
    })
    .catch(error =>{
        console.log(error)
    })


}
