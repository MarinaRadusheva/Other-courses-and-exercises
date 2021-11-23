function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);
   class Employee{
      constructor(name, salary){
         this.name=name;
         this.salary=salary;
      }
   }
   class Restaurant{
      constructor(name){
         this.name=name;
         this.employees = [];
      }
      avgSalary(){
         let avg = 0;
         for (let emp of this.employees) {
            avg+=emp.salary;
         }
         avg/=this.employees.length;
         return avg;
      }
      highestSalary(){
         let salary = 0;
         this.employees.forEach(e=>{
            if(e.salary>salary){
               salary=e.salary;
            }
         });
         return salary;
      }
   }


   function onClick () {
      let arr = eval(document.querySelector("div textarea").value);
      let allRestaurants =[];
      arr.forEach(el => {
         let splitInfo = el.split(" - ");
         let name = splitInfo[0];
         if(!allRestaurants.some(res=>res.name==name)){
            allRestaurants.push(new Restaurant(name));
         }
         let currentRestaurant = allRestaurants.find(res=>res.name==name);
         let workers = splitInfo[1].split(", ");
         workers.forEach(worker =>{
            let [workerName, workerSalary] = worker.split(" ");
            currentRestaurant.employees.push(new Employee(workerName, Number(workerSalary)));
         })
      });

      let highestAvg = 0;
      allRestaurants.forEach(res=>{
         if(res.avgSalary()>highestAvg){
            highestAvg=res.avgSalary();
         }
      });
      let bestRest=allRestaurants.find(x=>x.avgSalary()==highestAvg);
      let bestRestString = `Name: ${bestRest.name} Average Salary: ${highestAvg.toFixed(2)} Best Salary: ${bestRest.highestSalary().toFixed(2)}`;
      let bestRestP = document.querySelector("div #bestRestaurant p");
      bestRestP.textContent=bestRestString;
      let bestWorkersString ="";
      bestRest.employees.sort((a, b)=>b.salary-a.salary);
      bestRest.employees.forEach(e=>{
         bestWorkersString+= `Name: ${e.name} With Salary: ${e.salary} `; 
      });
      let bestWorkersP = document.querySelector("div #workers p");
      bestWorkersP.textContent=bestWorkersString.trim();
   }
}