function diagonals(matrix) {
    let primary = 0;
    let secondary = 0;
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        primary += row[i];
        secondary += row[row.length - 1 - i];
    }
    return (primary + ' ' + secondary);
}

console.log(diagonals([[20, 40],
[10, 60]]));
console.log(diagonals([[3, 5, 17],
[-1, 7, 14],
[1, -8, 89]]));