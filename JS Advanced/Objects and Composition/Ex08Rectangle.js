function rectangle(width, height, color){
    function capitalizeColor(x){
        return x[0].toUpperCase()+x.slice(1);
    }
    function calcArea(){
        return Number(this.width*this.height);
    }
    let rectangle = {
        width,
        height,
        color: capitalizeColor(color),
        calcArea,
    }
    return rectangle;
}

let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());