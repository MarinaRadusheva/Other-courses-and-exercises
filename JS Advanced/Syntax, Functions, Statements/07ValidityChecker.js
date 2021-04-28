function DistanceValidation(t1, r1, t2, r2) {
    function Validator(x1, y1, x2, y2) {
        const a = Math.abs(x1 - x2);
        const b = Math.abs(y1 - y2);
        const result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        const status = Number.isInteger(result) ? 'valid' : 'invalid';
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${status}`);

    }
    Validator(t1, r1, 0, 0);
    Validator(t2, r2, 0, 0);
    Validator(t1, r1, t2, r2)
}
DistanceValidation(3, 0, 0, 4);
DistanceValidation(2, 1, 1, 1);