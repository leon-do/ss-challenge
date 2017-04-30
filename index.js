var bestExchange = require('./js/bestExchange.js')
var txHistory = require('./js/txHistory.js')

bestExchange.lowestRate(function(data){
    /*
    data returns the best exchanges and lowest rate 
    data =  
        { 'BTC-ETH': { exchangeName: 'yobit', rate: 0.05030001 },
          'BTC-LTC': { exchangeName: 'yobit', rate: 0.01100107 },
          'BTC-DASH': { exchangeName: 'yobit', rate: 0.06157018 } }
  */
    console.log(data)
})


txHistory.list(function(data){
    /*
        data lists transaction history date and rate
        data =
        { 
            poloniex: 
                [ { date: 1493541736000, rate: '0.01220002' }... ],
            bittrex: 
                [ { date: 1493541736000, rate: '0.01220002' }... ],
            yobit: 
                [ { date: 1493541736000, rate: '0.01220002' }... ]                
        }
    */
    console.log(data)
})