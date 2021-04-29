function GetBiggerhalf(array){
    const sorted = array.sort((a,b)=>a-b);
    return sorted.slice(sorted.length/2);
}
console.log(GetBiggerhalf([4, 7, 2, 5]));
console.log(GetBiggerhalf([3, 19, 14, 7, 2, 19, 6]));