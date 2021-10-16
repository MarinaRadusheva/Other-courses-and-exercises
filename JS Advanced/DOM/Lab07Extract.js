function extract(contentId){
    let element = document.getElementById(contentId).textContent;
        let pattern = /\(([^)]+)\)/g;
        let result =[];
        let match = pattern.exec(element);
        while(match){
            result.push(match[1]);
            match = pattern.exec(element);
        }
        return result.join("; ");
    }