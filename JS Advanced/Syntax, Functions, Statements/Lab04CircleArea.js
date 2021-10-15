function circleArea(radius){
    let argType = typeof(radius);
    if(argType!='number'){
        console.log(`We can not calculate the circle area, because we receive a ${argType}.`);
    }
    else{
        let area = Math.PI*(radius**2);
        console.log(area.toFixed(2));
    }
}

circleArea(5);
circleArea('name');