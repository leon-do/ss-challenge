// this displays the graph

var requestHistoryETH = new XMLHttpRequest();
requestHistoryETH.open('GET', '/history/BTC_ETH', true);


requestHistoryETH.onload = function() {
    if (requestHistoryETH.status >= 200 && requestHistoryETH.status < 400) {

        //data for the graph
        var data = JSON.parse(requestHistoryETH.responseText);


        //building the graph
        Highcharts.chart('btcEth', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'BTC - ETH'
            },
            subtitle: {
                text: 'Last 100 Exchange Rates'
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    enabled:false
                }
            },
            yAxis: {
                title: {
                    text: 'Rate (%)'
                }
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },

            series: [{
                name: 'Bittrex',
                data: data.bittrex.reverse().splice(1,100)
            }, {
                name: 'Poloniex',
                data: data.poloniex.reverse().splice(0,100)
            }, {
                name: 'Yobit',
                data: data.yobit.reverse().splice(0,100)
            }]
});
    } else {
        console.log('request error')
    }
};

requestHistoryETH.send();