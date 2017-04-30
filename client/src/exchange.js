// this displays the best exchange
/*

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


requestExchange.onload = function() {
    if (requestExchange.status >= 200 && requestExchange.status < 400) {

        //data from exchange

        var data = JSON.parse(requestExchange.responseText)
        document.getElementById('exchange').innerHTML = data['BTC-ETH'].rate
    }    
}

requestExchange.send();