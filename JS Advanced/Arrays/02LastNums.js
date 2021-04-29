function solve(n,k){
    const result =[1];
    while(result.length<n){
        const nextEl = result.slice(-k).reduce((acc, c)=>acc+c, 0);
        result.push(nextEl);
    }
    return result;
}
console.log(solve(8, 2));
console.log(solve(6, 3));