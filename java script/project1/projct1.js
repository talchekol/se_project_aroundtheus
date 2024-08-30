/**function random(num){ תכנית שמגרילה מספר בין 1 ל0
    
    let x=0;
    
    let y=1;
    
    let z = Math.random();
     
    console.log(z); 
    
    }
    
    random()
   */ 

function random(num){ //תכנית שמגרילה 3 מספרים בין 1- ל100
    
let x=0;

let y=1;

let z = (Math.floor(Math.random()*100));

let d = (Math.floor(Math.random()*100));

let t = (Math.floor(Math.random()*100));

    
if(z > d || t ){

    console.log(z);

}
else if(d > z || t){

console.log(d);
}

else console.log(t);


   
}

random()

/**console.log(z , d , t)
}

random()
*/



