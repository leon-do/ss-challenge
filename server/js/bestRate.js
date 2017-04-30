/*
 given an array of rates, the function will find the lowest rate and return the index

 Example:
arr = [ { rate: 0.000001, name: 'poloniex' }, { rate: 0.99999, name: 'bittrex' } ]
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

