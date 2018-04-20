/*!
* @Author: fanger
* @Date:   2018-04-16 12:34:35
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-20 15:04:19
*/


// import './style.scss';


exports.x = 'b1';
console.log('b.js ', require('./a.js').x);
exports.x = 'b2';
console.log(require.main === module)