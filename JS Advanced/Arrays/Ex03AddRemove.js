function AddRemove(commands) {
    let result = [];
    let initial = 1;
    for (let item of commands) {
        switch (item) {
            case 'add':
                result.push(initial);
                break;
            case 'remove':
                result.pop();
                break;
        }
        initial++;
    }
    if(result.length!=0){
    return result.join('\n');
    }
    else{
        return 'Empty';
    }
}

console.log(AddRemove(['add', 'add', 'add', 'add']));
console.log(AddRemove(['add', 'add', 'remove', 'add', 'add']));
console.log(AddRemove(['remove', 'remove', 'remove']));