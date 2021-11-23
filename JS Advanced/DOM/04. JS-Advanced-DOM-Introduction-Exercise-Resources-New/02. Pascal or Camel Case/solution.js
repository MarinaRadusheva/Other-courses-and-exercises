function solve() {
  let text = document.getElementById("text").value;
  let conv = document.getElementById("naming-convention").value;
  let result = document.getElementById("result");
  if(!conv.includes("Pascal") && !conv.includes("Camel")){
    result.innerText="Error!";
  }
  else{
    textArr=text.toLowerCase().split(" ");
    let finalString="";
    for (let word of textArr) {
      finalString+=word[0].toUpperCase()+word.substring(1);
    }
    if(conv.includes("Camel")){
      finalString = finalString[0].toLowerCase()+finalString.substr(1);
    }
    result.innerText=finalString;
  }
  
}