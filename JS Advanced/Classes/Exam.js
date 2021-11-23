class SummerCamp{
    constructor(organizer,location){
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = {"child": 150, "student": 300, "collegian": 500};
        this.listOfParticipants = [];
    }

    registerParticipant (name, condition, money){
        if(!this.priceForTheCamp[condition]){
            throw new Error("Unsuccessful registration at the camp.");
        }
        if(this.listOfParticipants.some(el=>el.name==name)){
            return `The ${name} is already registered at the camp.`;
        }
        if(this.priceForTheCamp[condition]>Number(money)){
            return `The money is not enough to pay the stay at the camp.`
        }
        this.listOfParticipants.push({name: name, condition, power: 100, wins: 0});
        return `The ${name} was successfully registered.`
    }

    unregisterParticipant (name){
        let objToRemove = this.listOfParticipants.find(el=>el.name===name);
        if(!objToRemove){
            throw new Error(`The ${name} is not registered in the camp.`);
        }
        let indToRemove = this.listOfParticipants.indexOf(objToRemove);
        this.listOfParticipants.splice(indToRemove,1);
        return `The ${name} removed successfully.`
    }

    timeToPlay (typeOfGame, participant1, participant2){
        if(!participant2 && typeOfGame=="Battleship"){
            if(!this.listOfParticipants.some(el=>el.name==participant1)){
                throw new Error(`Invalid entered name/s.`);
            }
            this.listOfParticipants.find(el=>el.name===participant1).power+=20;
            return `The ${participant1} successfully completed the game ${typeOfGame}.`
        }
        else if(participant1 && participant2){
            if(!this.listOfParticipants.some(el=>el.name==participant1) || !this.listOfParticipants.some(el=>el.name==participant2)){
                throw new Error(`Invalid entered name/s.`);
            }
            const part1 = this.listOfParticipants.find(el=>el.name===participant1);
            const part2 = this.listOfParticipants.find(el=>el.name===participant2);
            if(part1.condition!=part2.condition){
                throw new Error(`Choose players with equal condition.`);
            }
            const power1 = part1.power;
            const power2 = part2.power;
            if(power1>power2){
                part1.wins++;
                return `The ${participant1} is winner in the game ${typeOfGame}.`;
            }
            else if(power2>power1){
                part2.wins++;
                return `The ${participant2} is winner in the game ${typeOfGame}.`;
            }
            else{
                return `There is no winner.`
            }
        }
    }

    toString(){
        let result = `${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}\n`;
        this.listOfParticipants.sort((a,b)=>b.wins-a.wins);
        this.listOfParticipants.forEach(el=>result+=`${el.name} - ${el.condition} - ${el.power} - ${el.wins}\n`)
        return result.trim();
    }

}

const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson"));
console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
//console.g(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Sara Dickinson"));
console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300));
console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Dimitur Kostov"));

console.log(summerCamp.toString());



