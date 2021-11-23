class Company{
    constructor(){
        this.departments = {};
    }
    addEmployee(name, salary, position, department){
        if(!name || !salary || !position || !department ||Number(salary)<0){
            throw console.error("Invalid input!");
        }
        if(!this.departments[department]){
            this.departments[department]=[];
        }
        this.departments[department].push({name, position, salary});
        return `New employee is hired. Name: ${name}. Position: ${position}`;
    }
    bestDepartment(){
        let currentBest={
            name: "",
            salary: 0
        };
        for (let depKey in this.departments) {
            let avgSalary = 0;
            for (let empKey in this.departments[depKey]) {
                avgSalary+=this.departments[depKey][empKey].salary;
            }
            avgSalary/=this.departments[depKey].length;

            if(currentBest.salary<avgSalary){
                currentBest.salary=avgSalary;
                currentBest.name=depKey;
            }
        }
        this.departments[currentBest.name].sort((a,b)=>{
            return b.salary-a.salary || a.name.localeCompare(b.name)
        });

        let result = `Best Department is: ${currentBest.name}\n`;
        result+=`Average salary: ${currentBest.salary}\n`;
        this.departments[currentBest.name].forEach(el => {
            result+=`${el.name} ${el.salary} ${el.position}\n`            
        });

        return result.trim;
    }
        
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());