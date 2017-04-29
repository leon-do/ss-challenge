var exchange = require('./exchange.js')

exchange.rates('BTC-ETH', function(data){
    console.log(data)
})