var exchange = require('./exchange.js')
var bestRate = require('./bestRate.js')


// calls a funciton from exchange.js
exchange.rates('BTC','ETH', function(arr){
    // calls funtion from bestRate.js
    console.log(arr)
    bestRate.indexOfLowestVal(arr, function(index){
        console.log(arr[index].name)
    })
})

exchange.rates('BTC','LTC', function(arr){
        console.log(arr)

    bestRate.indexOfLowestVal(arr, function(index){
        console.log(arr[index].name)
    })
})

exchange.rates('BTC','DASH', function(arr){
        console.log(arr)

    bestRate.indexOfLowestVal(arr, function(index){
        console.log(arr[index].name)
    })
})

