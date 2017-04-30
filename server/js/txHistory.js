/*

This does 3 API calls to get back transaction history
The date is then normlized from ISO 8601 to universal time

*/

var request = require('request');
var async = require('async')

var coin1 = 'BTC'
var coin2 = 'LTC'

exports.list = function(cb){

  async.parallel({

      poloniex: function(callback){

          var d = new Date();
          var startDate = (d.getTime() - d.getTimezoneOffset() - 100000)/1000
          var endDate = (d.getTime() - d.getTimezoneOffset())/1000

          request(`https://poloniex.com/public?command=returnTradeHistory&currencyPair=${coin1}_${coin2}&start=${startDate}&end=${endDate}`, function (error, response, body) {
              // loop through the array and update date and rate
              // [  [date, rate], [date, rate]... ]
              // example: [ [1493539282000,0.01225700] ]
              // data is built this way to easily graph on client side
              var arr = JSON.parse(body).map(function(obj) { 
                //standardize date format 2017-04-30 07:46:38 --> 2017-04-30T07:46:000Z
                var date = obj.date.replace(' ','T').slice(0,19) + '.000Z'
                return [new Date(date), parseFloat(obj.rate)]
              })
              callback(error, arr)

          });

      },



      bittrex: function(callback){

          request(`https://bittrex.com/api/v1.1/public/getmarkethistory?market=${coin1}-${coin2}&count=4 `, function (error, response, body) {

              var arr = JSON.parse(body).result.map(function(obj) { 
                var date = obj.TimeStamp.slice(0,19) + '.000Z'
                return [new Date(date), obj.Price]
              })
              callback(error, arr)

          });
          
      },


      yobit: function(callback){

          request(`https://yobit.net/api/2/ltc_btc/trades`, function (error, response, body) {

              var arr = JSON.parse(body).map(function(obj){ 
                  var date = new Date(obj.date * 1000)
                  return [date, obj.price]
              })
              callback(error, arr)

          });

          
      },


          /* 
          ADD ANOTHER API CALL HERE
          */


  },

  function(err, data){
      cb(data)
  })

}













