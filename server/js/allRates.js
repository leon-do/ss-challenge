/*

    The flow:
    Find the ticker value for poloniex, bittrex and yobit 
    the ticker values are stored into const poloniex, bittrex and yobit 
    Promise.all stores poloniex, bittrex and yobit values into a variable called lowestAsk
    export variable lowestAsk for bestExchange.js

*/



"use strict";
const request = require('request')

exports.rates = (coin1, coin2, cb) => {

    const poloniex = new Promise((resolve, reject) => {
        // API call to get poloniex ticker
        request('https://poloniex.com/public?command=returnTicker', (error, response, body) => {
            //convert string to an object
            let object = JSON.parse(body)
            resolve(object[`${coin1}_${coin2}`])
        });
    })


    const bittrex = new Promise((resolve, reject) => {
        // call to get Bittrex ticker
        request(`https://bittrex.com/api/v1.1/public/getticker?market=${coin1}-${coin2}`, (error, response, body) => {
            let object = JSON.parse(body)
            resolve(object)
        })
    })


    const yobit = new Promise((resolve, reject) => {
        request(`https://yobit.net/api/3/ticker/${coin2.toString().toLowerCase()}_${coin1.toString().toLowerCase()}`, (error, response, body) => {
            let object = JSON.parse(body)
            resolve(object[`${coin2.toString().toLowerCase()}_${coin1.toString().toLowerCase()}`])
        });
    })

    

    /*
    const exchangeZ = new Promise((resolve, reject) => {
        request('https://SOME_URL_HERE', (error, response, body) => {
            resolve(response)
    })
    */



    Promise.all([poloniex, bittrex, yobit])
        .then(results => { 
            // lowestAsk = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
            const lowestAsk = [
                {name: 'poloniex', rate: parseFloat(results[0].lowestAsk)},
                {name: 'bittrex', rate: parseFloat(results[1].result.Ask)},
                {name: 'yobit', rate: parseFloat(results[2].low)},
            ]
            cb(lowestAsk)
        })
        .catch(error => {
          console.log(error)
       })
}