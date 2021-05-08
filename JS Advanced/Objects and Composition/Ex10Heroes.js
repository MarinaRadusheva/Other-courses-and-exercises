function solve(){
    const canFight = (hero) => ({
        fight: () =>{
            console.log(`${hero.name} slashes at the foe!`);
            hero.stamina--;
        }
    })
    const canCast = (hero) => ({
        cast: (spell) => {
            console.log(`${hero.name} cast ${spell}`);
            hero.mana--;
        }
    })
    const fighter = (name) => {
        let hero = {
            name,
            health: 100,
            stamina: 100,
        }
        return Object.assign(hero, canFight(hero));
    }
    const mage = (name) => {
        let hero = {
            name,
            health: 100,
            mana: 100,
        }
        return Object.assign(hero, canCast(hero));
    }
    
   
    return {fighter: fighter, mage: mage};
}


let create = solve();
const scorcher = create.mage("Scorcher");
scorcher.cast("fireball")
scorcher.cast("thunder")
scorcher.cast("light")

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight()

console.log(scorcher2.stamina);
console.log(scorcher.mana);
