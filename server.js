var bittrex = require('./bittrex.js')
var poloniex = require('./poloniex.js')
var ticker = require('./ticker.js')



// bittrex.rate('BTC-DASH', function(data){
//     console.log(data)
// })

// poloniex.rate('BTC_DASH', function(data){
//     console.log(data)
// })

ticker.rate(function(data){
    console.log(data.poloniex)
})