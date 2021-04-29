function DoubleAndReverse(array){
    let result = [];
    for(let i=1; i<array.length; i+=2){
        result.push(array[i]);
    }
    result = result.map(x=>x*2).reverse();
    return result.join(' ');
}

console.log(DoubleAndReverse([10, 15, 20, 25]));
console.log(DoubleAndReverse([3, 0, 10, 4, 7, 3]));