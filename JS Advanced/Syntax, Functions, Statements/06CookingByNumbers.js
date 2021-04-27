function Cook(count, ...params){
    let start = parseInt(count);
    for(let i=0; i<params.length; i++){
        if(params[i]=='chop'){
            start/=2;
        } else if(params[i]=='dice'){
            start=Math.sqrt(start);
        } else if(params[i]=='spice'){
            start+=1;
        } else if(params[i]=='bake'){
            start*=3;
        } else if(params[i]=='fillet'){
            start=(start*10)*0.8/10;
        }
        console.log(start);
    }
}
Cook('32', 'chop', 'chop', 'chop', 'chop', 'chop');
Cook('9', 'dice', 'spice', 'chop', 'bake', 'fillet');