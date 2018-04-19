/*!
* @Author: fanger
* @Date:   2018-04-16 12:34:35
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-18 18:45:15
*/



//main.js
//d.js
define(function(require, exports, module){
     console.log('d.js执行');
     return {
          helloA: function(){
               var a = require('a');
               a.hello();
          },
          run: function(){
               $('#b').click(function(){
                    var b = require('b');
                    b.hello();
               });
          }
     }
});