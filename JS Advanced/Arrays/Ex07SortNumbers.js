function sortNums(array) {
    const iterations = array.length/2;
    array.sort((a, b) => a - b);
    let result = [];
    for (let i = 0; i <= iterations; i++) {
        const smaller = array.shift();
        const bigger = array.pop();
        result.push(smaller);
        result.push(bigger);
    }
    return result;
}

console.log(sortNums([1, 65, 3, 52, 48, 63, 31, -3, 18, 56, 2]))

// -3 1 2 3 18 31 48 52 56 63 65
//-3 65 1 63 2 56 3 52 18 48 31
// -3 1 3 18 31 48 52 56 63 65
//-3 65 1 63 3 56 18 52 31 48