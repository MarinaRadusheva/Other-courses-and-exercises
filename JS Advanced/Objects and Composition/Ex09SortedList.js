function createSortedList(){
    function add(x){
        this.list.push(x);
        this.list.sort((a,b)=>a-b);
        this.size++;
    }
    function remove(x){
        if(this.size>x && x>=0){
        this.list.splice(x,1);
        this.size--;
        }
    }
    function get(x){
        if(this.size>x && x>=0){
            return this.list[x];
        }
    }
    let list ={
        list: [],
        size: 0,
        add,
        remove,
        get,
    }
    return list;
}

let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(1));