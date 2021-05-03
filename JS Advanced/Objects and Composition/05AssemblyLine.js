function createAssemblyLine() {
    const decorators = {};

    decorators.hasClima = (car) => {
        car.temp = 21;
        car.tempSettings = 21;
        car.adjustTemp = () => {
            if (car.temp < car.tempSettings) {
                car.temp++;
            } else if (car.temp > car.tempSettings) {
                car.temp--;
            }
        };
    }

    decorators.hasAudio = (car) =>{
        car.currentTrack = {name:null, artist:null};
        car.nowPlaying = () => {
            if(car.currentTrack.name!=null){
                console.log(`Now playing '${car.currentTrack.name}' by ${car.currentTrack.artist}`);
            }
        };
    }

    decorators.hasParktronic = (car) =>{
        car.checkDistance = (num) =>{
            let message="";
            if(num<0.1){
                message="Beep! Beep! Beep!";
            } else if(num<0.25){
                message="Beep! Beep!";
            } else if(num<0.5){
                message="Beep!";
            }
            console.log(message);
        }
    }

    return decorators;
}

const assemblyLine = createAssemblyLine();

const myCar = {
    make: 'Toyota',
    model: 'Avensis'
};
assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings=25;
myCar.adjustTemp();

assemblyLine.hasAudio(myCar);
console.log(myCar);
assemblyLine.hasAudio(myCar);
myCar.currentTrack = {
    name: 'Never Gonna Give You Up',
    artist: 'Rick Astley'
};
myCar.nowPlaying();
assemblyLine.hasParktronic(myCar);
myCar.checkDistance(0.4);
myCar.checkDistance(0.2);