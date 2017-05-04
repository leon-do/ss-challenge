/*
 given an array of rates, the function will find the lowest rate and return the index

 Example:
arr = [ { rate: 3, name: 'poloniex' }, { rate: 1, name: 'bittrex' }]
returns minIndex = 0
*/

exports.indexOfLowestVal = (arr, callback) => {
    
    // reduce loops through the array
    // compares previous (a) with next (b)
    // if a.rate < b.rate, checks what rate is smaller
    // returns the object: { rate: 1, name: 'bittrex' }
    // indexOf gets the index of the object
    let minIndex = arr.indexOf(arr.reduce((a,b) => a.rate < b.rate ? a : b))

    // Previous code.
    // var minIndex = 0
    // for (let i = 0; i < arr.length; i++){
    //     if (arr[minIndex].rate > arr[i].rate) {
    //         minIndex = i;
    //     }
    // }

    callback(minIndex)
}

