/*

    Find the trade hitory for poloniex, bittrex and yobit 
    the trade hitory values are stored into const poloniex, bittrex and yobit 
        The date is then normlized to standardize date format YYYY-DD-MMT0HH:MM:SS:SSSZ (2017-04-30T07:46:38)
    Promise.all stores poloniex, bittrex and yobit values into a variable called txHistory
    return txHistory for server.js



*/
"use strict";
const request = require('request');


exports.list = (coin1, coin2, cb) => {

    const poloniex = new Promise((resolve, reject) => {
        //poloniex api requires a start and end date
        let d = new Date();
        let startDate = (d.getTime() - d.getTimezoneOffset() - 1000000)/1000
        let endDate = (d.getTime() - d.getTimezoneOffset())/1000

        request(`https://poloniex.com/public?command=returnTradeHistory&currencyPair=${coin1}_${coin2}&start=${startDate}&end=${endDate}`, (error, response, body) => {
            // loop through the array and update date and rate
            // [  [date, rate], [date, rate]... ]
            // data is built this way to easily graph on client side --> [ [x1,y1], [x2,y2] ...]
            let arr = JSON.parse(body).map((obj) => { 
              //standardize date format 2017-04-30 07:46:38 --> 2017-04-30T07:46:000Z
              let date = obj.date.replace(' ','T').slice(0,19) + '.000Z'
              return [new Date(date), parseFloat(obj.rate)]
            })
            resolve(arr)
        });
    })


    const bittrex = new Promise((resolve,reject) => {

        request(`https://bittrex.com/api/v1.1/public/getmarkethistory?market=${coin1}-${coin2}&count=4`, (error, response, body) => {
            let arr = JSON.parse(body).result.map((obj) => { 
                let date = obj.TimeStamp.slice(0,19) + '.000Z'
                return [new Date(date), obj.Price]
            })
            resolve(arr)
        }) 

    })


    const yobit = new Promise((resolve, reject) => {

          request(`https://yobit.net/api/2/${coin2.toLowerCase()}_${coin1.toLowerCase()}/trades`, (error, response, body) => {
              let arr = JSON.parse(body).map((obj) =>{ 
                  let date = new Date(obj.date * 1000)
                  return [date, obj.price]
              })
              resolve(arr)
          });    

    })
     
 
     return Promise.all([poloniex, bittrex, yobit])
       .then(results => {
          //tx history = { bittrex: [ [ 2017-05-06T15:16:07.000Z, 0.0168009 ],[ 2017-05-06T15:16:07.000Z, 0.0168009 ]...
          const txHistory = {
              poloniex: results[0],
              bittrex: results[1],
              yobit: results[2]
          }
          return txHistory
       })
       .catch(error => {
          console.log(error)
       })

}

