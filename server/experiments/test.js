var request = require('request');

var coin1 = 'BTC'
var coin2 = 'LTC'


request(`https://yobit.net/api/2/${coin2.toLowerCase()}_${coin1.toLowerCase()}/trades`, function (error, response, body) {

  var arr = JSON.parse(body).map(function(obj){ 
      var date = new Date(obj.date * 1000)
      return [date, obj.price]
  })
  console.log(arr)
});

