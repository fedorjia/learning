const clone = require('./index')


function Person(pname) {
	this.name = pname;
}


const oldObj = {
	a: function() {console.log('hi');},
	c: new RegExp('ab+c', 'i'),
	d: new Person('Messi'),
};
oldObj.b = oldObj; // 循环引用


// clone
const newObj = clone(oldObj);

console.log(newObj.a, oldObj.a); // [Function: say] [Function: say]
console.log(newObj.b, oldObj.b); // { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] } { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] }
console.log(newObj.c, oldObj.c); // /ab+c/i /ab+c/i
console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: person] [Function: person]
