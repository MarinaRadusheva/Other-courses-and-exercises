function createCar(input) {
    const types = {
        Hatchback: { type: 'hatchback', color: null },
        Coupe: { type: 'coupe', color: null }
    };
    const engines = {
        Small: { power: 90, volume: 1800 },
        Normal: { power: 120, volume: 2400 },
        Monster: { power: 200, volume: 3500 }
    };
    let car = {};
    car.model = input.model;

    if (input.power <= 90) {
        car.engine = engines.Small;
    } else if (input.power <= 120) {
        car.engine = engines.Normal;
    } else {
        car.engine = engines.Monster;
    }

    if (input.carriage == 'hatchback') {
        car.carriage = types.Hatchback;
    } else {
        car.carriage = types.Coupe;
    }
    car.carriage.color = input.color;

    let wheels = input.wheelsize % 2 == 0 ? input.wheelsize - 1 : input.wheelsize;
    car.wheels = new Array(4).fill(wheels);
    return car;

}

console.log(createCar({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}
));