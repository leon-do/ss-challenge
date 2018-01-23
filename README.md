# ss-challenge

### Getting Started
- Install npm package `$ npm i`
- Start the server:
`$ node server.js`
- Go to:
http://localhost:3000/


### Screenshot
![alt tag](https://github.com/leon-do/shapeshift-challenge/blob/master/server/diagram/screenshot.png)


### Server Diagram
![alt tag](https://github.com/leon-do/shapeshift-challenge/blob/master/server/diagram/nodeJS%20diagram.png)


### Task
Joe wants to send 20 bitcoin to each of his three kids none of which have a bitcoin wallet. They have each requested that he send them coin in their favorite currencies: 
Ethereum, Litecoin, and DASH. 

Joe wants to get the best rates possible when he converts the coins to give his children. Write a web app that will find out what the best exchanges would be for each of these trades. The app should talk to two exchange (some suggestions: BTC-E, Poloniex, Bittrex) api's to get real data. 

The results should display what the exchange rate is at all the exchanges for each of the 3 trades Joe want do and highlight which is the best rate at each.
    - listed in the console

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
    - if    1 BTC = $1000 and 1 ETH = $50
    - then  1 BTC = 20 ETH (1000/50)
    - if    Joe has 20 BTC && decides to trade to ETH for his kid, 
    - then  his kid will recieve 20 * 20 = 400 ETH
        - his kids are very lucky
- make results accessible via an api
    - https://shapeshift-challenge.herokuapp.com/exchange
    - https://shapeshift-challenge.herokuapp.com/history/BTC_LTC
    - https://shapeshift-challenge.herokuapp.com/history/BTC_DASH
    - https://shapeshift-challenge.herokuapp.com/history/BTC_ETH
- display results in web page
    - http://localhost:3000/
    - https://shapeshift-challenge.herokuapp.com/

## Notes

https://info.shapeshift.io/blog/2016/01/21/shapeshift-101-how-calculate-instant-rate
