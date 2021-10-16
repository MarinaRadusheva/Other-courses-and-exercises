function fromJSONToHTMLTable(input){
    let html= '';
    html+='<table>'+ '\n\t<tr>';

    let students = JSON.parse(input);
    let first = students[0];
    for(let key in first){
        html+=`<th>${key}</th>`;
    }
    html+='</tr>' + '\n';

    for(let i=0; i<students.length; i++){
        let student=students[i];
        html+=`\t<tr>`
        for(let key in student){
            let val = student[key];
        html+=`<td>${val}</td>`;
        }
        html+='</tr>\n';
    }
    html+='</table>';
    return html;
}
console.log(fromJSONToHTMLTable(['[{"Name":"Stamat","Price":5.5},{"Name":"Rumen","Price":6}]']));
console.log(fromJSONToHTMLTable(['[{"Name":"Pesho","Score":4," Grade":8},{"Name":"Gosho","Score":5," Grade":8},{"Name":"Angel","Score":5.50," Grade":10}]']));
