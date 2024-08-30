
const number = prompt('pick number?');

console.log('your number is:', number);

let z = (Math.floor(Math.random()*100));

if(number>z){

    console.log("too big")

}

else if(number<z){

    console.log("too small")

}

else {

    console.log("bingo!")
}


