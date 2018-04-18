/*!
* @Author: fanger
* @Date:   2018-03-12 10:53:29
* @Last Modified by:   fanger
* @Last Modified time: 2018-04-18 15:43:00
*/

const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const path = require('path');
const webpackDevServer = require('webpack-dev-server');

module.exports = merge(base, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		host: '127.0.0.1',
		port: '8012',
		inline: true
	}
});

