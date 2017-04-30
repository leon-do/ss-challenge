// this displays the graph

var requestHistoryDash = new XMLHttpRequest();
requestHistoryDash.open('GET', '/history/BTC_DASH', true);

//on load, get BTC_DASH data for the graph.
requestHistoryDash.onload = function() {
    if (requestHistoryDash.status >= 200 && requestHistoryDash.status < 400) {

        //data for the graph
        var data = JSON.parse(requestHistoryDash.responseText);


        //building the graph
        Highcharts.chart('btcDash', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'BTC - DASH'
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
                },
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

requestHistoryDash.send();