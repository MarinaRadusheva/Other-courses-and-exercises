function solve(input) {
    let array = [...input];
    let result = [];
    while (array.length) {
        let current = array.shift();
        if (isNaN(current) && result.length > 1) {
            let last = result.pop();
            let previous = result.pop();
            result.push(calc(previous, last, current));
        } else if (isNaN(current) && result.length <= 1) {
            console.log(`Error: not enough operands!`);
            return;
        } else {
            result.push(current);
        }
    }
    if (array.length == 0 && result.length == 1) {
        console.log(result.pop());
    }
    if (array.length == 0 && result.length > 1) {
        console.log(`Error: too many operands!`);
    }
    function calc(x, y, operator) {
        switch (operator) {
            case '+':
                return x + y;
                break;
            case '-':
                return x - y;
                break;
            case '*':
                return x * y;
                break;
            case '/':
                return x / y;
                break;
        }
    }
}

solve([3,
    4,
    '+']);
solve([5,
    3,
    4,
    '*',
    '-']);
solve([7,
    33,
    8,
    '-']);
solve([15,
    '/']);
