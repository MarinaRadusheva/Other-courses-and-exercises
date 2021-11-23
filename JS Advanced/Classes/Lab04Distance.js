class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }

    static distance(first, second){
        const a=first.x-second.x;
        const b = first.y-second.y;
        return Math.sqrt(a**2 + b**2);
    }
}