function SameNumbers(number){
    let firstDigit = number%10;
    let areSame = true;
    let result=0;
    while(number!=0){
        let currrentDigit = number%10;
        if(currrentDigit!=firstDigit){
            areSame=false;
        }
        result+=currrentDigit;
        number=(number-currrentDigit)/10;
    }
    console.log(areSame);
    console.log(result);
}
SameNumbers(2222222);
SameNumbers(1234);
SameNumbers(8);