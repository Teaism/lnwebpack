/*!
* @Author: Administrator
* @Date:   2018-03-08 11:04:28
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-13 16:43:37
*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: {
		index: './src/index.js'
	},
	
	plugins:[
		new HtmlWebpackPlugin({title: 'code splitting'})
	],
	output: {
		filename: '[name][hash].bundle.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};

module.exports = config;