class Stringer{
    constructor(string, length){
        this.innerString = string;
        this.innerLength=Number(length);
    }

    increase(size){
        this.innerLength+=size;
    }

    decrease(size){
        if(size>this.innerLength){
            this.innerLength=0;
        }
        else{
            this.innerLength-=size;
        }
    }

    toString(){
        if(this.innerString.length>this.innerLength){
            return`${this.innerString.slice(0, this.innerLength)}...`;
        }
        return this.innerString;
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4); 
console.log(test.toString()); // Test