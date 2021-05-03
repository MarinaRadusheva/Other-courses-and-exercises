function getLowestPrice(input) {
    let allProducts = {};
    for (let item of input) {
        let [town, product, price] = item.split(' | ');
        price = Number(price);
        if (!allProducts[product]) {
            allProducts[product] = [{ town, price }];
        }
        else if (!allProducts[product][town]) {
            allProducts[product].push({ town, price });
        }
        else {
            allProducts[product][town].price = price;
        }
    }
    let result = [];
    for (let item of Object.keys(allProducts)) {
        let lowestPrice = Number.MAX_VALUE;
        let lowestTown = '';
        let sth = allProducts[item];
        for (let town of sth) {
            if (town.price < lowestPrice) {
                lowestPrice = town.price;
                lowestTown = town.town;
            }
        }
        result.push(`${item} -> ${lowestPrice} (${lowestTown})`);
    }
    return result.join('\n');
}

console.log(getLowestPrice(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10']));