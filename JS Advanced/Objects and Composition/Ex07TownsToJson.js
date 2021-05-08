function convert(input){
    let output = [];
    let inputCopy =[...input];
    let properties=inputCopy.shift().split(/\s*\|\s*/).filter(x=>x!='');
    let values = [...inputCopy];
    for(let val of values){
        let splitValues = val.split(/\s*\|\s*/).filter(x=>x!='');
        splitValues[1] = Number(Number(splitValues[1]).toFixed(2).replace(/\.?0+$/, ''));
        splitValues[2] = Number(Number(splitValues[2]).toFixed(2).replace(/\.?0+$/, ''));
        let newObj = {};
        for(let i=0; i<splitValues.length; i++){
            
            newObj[properties[i]]=splitValues[i];
        } 
        output.push(newObj);
    }
    return JSON.stringify(output);
}

console.log(convert(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |']));