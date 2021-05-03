function heroFactory(input){
    let allHeroes =[];
    for(let item of input){
        let [name, level, items] = item.split(' / ');
        level=Number(level);
        items = items ? items.split(', ') : [];
        allHeroes.push({name, level, items});
    }
    return JSON.stringify(allHeroes);
}

console.log(heroFactory(['Isacc / 25 / Apple, GravityGun',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara']));