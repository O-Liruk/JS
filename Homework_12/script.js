'use strict';

function isArgumentValid(num) {
  return !isNaN(num);
}

function Calculator(num) {

      this.getResult =  num ; 
      this.sum = (value) => (isArgumentValid (value) ? this.getResult += value : null);
      this.sub = (value) => (isArgumentValid (value) ? this.getResult -= value : null);
      this.mult = (value) => (isArgumentValid (value) ? this.getResult *= value : null);
      this.div = (value) => (isArgumentValid (value) ? this.getResult /= value : null);
      this.set = (value) => (isArgumentValid (value) ? this.getResult = value : null);
      this.baseNumber = () => ('Base number = ' + num );
         
}

const calc =  new Calculator(10);

console.log(calc.mult(10));
console.log(calc.set(100));
console.log(calc.sum(5));
console.log(calc.sub(40)); 
console.log(calc.div(10));

console.log(calc.baseNumber());
console.log(calc.getResult) ;



