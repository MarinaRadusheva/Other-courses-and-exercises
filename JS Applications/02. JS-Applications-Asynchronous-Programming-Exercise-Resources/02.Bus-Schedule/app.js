function solve() {

    var stopId = '';
    var stopName ='';
    var nextStop = '';
    var stopNameEl = document.getElementById('info');
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    function depart() {
        departButton.disabled=true;
        arriveButton.disabled = false;
        if(stopNameEl.textContent=='Not Connected')
        {stopId='depot';}
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopId}`)
        .then(res=>{
            if(res.status != 200){
                throw new Error('End of route');
            }
            return res.json();
        })
        .then(data=>{
            stopName=data.name
            stopNameEl.textContent = `Next stop ${stopName}`;
            stopId=data.next;
            
        })
        .catch(error=>{
            stopNameEl.textContent='Error';
        });
        
    }

    function arrive() {
        departButton.disabled=false;
        arriveButton.disabled = true;
        stopNameEl.textContent=`Arriving at ${stopName}`;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();