/*!
* @Author: fanger
* @Date:   2018-04-16 12:34:35
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-20 15:07:06
*/


// import './style.scss';


// console.log('main.js ', require('./a.js').x);
// console.log('main.js ', require('./b.js').x);


var counter = require('./lib').counter;
var incCounter = require('./lib').incCounter;

console.log(counter);  // 3
incCounter();
incCounter();
console.log(counter); // 3