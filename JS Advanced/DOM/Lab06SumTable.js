function sumTable() {
    let tableRows = document.querySelectorAll("table tr");
    let sum=0;
    for (let i = 1; i < tableRows.length; i++) {
        let cols = tableRows[i].children;
        let cost = Number(cols[cols.length-1].textContent);
        sum+=cost;
    }
    document.getElementById("sum").textContent=sum;
}