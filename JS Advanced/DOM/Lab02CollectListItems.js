function extractText(){
    let nodes = document.querySelectorAll("ul#items li");
    let result = document.querySelector("#result")
    for(let i of nodes){
        result.value+=i.textContent + "\n";
    }
}