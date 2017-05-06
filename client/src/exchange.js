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

const requestExchange = new XMLHttpRequest();
requestExchange.open('GET', '/exchange', true);

//get exchange data on load
requestExchange.onload = () => {
    if (requestExchange.status >= 200 && requestExchange.status < 400) {

        //data from exchange
        let data = JSON.parse(requestExchange.responseText)
        console.log(data)

        //displays text below the graph
        document.getElementById('title').innerHTML = `
            BTC-ETH : ${data["BTC_ETH"].exchangeName} at ${data['BTC_ETH'].rate} <br>
            BTC-LTC : ${data["BTC_LTC"].exchangeName} at ${data['BTC_LTC'].rate} <br>
            BTC-DASH : ${data["BTC_DASH"].exchangeName} at ${data['BTC_DASH'].rate} <br>            
        `
        document.getElementById('bthEthSummary').innerHTML =  `Between Poloniex, Yobit and Bittrex, the lowest ask is <br> ${data['BTC_ETH'].exchangeName} at ${data['BTC_ETH'].rate} BTC for 1 ETH <br> at <br> ${new Date()}`
        document.getElementById('bthLtcSummary').innerHTML =  `Between Poloniex, Yobit and Bittrex, the lowest ask is <br> ${data['BTC_LTC'].exchangeName} at ${data['BTC_LTC'].rate} BTC for 1 LTC <br> at <br> ${new Date()}`
        document.getElementById('bthDashSummary').innerHTML = `Between Poloniex, Yobit and Bittrex, the lowest ask is <br> ${data['BTC_DASH'].exchangeName} at ${data['BTC_DASH'].rate} BTC for 1 DASH <br> at <br> ${new Date()}`

    }    
}

requestExchange.send();