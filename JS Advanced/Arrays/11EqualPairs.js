function EqualPairs(matrix) {
    let counter = 0;
    for (let i = 1; i < matrix.length; i++) {
        const row = matrix[i];
        const prevRow = matrix[i - 1];
        for(let k = 0; k<row.length; k++){
            if(row[k]==prevRow[k]){
                counter++;
            }

            if(i==1 && k<row.length-1 && (prevRow[k]==prevRow[k+1])){
                counter++;
            }

            if(k<row.length-1 && row[k]==row[k+1]){
                counter++;
            }
        }
    
    }
    return counter;
}

console.log(EqualPairs([['2', '3', '4', '7', '0'],
['4', '0', '5', '3', '4'],
['2', '3', '5', '4', '2'],
['9', '8', '7', '5', '4']]));

console.log(EqualPairs([['test', 'yes', 'yo', 'ho'],
['well', 'done', 'yo', '6'],
['not', 'done', 'yet', '5']]));