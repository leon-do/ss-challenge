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

var bestExchange = require('./server/js/bestExchange.js')
var txHistory = require('./server/js/txHistory.js')
var express = require('express');
var app = express();

//index.html
app.use(express.static(__dirname + "/client"));

// http://localhost:3000/exchange
app.get('/exchange', function(req,res){
    bestExchange.lowestRate(function(data){
        console.log(data)
        res.send(data)
    })
})

// http://localhost:3000/history
app.get('/history', function(req,res){
    txHistory.list(function(data){
        res.send(data)
    })
})



app.listen(process.env.PORT || 3000, function(){
    console.log("listening on port port 3000")
});
