function solve(tickets, criteria){

    class Ticket{
        constructor(destination, price, status){
            this.destination=destination;
            this.price=Number(price);
            this.status=status;
        }
    }
    let allTickets=[];
    for (let ticket of tickets) {
        split = ticket.split("|");
        allTickets.push(new Ticket(split[0], split[1], split[2]));
    }
    if(criteria=="destination"){
        allTickets.sort((a,b)=>a.destination.localeCompare(b.destination));
    }
    else if(criteria=="price"){
        allTickets.sort((a,b)=>a.price-b.price)
    }
    else{
        allTickets.sort((a,b)=>a.status.localeCompare(b.status));
    }

    return allTickets;
}

console.log(solve(['Philadelphia|94.20|available',
 'New York City|95.99|available',
 'New York City|95.99|sold',
 'Boston|126.20|departed'],
'destination'));