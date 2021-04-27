function DistanceValidation(t1, r1, t2, r2) {
    function Validator(x1, y1, x2, y2) {
        let a = Math.abs(x1 - x2);
        let b = Math.abs(y1 - y2);
        let result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        if (Number.isInteger(result)) {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
        } else {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
        }
    }
    Validator(t1, r1, 0, 0);
    Validator(t2, r2, 0, 0);
    Validator(t1, r1, t2, r2)
}
DistanceValidation(3, 0, 0, 4);
DistanceValidation(2, 1, 1, 1);