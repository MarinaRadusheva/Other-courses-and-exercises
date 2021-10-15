function calculate(num1, num2, operator){
    let result=num1;
    switch (operator){
        case '+' : result+=num2; break;
        case '-' : result-=num2; break;
        case '/' : result/=num2; break;
        case '*' : result*=num2; break;
        case '%' : result%=num2; break;
        case '**' : result=result**num2; break;
    }
    console.log(result);
}

calculate(5, 6, '+');
calculate(3, 5.5,'*');
calculate(7, 3,'%');