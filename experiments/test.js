var arr = [ { val: 12 , name: 'test1'}, { val: 33, name: 'test2' } , { val: 9 , name: 'test2'}, { val: 10 , name: 'test3'}]

var index = indexOfLowestVal(arr)

function indexOfLowestVal(){
    var minIndex = 0
    for (let i = 0; i < arr.length; i++){
        if (arr[minIndex].val > arr[i].val) {
            minIndex = i;
        }
    }

    return minIndex
}

console.log(index)