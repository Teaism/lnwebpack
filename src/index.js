/*!
 * @Author: Teaism
 * @Date:   2018-03-07 17:28:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-03-09 18:29:58
 */

/*import _ from 'lodash';
import printMe from './print.js';
import './style.css';*/
import { cube } from './math.js';


function component() {
    var element = document.createElement('pre');


    element.innerHTML =['hello webpack!', '5cubed is equal to ' + cube(5)].join('\n\n');



    return element;
}
document.body.appendChild(component());


