function dayOfWeek(num){
    const allDays = {
        'Monday' : 1 ,
        'Tuesday' : 2,
        'Wednesday' : 3,
        'Thursday' : 4,
        'Friday' : 5,
        'Saturday' : 6,
        'Sunday' : 7,
    }
    if(!allDays[num]){
        return 'error';
    }
    else{
        return allDays[num];
    }
}

console.log('Monday');
console.log('Invalid');