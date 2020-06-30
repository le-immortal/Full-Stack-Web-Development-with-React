var rect = require('./rectangle');

function solveRect(l,b){
    console.log(`solving for rect with l = ${l} and b = ${b}`);

    if(l<= 0|| b <=0)
    console.log("length should be greater than zero");
    else
    {
        console.log("area is " + rect.area(l,b));
        console.log("perimeter is " + rect.perimeter(l,b));

    }
}

solveRect(2,4);
solveRect(-1, 0);
solveRect(4,5);