/*

This does 3 API calls to get back transaction history
The date is then normlized from ISO 8601 to universal time

*/

var request = require('request');
var async = require('async')

var coin1 = 'BTC'
var coin2 = 'LTC'


async.parallel({


    poloniex: function(callback){

        request(`https://poloniex.com/public?command=returnTradeHistory&currencyPair=${coin1}_${coin2}&start=${Math.floor(new Date().getTime()/1000) - 200}&end=${Math.floor(new Date().getTime()/1000)}`, function (error, response, body) {
            // loop through the array and update date and rate
            // example: { date: 1493539282000, rate: '0.01225700' }
            var arr = JSON.parse(body).map(function(obj) { 
               var newObject = {}
               newObject.date = new Date(obj.date).getTime() //converting iso 8601 to unix
               newObject.rate = obj.rate
               return newObject
            })
            callback(error, arr)

        });

    },



    bittrex: function(callback){

        request(`https://bittrex.com/api/v1.1/public/getmarkethistory?market=${coin1}-${coin2}&count=4 `, function (error, response, body) {

            var arr = JSON.parse(body).result.map(function(obj) { 
               var newObject = {}
               newObject.date = new Date(obj.TimeStamp).getTime() //converting iso 8601 to unix
               newObject.rate = obj.Price
               return newObject
            })
            callback(error, arr)

        });
        
    },


    yobit: function(callback){

        request(`https://yobit.net/api/2/ltc_btc/trades`, function (error, response, body) {

            var arr = JSON.parse(body).map(function(obj){
                var newObject = {}
                newObject.date = obj.date * 1000
                newObject.rate = obj.price
                return newObject
            })
            callback(error, arr)

        });

        
    },


        /* 
        ADD ANOTHER API CALL HERE
        */


},
function(err, data){
    console.log(data)
})















