function fromJSONToHTMLTable(input){
    let html= '';
    html+='<table>'+ '\n\t<tr>';
    for(let i=0; i<input.length; i++){
        let data=JSON.parse(input[i]);
        let keys = Object.keys(data);
        for(let key of keys){
        html+=`<th>${key}</th>`;
        }
        html+='</tr>';
    }
    html+='</table>';
    return html;
}
console.log(fromJSONToHTMLTable(['[{"Name":"Stamat","Price":5.5},{"Name":"Rumen","Price":6}]']));
