function diagonals(array) {
    let matrix = [];
    let resultMatrix = [];
    for (let item of array) {
        matrix.push(item.split(' ').map(Number));
        resultMatrix.push(new Array(array.length));
    }
    let sumFirst = 0;
    let sumSecond = 0;
    for (let i = 0; i < matrix.length; i++) {
        sumFirst += matrix[i][i];
        resultMatrix[i][i] = matrix[i][i];
        sumSecond += matrix[i][matrix.length - 1 - i];
        resultMatrix[i][matrix.length - 1 - i] = matrix[i][matrix.length - 1 - i];
    }
    if (sumFirst == sumSecond) {
        for (let resultItem of resultMatrix) {
            for(let k=0; k<resultItem.length; k++){
                if(resultItem[k]===undefined){
                    resultItem[k]=sumFirst;
                }
            }
        }
        PrintMatrix(resultMatrix);
    } else {
        PrintMatrix(matrix);
    }

    function PrintMatrix(arrayToPrint) {
        for (let item of arrayToPrint) {
            console.log(item.join(' '));
        }
    }
}
diagonals(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']);
    diagonals(['1 1 1',
    '1 1 1',
    '1 1 0']
    );