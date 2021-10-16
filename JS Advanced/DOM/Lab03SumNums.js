function calc(){
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let result = document.getElementById("sum");
    let sum = Number(num1) + Number(num2);
    result.value=sum;
}