var rect = require('./rectangle');
const rectangle = require('./rectangle');

function solveRect(l,b){
    console.log(`solving for rect with l = ${l} and b = ${b}`);

    rect(l,b,(err, rectangle) =>{
        if(err){
            console.log("Error: ", err.message);
        }
        else{
            console.log("area is " + rectangle.area());
            console.log("perimeter is " + rectangle.perimeter());
        }
    });
    console.log("This statement after the call to rect()");
    
}

solveRect(2,4);
solveRect(-1, 0);
solveRect(4,5);