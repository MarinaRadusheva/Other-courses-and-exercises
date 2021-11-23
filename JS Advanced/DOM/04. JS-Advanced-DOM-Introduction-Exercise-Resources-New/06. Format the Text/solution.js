function solve() {
  let input = document.getElementById("input").value.split(".").filter((el)=>el!="");
  let output = document.getElementById("output");
  let result = "";
  let counter=0;
  for(let i=0; i<input.length; i++){
    if(counter==0){
      result+="<p>";
    }
    counter++;
    result+=`${input[i]}.`;
    if(counter==3 || i==input.length-1){
      counter=0;
      result+="</p>";
    }
  }
  output.innerHTML=result;
}