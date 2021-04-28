function ExtractWordsToUpper(string){
    //let re = new RegExp('[a-zA-Z0-9]+', 'g');
    let re = /\w+/g;
    const text = string+"";
    let words = text.match(re);
    for(let i = 0; i< words.length; i++){
        words[i]=words[i].toUpperCase();
    }
    return words.join(', ');
}
console.log(ExtractWordsToUpper('Hi, how are you?'));
console.log(ExtractWordsToUpper('hello'));