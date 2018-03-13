/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:29
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-13 14:44:59
*/

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: { contentBase: './dist'}
});