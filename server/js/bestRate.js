/*
 given an array of rates, the function will find the lowest rate and return the index
data structure: [ { rate: 0.05256994, name: 'poloniex' }, { rate: 0.0525892, name: 'bittrex' } ]
returns minIndex = 0
*/

exports.indexOfLowestVal = function(arr, callback) {
    
    var minIndex = 0
    for (let i = 0; i < arr.length; i++){
        if (arr[minIndex].rate > arr[i].rate) {
            minIndex = i;
        }
    }
    callback(minIndex)
}

