function pies(flavours, first, second){
    const firstIndex = flavours.indexOf(first);
    const secondIndex = flavours.indexOf(second)+1;
    const result = flavours.slice(firstIndex, secondIndex);
    return result;
}

console.log(pies(['Pumpkin Pie',
'Key Lime Pie',
'Cherry Pie',
'Lemon Meringue Pie',
'Sugar Cream Pie'],
'Key Lime Pie',
'Lemon Meringue Pie'));
console.log(pies(['Apple Crisp',
'Mississippi Mud Pie',
'Pot Pie',
'Steak and Cheese Pie',
'Butter Chicken Pie',
'Smoked Fish Pie'],
'Pot Pie',
'Smoked Fish Pie'));