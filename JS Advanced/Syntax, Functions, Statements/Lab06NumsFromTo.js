function calculate(n,m){
    let result=0;
    let num1 = Number(n);
    let num2 = Number(m);
    for(let i=num1; i<=num2; i++){
        result +=i;
    }
    return result;
}

console.log(calculate('1', '5' ));
console.log(calculate('-8', '20'))