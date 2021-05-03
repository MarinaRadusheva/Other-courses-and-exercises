function fixWorker(worker){
    if(worker.dizziness){
        let addedWater = 0.1*worker.weight*worker.experience;
        worker.levelOfHydrated+=addedWater;
        worker.dizziness=false;
    }
    return worker;
}

console.log(fixWorker({ weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true }));