function Rotate(array, n){
    let result = [...array];
    for(let i=0; i<n; i++){
        const last = result.pop();
        result.unshift(last);
    }
    return result.join(' ');
}

console.log(Rotate(['1', '2', '3', '4'], 2));
console.log(Rotate(['Banana', 'Orange', 'Coconut', 'Apple'], 15));