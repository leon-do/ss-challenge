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

        function marketEvent (args,kwargs) {
                console.log(args);
        }
        function tickerEvent (args,kwargs) {
                console.log(args);
        }
        // session.subscribe('BTC_ETH', marketEvent);
        // session.subscribe('ticker', tickerEvent);
        
}
 
connection.onclose = function () {
  console.log("Websocket connection closed");
}
                       
connection.open();