const circle = require("./circle");
const Square = require("./square");

const sq = new Square(10);

console.log(`The area of a square of side 10 is ${sq.area()}`);
console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);
