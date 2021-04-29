function sum(arr){
    const first = Number(arr[0]);
    const last = Number(arr[arr.length-1]);
    return first+last;
}
console.log(sum(['20', '30', '40']));
console.log(sum(['5', '10']));