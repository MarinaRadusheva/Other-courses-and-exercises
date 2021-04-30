function SortStrings(array) {
    array.sort(compare);
    return array.join('\n');
    function compare(a, b) {
        if (a.length < b.length) {
            return -1;
        }
        if (a.length > b.length) {
            return 1;
        }

        return compareAlphabeticaly(a, b);
    }

    function compareAlphabeticaly(a, b) {
        return a.localeCompare(b);
    }
}

console.log(SortStrings(['alpha', 'beta', 'gamma']));
console.log(SortStrings(['Isacc', 'Theodor', 'Jack', 'Harrison', 'George']));
console.log(SortStrings(['test', 'Deny', 'omen', 'Default']));