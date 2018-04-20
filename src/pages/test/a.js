/*!
* @Author: fanger
* @Date:   2018-04-16 12:34:35
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-20 14:54:20
*/


// import './style.scss';


/*document.getElementById('click-btn').addEventListener('click', function(){
	alert('hello fang')
})*/

exports.x = 'a1';
console.log('a.js ', require('./b.js').x);
exports.x = 'a2';