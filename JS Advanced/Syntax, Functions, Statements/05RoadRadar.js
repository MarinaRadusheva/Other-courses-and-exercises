function WithinTheLimit(speed, area) {
    const mtrwaySpeed = 130;
    const interSpeed = 90;
    const citySpeed = 50;
    const residentialSpeed = 20;
    let areaSpeed;
    if (area == 'motorway') {
        areaSpeed = mtrwaySpeed;
    } else if (area == 'interstate') {
        areaSpeed = interSpeed;
    } else if (area == 'city') {
        areaSpeed = citySpeed;
    } else {
        areaSpeed = residentialSpeed;
    }
    if (speed <= areaSpeed) {
        console.log(`Driving ${speed} km/h in a ${areaSpeed} zone`)
    } else {
        let difference = speed - areaSpeed;
        let status;
        if (difference <= 20) {
            status = 'speeding';
        } else if (difference <= 40) {
            status = 'excessive speeding';
        } else {
            status = 'reckless driving';
        }
        console.log(`The speed is ${difference} km/h faster than the allowed speed of ${areaSpeed} - ${status}`);
    }
}
WithinTheLimit(40, 'city');
WithinTheLimit(21, 'residential');
WithinTheLimit(120, 'interstate');
WithinTheLimit(200, 'motorway');