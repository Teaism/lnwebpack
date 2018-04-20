/*!
* @Author: fanger
* @Date:   2018-04-16 12:34:35
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-20 15:06:55
*/


// import './style.scss';


var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};