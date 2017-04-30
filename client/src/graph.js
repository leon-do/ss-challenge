// this displays the graph

var requestHistory = new XMLHttpRequest();
requestHistory.open('GET', '/history', true);


requestHistory.onload = function() {
    if (requestHistory.status >= 200 && requestHistory.status < 400) {

        //data for the graph
        var data = JSON.parse(requestHistory.responseText);


        //building the graph
        Highcharts.chart('container', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Last 50 Exchange Rates'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: ''
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
                data: data.bittrex.reverse().splice(1,50)
            }, {
                name: 'Poloniex',
                data: data.poloniex.reverse().splice(0,50)
            }, {
                name: 'Yobit',
                data: data.yobit.reverse().splice(0,50)
            }]
});
    } else {
        console.log('request error')
    }
};

requestHistory.send();