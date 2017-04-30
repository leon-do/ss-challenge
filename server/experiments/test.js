var request = require('request');

var coin1 = 'BTC'
var coin2 = 'LTC'

var date = new Date();
var startDate = (date.getTime() - date.getTimezoneOffset() - 100000)/1000
var endDate = (date.getTime() - date.getTimezoneOffset())/1000

console.log(endDate)

request(`https://poloniex.com/public?command=returnTradeHistory&currencyPair=${coin1}_${coin2}&start=${startDate}&end=${endDate}`, function (error, response, body) {
    // loop through the array and update date and rate
    // example: { date: 1493539282000, rate: '0.01225700' }
    console.log(body)
})

