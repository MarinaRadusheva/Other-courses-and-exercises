function sortProducts(unsorted) {
    let array = unsorted.sort();
    let firstLetter = '';
    for (let item of array) {
        if (item[0] !== firstLetter) {
            firstLetter = item[0];
            console.log(firstLetter);
        }
        let position =item.indexOf(':');
        item = item.slice(0, position - 1) + item.slice(position, item.length);
        console.log('  ' + item);
    }
}

sortProducts(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']
);