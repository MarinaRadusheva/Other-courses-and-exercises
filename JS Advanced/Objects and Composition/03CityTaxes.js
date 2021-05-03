function cityTaxes(name, population, treasury){
    let city = {
        name,
        population,
        treasury,

        taxRate: 10,
        collectTaxes() {this.treasury+=Math.floor(this.population*this.taxRate)},
        applyGrowth(p) {this.population=Math.floor(this.population*(p+100)/100)},
        applyRecession(p) {this.treasury -= Math.ceil(this.treasury*p/100)}
    }
    return city;
}

const city = 
  cityTaxes('Tortuga',
  7000,
  15000);
console.log(city);
// const city =
//   cityTaxes('Tortuga',
//   7000,
//   15000);
// city.collectTaxes();
// console.log(city.treasury);
// city.applyGrowth(5);
// console.log(city.population);