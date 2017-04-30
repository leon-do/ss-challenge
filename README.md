# shapeshift-challenge

### Getting Started
1. Install npm package `$ node install`
2. Start the server:
`$ node server.js`
3. Go to:
http://localhost:3000/


### Server Diagram
![alt tag](https://github.com/leon-do/shapeshift-challenge/blob/master/server/diagram/nodeJS%20diagram.png)


### Results Accessible APIs:
http://localhost:3000/exchange

http://localhost:3000/history/BTC_LTC

http://localhost:3000/history/BTC_DASH

http://localhost:3000/history/BTC_ETH


### Task
Joe wants to send 20 bitcoin to each of his three kids none of which have a bitcoin wallet. They have each requested that he send them coin in their favorite currencies: 
Ethereum, Litecoin, and DASH. 

Joe wants to get the best rates possible when he converts the coins to give his children. Write a web app that will find out what the best exchanges would be for each of these trades. The app should talk to two exchange (some suggestions: BTC-E, Poloniex, Bittrex) api's to get real data. 

The results should display what the exchange rate is at all the exchanges for each of the 3 trades Joe want do and highlight which is the best rate at each.

Other considerations:
For backend or full stack dev applicants:
    Please complete the challenge using Nodejs.  
    Can simply print out results in console log.

Extra points for: 
- using ES6/ES7 
- tracking results over time
    - Graph displays last 100 exchange rates
- integrating data from more exchanges
    - Poloniex, Bitrex and Yobit
- display how much more Joe will get when he makes each trade at exchange A vs exchange B
    - answer = (20btc / (btc_eth_rate_of_exchangeA)) - (20btc / (btc_eth_rate_of_exchangeB))
- make results accessible via an api
    - http://localhost:3000/exchange
    - http://localhost:3000/history/BTC_LTC
    - http://localhost:3000/history/BTC_DASH
    - http://localhost:3000/history/BTC_ETH
- display results in web page
    - http://localhost:3000/

