/*!
* @Author: Administrator
* @Date:   2018-03-12 10:53:29
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-10 16:31:44
*/

const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');

module.exports = merge(base, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './build',
		host: '127.0.0.1',
		port: '8012',
		inline: true
	}
});

