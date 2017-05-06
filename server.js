/*
    bestExchange returns the best exchanges and lowest rate 
    data =  
        { BTC_ETH: { exchangeName: 'yobit', rate: 0.05030001 },
          BTC_LTC: { exchangeName: 'yobit', rate: 0.01100107 },
          BTC_DASH: { exchangeName: 'yobit', rate: 0.06157018 } }


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
const bestExchange = require('./server/js/bestExchange.js')
// txHistory returns the 100 most recent transactions
const txHistory = require('./server/js/txHistory.js')
const express = require('express');
const app = express();

//index.html
app.use(express.static(__dirname + "/client"));

// http://localhost:3000/exchange
app.get('/exchange', (req,res) => {
    // bestExchange.lowestRate gets the lowst Ask Rate rates from poloniex, yobit and bitrex
    bestExchange.lowestRate().then((data) => {
        // the lowest rates are stored into the object called data
        res.send(data)
    })
})

// http://localhost:3000/history/BTC_LTC
app.get('/history/BTC_LTC', (req,res) => {
    txHistory.list('BTC', 'LTC').then((data) => {
        res.send(data)
    })
})


// http://localhost:3000/history/BTC_LTC
app.get('/history/BTC_ETH', (req,res) => {
    txHistory.list('BTC', 'ETH').then((data) => {
        res.send(data)
    })
})

// http://localhost:3000/history/BTC_DASH
app.get('/history/BTC_DASH', (req,res) => {
    txHistory.list('BTC', 'DASH').then((data) => {
        res.send(data)
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port port 3000")
});
