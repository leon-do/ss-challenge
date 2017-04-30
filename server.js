/*
    bestExchange returns the best exchanges and lowest rate 
    data =  
        { 'BTC-ETH': { exchangeName: 'yobit', rate: 0.05030001 },
          'BTC-LTC': { exchangeName: 'yobit', rate: 0.01100107 },
          'BTC-DASH': { exchangeName: 'yobit', rate: 0.06157018 } }


    txHistory lists transaction history date and rate
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

// bestExchange gets the lowest rates
var bestExchange = require('./server/js/bestExchange.js')
// txHistory returns the 100 most recent transactions
var txHistory = require('./server/js/txHistory.js')
var express = require('express');
var app = express();

//index.html
app.use(express.static(__dirname + "/client"));

// http://localhost:3000/exchange
app.get('/exchange', function(req,res){
    // bestExchange.lowestRate gets the lowst Ask Rate rates from poloniex, yobit and bitrex
    bestExchange.lowestRate(function(data){
        // the lowest rates are stored into the object called data
        res.send(data)
    })
})

// http://localhost:3000/history/BTC_LTC
app.get('/history/BTC_LTC', function(req,res){
    txHistory.list('BTC', 'LTC',function(data){
        res.send(data)
    })
})


// http://localhost:3000/history/BTC_LTC
app.get('/history/BTC_ETH', function(req,res){
    txHistory.list('BTC', 'ETH',function(data){
        res.send(data)
    })
})

// http://localhost:3000/history/BTC_DASH
app.get('/history/BTC_DASH', function(req,res){
    txHistory.list('BTC', 'DASH',function(data){
        res.send(data)
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("listening on port port 3000")
});
