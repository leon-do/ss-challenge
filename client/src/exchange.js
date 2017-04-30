/*

display the lowest ask rate below the graph

data = 
"BTC-ETH": {
    "exchangeName": "yobit",
    "rate": 0.05030001
    },
"BTC-DASH": {
    "exchangeName": "yobit",
    "rate": 0.06813001
    },
"BTC-LTC": {
    "exchangeName": "yobit",
    "rate": 0.01120802
    }
}


*/

var requestExchange = new XMLHttpRequest();
requestExchange.open('GET', '/exchange', true);

//get exchange data on load
requestExchange.onload = function() {
    if (requestExchange.status >= 200 && requestExchange.status < 400) {

        //data from exchange
        var data = JSON.parse(requestExchange.responseText)
        console.log(data)

        //displays text below the graph
        document.getElementById('bthEthSummary').innerHTML =  `Between Poloniex, Yobit and Bittrex, the lowest ask is: <br> ${data['BTC-ETH'].exchangeName} at ${data['BTC-ETH'].rate}`
        document.getElementById('bthLtcSummary').innerHTML =  `Between Poloniex, Yobit and Bittrex, the lowest ask is: <br> ${data['BTC-LTC'].exchangeName} at ${data['BTC-LTC'].rate}`
        document.getElementById('bthDashSummary').innerHTML = `Between Poloniex, Yobit and Bittrex, the lowest ask is: <br> ${data['BTC-DASH'].exchangeName} at ${data['BTC-DASH'].rate}`

    }    
}

requestExchange.send();