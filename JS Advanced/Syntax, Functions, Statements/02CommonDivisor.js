function GetGratestDivisor(first, second) {
    let gratestDivisor = 1;
    let smallerNum = Math.min(first, second);
    for (let i = 1; i <= smallerNum; i++) {
        if (first % i == 0 && second % i == 0) {
            gratestDivisor = i;
        }
    }
    console.log(gratestDivisor);
}
GetGratestDivisor(15, 5);
GetGratestDivisor(2154, 458);