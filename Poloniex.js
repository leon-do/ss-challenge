// documentation at https://poloniex.com/support/api/

//npm module
var autobahn = require('autobahn');

//connect to poloniex's socket
var connection = new autobahn.Connection({
  url: "wss://api.poloniex.com",
  realm: "realm1"
});

// when the connection is open...
connection.onopen = function (session) {

        // subscribe to market event
        function marketEvent (args,kwargs) {
                //display real time market events
                console.log(args);
        }

        //subscribe to ticker event
        function tickerEvent (args,kwargs) {
                //display real time ticker events 
                // args = [currencyPair, last, lowestAsk, highestBid, percentChange, baseVolume, quoteVolume, isFrozen, 24hrHigh, 24hrLow]
                console.log(args);
        }

        // session.subscribe('BTC_ETH', marketEvent);
        // session.subscribe('ticker', tickerEvent);

}
 
connection.onclose = function () {
  console.log("Websocket connection closed");
}
                       
connection.open();