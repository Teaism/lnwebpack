/*!
* @Author: fanger
* @Date:   2018-03-12 10:53:29
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-16 14:41:34
*/

const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');

module.exports = merge(base, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		host: '127.0.0.1',
		port: '8012',
		inline: true
	}
});

