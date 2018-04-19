/*!
* @Author: fanger
* @Date:   2018-04-16 12:34:35
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-18 18:10:11
*/


//a.js
define(function(){
     console.log('a.js执行');
     return {
          hello: function(){
               console.log('hello, a.js');
          }
     }
});