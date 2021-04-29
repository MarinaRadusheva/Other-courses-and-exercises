function split(arr){
    const result =[];
    for(let item of arr){
        if(item<0){
            result.unshift(item);
        } else{
            result.push(item);
        }
    }
    return result;
}
console.log(split([3, -2, 0, -1]));
console.log(split([7, -2, 8, 9]));