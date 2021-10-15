function GetPreviousDay(year, month, day){
    const input = new Date(year, month-1, day);
    const result = new Date(input);
    result.setDate(result.getDate()-1);
    return `${result.getFullYear()}-${result.getMonth()+1}-${result.getDate()}`;
}

console.log(GetPreviousDay(2016, 9, 30));
console.log(GetPreviousDay(2016, 10, 1));

