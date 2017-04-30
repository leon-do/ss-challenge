var request = new XMLHttpRequest();
request.open('GET', '/history', true);


request.onload = function() {
    if (request.status >= 200 && request.status < 400) {

        //data for the graph
        var data = JSON.parse(request.responseText);

        console.log(data.poloniex.slice(0,100).reverse())

        //building the graph
        Highcharts.chart('container', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Recent Exchange Rate History'
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
                min: 0
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
                data: data.bittrex.slice(0,100).reverse()
            }, {
                name: 'Poloniex',
                data: data.poloniex.slice(0,100).reverse()
            }, {
                name: 'Yobit',
                data: data.yobit.slice(0,100).reverse()
            }]
});
    } else {
        console.log('request error')
    }
};

request.send();