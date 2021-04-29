function FindTwoSmallest(arr){
    arr.sort((a,b)=>a-b);
    const result = arr.slice(0,2);
    return result.join(' ');
}
console.log(FindTwoSmallest([30, 15, 50, 5]));
console.log(FindTwoSmallest([3, 0, 10, 4, 7, 3]));