function sortArr(array){
   array.sort();
   for(let i=0; i<array.length; i++){
       array[i]=`${i+1}.${array[i]}`;
   }
    return array.join('\n');
}
console.log(sortArr(["John", "Bob", "Christina", "Ema"]));