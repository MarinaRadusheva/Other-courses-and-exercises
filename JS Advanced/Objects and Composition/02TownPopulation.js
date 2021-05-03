function TownRegistry(array){
    const registry = {};
    for(let item of array){
        const tokens = item.split(' <-> ');
        const townName = tokens[0];
        const townPopulation = Number(tokens[1]);
        if(registry[townName]==undefined){
            registry[townName]=townPopulation;
        } else{
            registry[townName]+=townPopulation;
        }
    }
    for(let name in registry){
        console.log(`${name} : ${registry[name]}`);
    }
}
TownRegistry(['Istanbul <-> 100000',
'Honk Kong <-> 2100004',
'Jerusalem <-> 2352344',
'Mexico City <-> 23401925',
'Istanbul <-> 1000']);