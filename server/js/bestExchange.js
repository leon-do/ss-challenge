/* 

    The flow:
    get all of the rates from allRates.js
    sort through allRates and find the indexOf the lowest rate
    store it into const BTC_ETC, BTC_LTC and BTC_DASH
    Promise.all([BTC_ETC, BTC_LTC, BTC_DASH]) stores the coin pairs into a variable called bestExchange
    export bestExchange for server.js

*/
"use strict";
const allRates = require('./allRates.js')

//expose results to other js files (server.js)
exports.lowestRate = (cb) => {
    
    const BTC_ETC = new Promise((resolve, reject) => {
        // get all rates for all exchanges
        allRates.rates('BTC','ETH', (arr) => {

            // arr = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
            // minIndex finds the indexOf the lowest rate

            const minIndex = arr.indexOf(arr.reduce((a,b) => a.rate < b.rate ? a : b))

            console.log(`

                BTC to ETH exchange rate: ${JSON.stringify(arr)}
                Between Poloniex, Bittrex and Yobit, the lowest ask is: ${arr[minIndex].name} at ${arr[minIndex].rate}

            `)

            resolve({exchangeName: arr[minIndex].name, rate: arr[minIndex].rate})
        })
    })



    const BTC_LTC = new Promise((resolve, reject) => {
        allRates.rates('BTC','LTC', (arr) => {
            
            const minIndex = arr.indexOf(arr.reduce((a,b) => a.rate < b.rate ? a : b))
           
            console.log(`

                BTC to LTC exchange rate: ${JSON.stringify(arr)}
                Between Poloniex, Bittrex and Yobit, the lowest ask is: ${arr[minIndex].name} at ${arr[minIndex].rate}

            `) 

            resolve({exchangeName: arr[minIndex].name, rate: arr[minIndex].rate})
        })
    })


    const BTC_DASH = new Promise((resolve, reject) => {
        allRates.rates('BTC','DASH', (arr) => {

            const minIndex = arr.indexOf(arr.reduce((a,b) => a.rate < b.rate ? a : b))

                console.log(`

                    BTC to DASH exchange rate: ${JSON.stringify(arr)}
                    Between Poloniex, Bittrex and Yobit, the lowest ask is: ${arr[minIndex].name} at ${arr[minIndex].rate}

                `)   

            resolve({exchangeName: arr[minIndex].name, rate: arr[minIndex].rate})
        })
    })


    // Promise.all stores all of the lowest rates into a variable called bestExchange
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
