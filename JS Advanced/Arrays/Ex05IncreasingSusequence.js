function GetSubsequence(array){
    const result=[];
    let bigggestNum = array[0];
    for(let i=0; i<array.length; i++){
        if(array[i]>=bigggestNum){
            result.push(array[i]);
            bigggestNum=array[i];
        }
    }
    return result;
}

console.log(GetSubsequence([1, 3, 8, 4, 10, 12, 3, 2, 24]));