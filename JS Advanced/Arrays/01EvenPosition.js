function evenElements(arr){
    const result = [];
    for(let i=0; i<arr.length; i+=2){
        result[result.length]=arr[i];
    }
    return result.join(' ');
}
console.log(evenElements(['20', '30', '40', '50', '60']));
console.log(evenElements(['5', '10']));