function CalculateTime(steps, length, velocity){
    let distance = steps*length;
    let breaksCount = Math.floor(distance/500);
    let time = ((distance/1000)/velocity)*60+breaksCount;
    let hours = Math.floor(time/60);
    let minutes = Math.floor(time%60);
    let seconds = Math.ceil((time-hours*60-minutes)*60);
    console.log(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`);
}
CalculateTime(4000, 0.60, 5);
CalculateTime(2564, 0.70, 5.5);