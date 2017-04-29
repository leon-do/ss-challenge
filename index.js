var exchange = require('./js/exchange.js')
var bestRate = require('./js/bestRate.js')


/* 

    The flow:
    exchange.rates for BTC and ETH will return array = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
    passing the array through the function bestRate will return the best rate out of that array { rate: 0.05247765, name: 'bittrex' }

    exchange is a funciton from exchange.js
    exchange takes in two arguments, coin1 and coin2 and returns an array with different rates from different exchanges.
    The different exchanges are poloniex and bittrex. exchange.js is built to scale


*/




exchange.rates('BTC','ETH', function(arr){
    // bestRate calls funtion from bestRate.js 
    // bestRate takes in an array as an argument and returns the index with the lowest rate
    // arr = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
    bestRate.indexOfLowestVal(arr, function(index){
        //index from the callback is the index with the lowest rate
        console.log(`

            BTC to ETH exchange rate: ${JSON.stringify(arr)}
            Between Poloniex and Bittrex, the lowest ask is: ${arr[index].name} at ${arr[index].rate}

        `)
    })
})

exchange.rates('BTC','LTC', function(arr){
    bestRate.indexOfLowestVal(arr, function(index){
        console.log(`

            BTC to LTC exchange rate: ${JSON.stringify(arr)}

            Between Poloniex and Bittrex, the lowest ask is: ${arr[index].name} at ${arr[index].rate}

        `)    
    })
})

exchange.rates('BTC','DASH', function(arr){
    bestRate.indexOfLowestVal(arr, function(index){
        console.log(`

            BTC to DASH exchange rate: ${JSON.stringify(arr)}

            Between Poloniex and Bittrex, the lowest ask is: ${arr[index].name} at ${arr[index].rate}

        `)    
    })
})

