function GetBiggest(matrix){
    let biggestNum=-Number.MAX_VALUE;
    for(let i = 0; i< matrix.length; i++){
        const row = matrix[i];
        for(let k=0; k<row.length; k++){
            biggestNum = row[k]>biggestNum ? row[k] : biggestNum;
        }
    }
    return biggestNum;
}
console.log(GetBiggest([[20, 50, 10],
    [8, 33, 145]]));