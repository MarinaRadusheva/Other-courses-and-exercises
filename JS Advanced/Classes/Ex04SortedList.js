class List{
    constructor(){
        this.size=0;
        this.numbers=[];
    }

    add(element){
        this.numbers.push(element);
        this.size++;
        this.numbers.sort((a,b)=>a-b);
    }

    remove(index){
        if(index<0 || index>this.numbers.length-1){
            throw console.error("Invalid index");
        }
        this.numbers.splice(index,1);
        this.size--;
    }

    get(index){
        if(index<0 || index>this.numbers.length-1){
            throw console.error("Invalid index");
        }
        return this.numbers[index];
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(1));