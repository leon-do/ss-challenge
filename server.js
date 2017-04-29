var exchange = require('./js/exchange.js')
var bestRate = require('./js/bestRate.js')


// calls a funciton from exchange.js
exchange.rates('BTC','ETH', function(arr){
    // calls funtion from bestRate.js to get back an array arr
    // arr = [ { rate: 0.05247999, name: 'poloniex' }, { rate: 0.05247765, name: 'bittrex' } ]
    bestRate.indexOfLowestVal(arr, function(index){
        //index from the callback is the index with the lowest rate
        console.log(`

            BTC to ETH exchange rate: ${JSON.stringify(arr)}
            Between Poloniex and Bittrex, the lowest ask is: ${arr[index].name}

        `)
    })
})

exchange.rates('BTC','LTC', function(arr){
    bestRate.indexOfLowestVal(arr, function(index){
        console.log(`

            BTC to LTC exchange rate: ${JSON.stringify(arr)}

            Between Poloniex and Bittrex, the lowest ask is: ${arr[index].name}

        `)    
    })
})

exchange.rates('BTC','DASH', function(arr){
    bestRate.indexOfLowestVal(arr, function(index){
        console.log(`

            BTC to DASH exchange rate: ${JSON.stringify(arr)}

            Between Poloniex and Bittrex, the lowest ask is: ${arr[index].name}

        `)    
    })
})

