function getInfo() {
    const busId = document.getElementById('stopId').value;
    const stopNameEl = document.getElementById('stopName');
    const busesListEl = document.getElementById('buses');
    busesListEl.replaceChildren();
    stopNameEl.textContent='Loading...';
    fetch(`http://localhost:3030/jsonstore/bus/businfo/${busId}`)
    .then(res=>{
        
        if(res.status!=200){
            throw new Error('Stop Id not found');
        }
        return res.json();
    })
    .then(data=>{
        console.log(data);       
        stopNameEl.textContent=data.name;        
        console.log(typeof(data.buses));
        Object.entries(data.buses).forEach(bus => {
           console.log(bus);
            newLi = document.createElement('li');
            newLi.textContent=`Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            busesListEl.appendChild(newLi);
        });
    })
    .catch(error => { stopNameEl.textContent='Error'});
}