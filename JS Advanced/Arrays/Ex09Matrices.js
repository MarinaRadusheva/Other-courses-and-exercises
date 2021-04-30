function CheckIfMagic(matrix) {
    const sum = matrix[0].reduce((acc,c)=>acc+c);
    let result = true;
    for(let i=0; i<matrix.length; i++){
        const row = matrix[i];
        const currentRowSum = row.reduce((acc,c)=>acc+c);
        if(currentRowSum!=sum){
            result=false;
            break;
        }
        let colSum=0;
        for(let k=0; k<matrix.length; k++){
            colSum+=matrix[k][i];
        }
        if(colSum!=sum){
            result=false;
            break;
        }
    }
    return result;
}
 console.log(CheckIfMagic([[4, 5, 6],[6, 5, 4],[5, 5, 5]]));
 console.log(CheckIfMagic([[11, 32, 45],[21, 0, 1],[21, 1, 1]]));
