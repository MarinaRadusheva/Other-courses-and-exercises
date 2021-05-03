function createObject(input){
    let newObject = {};
    for(let i=0; i<input.length; i+=2){
        newObject[input[i]]=Number(input[i+1]);
    }
    return newObject;
}

console.log(createObject(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']));