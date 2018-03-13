/*!
 * @Author: Teaism
 * @Date:   2018-03-07 17:28:37
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-03-13 10:09:05
 */

/*import _ from 'lodash';
import printMe from './print.js';
import './style.css';*/
// import { cube } from './math.js';



function getComponent() {

	return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
		var element = document.createElement('div');

		element.innerHTML = _.join(['Hello', 'webpack'], ' ');
		return element;
	}).catch(error => 'an error occurred whild loading the component')

}

getComponent().then(component => {
	document.body.appendChild(component)
})

