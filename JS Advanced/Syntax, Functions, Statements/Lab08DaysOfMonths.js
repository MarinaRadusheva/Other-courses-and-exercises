function getDaysOfMonth(month, year){
let initialDate = new Date(year, month, 1);
let newDate = initialDate;
newDate.setDate(newDate.getDate()-1)
return newDate.getDate();
}

console.log(getDaysOfMonth(1,2012));
console.log(getDaysOfMonth(2, 2021));