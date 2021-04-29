function nthElement(array, n) {
    const result = [];
    for (let i = 0; i < array.length; i += n) {

        result.push(array[i]);
    }
    return result;
}

console.log(nthElement(['5', '20', '31', '4', '20'], 2));
