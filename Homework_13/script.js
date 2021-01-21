'use strict';

function Hamburger(size) {
  this.size = size;
  this.toppings = [];
}

Hamburger.SIZE_SMALL = {
  price: 50,
  callories: 20,
};

Hamburger.SIZE_MEDIUM = {
  price: 75,
  callories: 30,
};

Hamburger.SIZE_BIG = {
  price: 100,
  callories: 40,
};

Hamburger.TOPPING_CHEESE = {
  price: 10,
  callories: 20,
};

Hamburger.TOPPING_SALAD = {
  price: 20,
  callories: 5,
};

Hamburger.TOPPING_POTATO = {
  price: 15,
  callories: 10,
};

Hamburger.TOPPING_SPICE = {
  price: 15,
  callories: 0,
};

Hamburger.TOPPING_MAYO = {
  price: 20,
  callories: 5,
};
Hamburger.prototype.addTopping = function (topping) {
  this.toppings.push(topping);
};

Hamburger.prototype.getCallories = function () {
  return this.toppings.reduce((acc, topping) => {
      return acc + topping.callories;
  }, this.size.callories);
};

Hamburger.prototype.getPrice = function () {
  return this.toppings.reduce((acc, topping) => {
      return acc + topping.price;
  }, this.size.price);
};

const myBurgerMedium = new Hamburger(Hamburger.SIZE_MEDIUM);

myBurgerMedium.addTopping(Hamburger.TOPPING_SALAD);
myBurgerMedium.addTopping(Hamburger.TOPPING_MAYO);
myBurgerMedium.addTopping(Hamburger.TOPPING_SPICE);

console.log('Price with sauce myBurgerMedium: ' + myBurgerMedium.getPrice() + ' tugriks;');
console.log('Callories with sauce myBurgerMedium: ' + myBurgerMedium.getCallories()+ ';');

const myBurgerBig = new Hamburger(Hamburger.SIZE_BIG);

myBurgerBig.addTopping(Hamburger.TOPPING_SALAD);
myBurgerBig.addTopping(Hamburger.TOPPING_SPICE);
myBurgerBig.addTopping(Hamburger.TOPPING_POTATO);
myBurgerBig.addTopping(Hamburger.TOPPING_MAYO);

console.log('Price with sauce myBurgerBig: ' + myBurgerBig.getPrice() + ' tugriks;');
console.log('Callories with sauce myBurgerBig: ' + myBurgerBig.getCallories()+ ';');


